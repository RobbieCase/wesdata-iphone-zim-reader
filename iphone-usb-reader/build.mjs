import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(scriptDir, '..');
const dist = path.join(repo, 'dist');
const outDir = path.join(scriptDir, 'package');
fs.mkdirSync(outDir, { recursive: true });

const read = (relative) => fs.readFileSync(path.join(dist, relative), 'utf8');
const escapeScript = (source) => source.replaceAll('</script', '<\\/script');
const escapeAttribute = (source) => source
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\r', '&#13;')
    .replaceAll('\n', '&#10;');

let html = read('www/index.html');

const errorProbe = `<script>
window.__WESDATA_STARTUP_ERRORS__=[];
(function(){
  function record(message){
    window.__WESDATA_STARTUP_ERRORS__.push(String(message));
    function show(){
      var panel=document.getElementById('wesdataStartupError');
      if(!panel){panel=document.createElement('pre');panel.id='wesdataStartupError';panel.style.cssText='position:fixed;left:.5rem;right:.5rem;bottom:.5rem;z-index:2147483647;max-height:42vh;overflow:auto;margin:0;padding:.75rem;background:#5b1717;color:white;font:12px/1.45 monospace;white-space:pre-wrap;border-radius:8px';document.body.appendChild(panel)}
      panel.textContent='WESDATA reader startup error:\\n'+window.__WESDATA_STARTUP_ERRORS__.join('\\n');
    }
    document.body?show():addEventListener('DOMContentLoaded',show,{once:true});
  }
  addEventListener('error',function(event){record(event.message+(event.filename?' @ '+event.filename+':'+event.lineno:''))});
  addEventListener('unhandledrejection',function(event){var reason=event.reason;record('Promise: '+(reason&&reason.stack||reason))});
}());
</script>`;

html = html.replace('</head>', () => `${errorProbe}</head>`);

const css = [
    read('www/css/bootstrap.min.css'),
    read('www/css/app.css'),
    read('www/css/transition.css')
].join('\n');

html = html
    .replace(/<script type="text\/javascript" src="js\/theme-init\.js"><\/script>/, () => `<script>${escapeScript(read('www/js/theme-init.js'))}</script>`)
    .replace(/\s*<link rel="manifest"[^>]*>/, '')
    .replace(/\s*<link href="css\/bootstrap\.min\.css"[^>]*>/, '')
    .replace(/\s*<link rel="stylesheet" href="css\/app\.css"\s*\/>/, '')
    .replace(/\s*<link rel="stylesheet" href="css\/transition\.css"\s*\/>/, () => `<style>${css}</style>`)
    .replace(/\s*<link rel="icon"[^>]*>/g, '')
    .replace(/<img src="img\/icons\/kiwix-60\.png" id="kiwixLogo"[^>]*>/, '<span id="kiwixLogo" aria-label="Offline reader" style="font-size:2rem">📚</span>')
    .replace(/<img src="img\/Icon_External_Link\.png"\s*\/>/g, '↗')
    .replace(/<img src="img\/spinner\.gif"[^>]*\/>/g, '…')
    .replace(/<iframe width="100%" id="libraryContent" src="\.\/library\.html"><\/iframe>/,
        () => `<iframe width="100%" id="libraryContent" srcdoc="${escapeAttribute(read('www/library.html'))}"></iframe>`)
    .replace(/<iframe id="articleContent" class="articleIFrame" src="article\.html"([^>]*)><\/iframe>/,
        (_, attributes) => `<iframe id="articleContent" class="articleIFrame" srcdoc="${escapeAttribute(read('www/article.html'))}"${attributes}></iframe>`)
    .replace(/<script type="text\/javascript" src="js\/jquery\.slim\.min\.js"><\/script>/,
        () => `<script>${escapeScript(read('www/js/jquery.slim.min.js'))}</script>`)
    .replace(/<script type="text\/javascript" src="js\/bootstrap\.bundle\.min\.js"><\/script>/,
        () => `<script>${escapeScript(read('www/js/bootstrap.bundle.min.js'))}</script>`)
    .replace(/<script type="text\/javascript" src="js\/init\.js"><\/script>/,
        () => `<script>${escapeScript(read('www/js/init.js'))}</script>\n<script>self.__KIWIX_USB_EMERGENCY__=true;params.contentInjectionMode='jquery';params.appCache=true;params.sourceVerification=false;params.useLibzim=false;params.reopenLastArchive=false;params.overrideBrowserLanguage='en';params.openExternalLinksInNewTabs=false;</script>\n<script>${escapeScript(read('i18n/en.jsonp.js'))}</script>`)
    .replace(/\s*<!-- <script type="module" defer src="js\/app\.js"><\/script> -->/, '')
    .replace(/<script type="text\/javascript" defer src="js\/bundle\.min\.js"><\/script>/,
        () => `<script>${escapeScript(read('www/js/bundle.min.js'))}</script>`)
    .replace(/<title>[^<]*<\/title>/, '<title>WESDATA Emergency iPhone ZIM Reader</title>')
    .replace(/<body([^>]*)>/, (_, attributes) => `<body${attributes}><div style="background:#fff3cd;color:#513c00;padding:.55rem .8rem;font:600 14px -apple-system,sans-serif;text-align:center">Experimental USB-only iPhone reader · Restricted mode · Choose a trusted ZIM from WESDATA</div>`);

