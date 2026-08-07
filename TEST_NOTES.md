# Test notes

## 2026-08-06 — desktop Safari USB test

Environment:

- Safari on macOS
- Reader launched from the generated `data:` URL
- Reader payload selected from the mounted WESDATA USB drive
- Kiwix JS Restricted mode with ASM XZ and Zstandard decoders

Verified:

1. The generated launcher loaded without a network or local server.
2. The 2 MB reader payload loaded through Safari's file picker.
3. `Knots_illustrated_2026-07.zim` was selected directly from the USB.
4. The archive's illustrated article index rendered.
5. The complete Bowline article opened with text, tables, internal links, and
   tying images.
6. No history `pushState` exception remained in the final build.

Not yet verified:

- A physical iPhone and iOS Files/Safari flow
- Relaunch after an iPhone restart
- Multiple iOS versions or iPhone hardware generations
- Multi-gigabyte ZIM behavior on iOS
- Dynamic/Zimit archives

