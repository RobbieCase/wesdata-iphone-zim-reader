# iPhone ZIM Reader

An experimental Safari reader for opening static ZIM archives directly from a USB drive. It bundles Kiwix JS into a single HTML file so you can browse offline without installing an app or running a local web server.

**Tested in Safari on macOS. Physical iPhone testing is pending.** The macOS test opened an illustrated knots archive from USB and rendered the complete Bowline article. See [test notes](TEST_NOTES.md) for the setup and results.

## Try it from USB

1. Copy the [launcher text file](iphone-usb-reader/package/IPHONE_OFFLINE_START_URL.txt) and [reader HTML file](iphone-usb-reader/package/IPHONE_ZIM_READER_PAYLOAD.html) to a USB drive alongside a small, static `.zim` archive. On iPhone, use a data-capable adapter if needed and confirm the drive appears in Files.
2. Copy the full `data:text/html;base64,...` line from the launcher into Safari’s address bar and open it.
3. Choose **Load reader** and select the reader HTML file from the USB drive.
4. Continue in **Restricted mode** if prompted, then select your ZIM archive.

The [USB setup guide](iphone-usb-reader/package/README_IPHONE_FIRST.txt) uses the original WESDATA folder layout and includes troubleshooting. The [package folder](iphone-usb-reader/package) also has an optional Apple Shortcuts recipe.

## How it works

The launcher loads the reader through Safari’s file picker. The reader then uses Kiwix JS Restricted mode to read the archive from the drive. It bundles the XZ and Zstandard decoders so Safari can read the data without fetching external WebAssembly files.

Start with a small, static archive. Dynamic Zimit archives may render incompletely, and very large archives may run into Safari’s memory limits. Keep the Safari tab open while the reader is loading content. Use trusted archives.

## Build from source

From the repository root with Node.js and npm installed, run:

```sh
npm ci
npm run build-min
node iphone-usb-reader/build.mjs
```

The builder writes the launcher, reader payload, and Shortcut helper to [`iphone-usb-reader/package`](iphone-usb-reader/package).

## Upstream and license

This is an independent experiment based on [Kiwix JS 4.3.15](https://github.com/kiwix/kiwix-js/tree/38b3c7f89f3a4d0ac94f6b3e01b38fd1f85f04e8), distributed under the [GNU General Public License v3](LICENSE-GPLv3.txt). See the [upstream README](UPSTREAM_README.md), [source notice](iphone-usb-reader/package/SOURCE_NOTICE.txt), and [patch against upstream](iphone-usb-reader/package/MODIFIED_SOURCE.patch).