const unresolvedTags = [
    /<script[^>]+src="js\//m,
    /<link[^>]+href="css\//m,
    /^\s*<iframe[^>]+src="(?:\.\/library|article)\.html"/m
].filter((pattern) => pattern.test(html));
if (unresolvedTags.length) throw new Error('One or more outer HTML resources were not inlined');

fs.writeFileSync(path.join(outDir, 'IPHONE_ZIM_READER_PAYLOAD.html'), html);

const launcher = `<!doctype html>
<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>WESDATA iPhone Reader</title>
<style>body{font:17px -apple-system,sans-serif;max-width:38rem;margin:3rem auto;padding:0 1.2rem;color:#17202a}button,label{display:block;background:#173b57;color:white;border:0;border-radius:12px;padding:1rem;margin:1.5rem 0;font-weight:700;text-align:center}.small{font-size:.85rem;color:#59636e}</style></head>
<body><h1>WESDATA Offline Reader</h1><p>Select <b>IPHONE_ZIM_READER_PAYLOAD.html</b> from the USB. Safari will load the reader entirely from that file.</p>
<label>Load reader<input id="reader" type="file" accept="text/html,.html" hidden></label>
<p id="status" class="small">No internet connection is used.</p>
<script>
const input=document.getElementById('reader'),status=document.getElementById('status');
input.addEventListener('change',async()=>{const file=input.files&&input.files[0];if(!file)return;status.textContent='Loading '+file.name+'…';try{const text=await file.text();if(!text.includes('__KIWIX_USB_EMERGENCY__'))throw new Error('That is not the WESDATA reader payload.');document.open();document.write(text);document.close()}catch(error){status.textContent='Could not load reader: '+error.message}});
</script></body></html>`;
fs.writeFileSync(path.join(outDir, 'IPHONE_SAFARI_BOOTSTRAP.html'), launcher);

const launcherBase64 = Buffer.from(launcher, 'utf8').toString('base64');
const seedURL = `data:text/html;base64,${launcherBase64}`;
fs.writeFileSync(path.join(outDir, 'IPHONE_OFFLINE_START_URL.txt'), `${seedURL}\n`);

const shortcutJavaScript = `document.open();\ndocument.write(atob("${launcherBase64}"));\ndocument.close();\ncompletion();\n`;
fs.writeFileSync(path.join(outDir, 'SHORTCUT_JAVASCRIPT.txt'), shortcutJavaScript);

const shortcutRecipe = `WESDATA IPHONE READER — MANUAL SHORTCUT RECIPE

This is an optional convenience launcher. No signed .shortcut is included;
the copy-and-paste method in README_IPHONE_FIRST.txt works without it.

FIRST-TIME SETUP (do this while the files are already on the phone/USB):

1. In Apple's built-in Shortcuts app, create a shortcut named "WESDATA Offline Reader".
2. Add the action "Run JavaScript on Web Page".
3. Replace its sample code with the entire contents of SHORTCUT_JAVASCRIPT.txt.
4. Open the shortcut details. Turn on "Show in Share Sheet" and allow Safari web pages.
5. If iPhone asks to allow scripting, approve it only for this trusted shortcut.

TO USE WITH NO INTERNET:

1. Open IPHONE_OFFLINE_START_URL.txt in Files, copy the entire line, and paste it into Safari's address bar.
2. When the WESDATA launch page appears, use Share > WESDATA Offline Reader if needed.
3. Tap Load reader and select IPHONE_ZIM_READER_PAYLOAD.html from the USB.
4. In the reader, choose a .zim archive from the USB.

The start URL also contains the tiny launch page directly, so on many Safari versions
steps 1 and 3 work without running the shortcut at all.
`;
fs.writeFileSync(path.join(outDir, 'MANUAL_SHORTCUT_RECIPE.txt'), shortcutRecipe);

console.log(JSON.stringify({
    payloadBytes: fs.statSync(path.join(outDir, 'IPHONE_ZIM_READER_PAYLOAD.html')).size,
    bootstrapBytes: fs.statSync(path.join(outDir, 'IPHONE_SAFARI_BOOTSTRAP.html')).size,
    seedURLBytes: fs.statSync(path.join(outDir, 'IPHONE_OFFLINE_START_URL.txt')).size,
    output: outDir
}, null, 2));
