# WESDATA iPhone USB ZIM Reader

Private preservation repository for an experimental way to open a static ZIM
archive from a USB drive in Safari without Kiwix for iOS, an installed PWA, an
App Store download, a web server, Wi-Fi, or cellular service.

This repository is based on Kiwix JS 4.3.15 at upstream commit
`38b3c7f89f3a4d0ac94f6b3e01b38fd1f85f04e8`. It preserves the complete modified
source tree, the reproducible single-file builder, the generated reader package,
license notices, and the exact patch against upstream.

## Status

- The USB flow was tested in desktop Safari on macOS on 2026-08-06.
- The reader selected `Knots_illustrated_2026-07.zim` directly from the USB,
  displayed its article index and images, and opened the complete Bowline article.
- Testing on a physical iPhone is still pending. Do not describe this as proven
  iPhone support or a novel invention until it succeeds reproducibly on real iOS
  hardware.

## How the fallback works

1. The user copies a small `data:text/html;base64,...` launcher from a text file
   into Safari's address bar.
2. That launcher uses a normal file input to read the generated 2 MB HTML reader
   payload from the USB through Files.
3. The payload replaces the launcher document and runs a modified, bundled Kiwix
   JS entirely inside the Safari tab.
4. Kiwix JS Restricted mode reads a user-selected static ZIM directly from the
   USB. Pure JavaScript/ASM XZ and Zstandard decoders avoid external WASM files.

No USB library content or personal data is included in this repository.

## Try the preserved package

The ready-to-copy files are in [`iphone-usb-reader/package`](iphone-usb-reader/package).
Follow `README_IPHONE_FIRST.txt` there and test with a small, conventional
MediaWiki-style ZIM before attempting multi-gigabyte archives.

## Rebuild

Use a supported Node.js and npm environment:

```sh
npm ci
npm run build-min
node iphone-usb-reader/build.mjs
```

The builder writes the generated launcher, data URL, JavaScript payload, and
Shortcut helper into `iphone-usb-reader/package`.

## Important limitations

- This is unofficial, experimental work and is not endorsed by Kiwix or Apple.
- Restricted mode is intended primarily for static ZIMs. Dynamic/Zimit archives
  may be incomplete or unusable.
- iOS may impose memory or file-selection limits, especially for very large ZIMs.
- Safari must keep the tab alive while content is being decoded.
- Only open trusted ZIM archives. Treat offline medical and emergency information
  as potentially stale.

## Upstream and licensing

Kiwix JS is licensed under GNU GPL v3. The full license and source notice are in
the package directory. `MODIFIED_SOURCE.patch` records the source changes, and
the modified files are committed directly in this repository. The original
upstream project README is preserved as [`UPSTREAM_README.md`](UPSTREAM_README.md).

- Upstream: <https://github.com/kiwix/kiwix-js>
- Upstream commit: `38b3c7f89f3a4d0ac94f6b3e01b38fd1f85f04e8`
