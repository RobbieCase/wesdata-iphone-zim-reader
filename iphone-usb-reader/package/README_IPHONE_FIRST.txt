WESDATA EXPERIMENTAL IPHONE ZIM READER
======================================

Purpose
-------
This is a USB-only proof of concept for opening the ZIM archives on an iPhone
when there is no Wi-Fi, cellular service, App Store, or Kiwix installation.
It uses only Apple's Files app and Safari. Nothing is installed system-wide.

WHAT YOU NEED
-------------
- An iPhone that can see WESDATA in the Files app.
- A Lightning or USB-C adapter that supports data, not just charging.
- Enough battery. Keep the phone connected to power for large archives.

FASTEST TEST — NO SHORTCUT REQUIRED
-----------------------------------
1. Connect WESDATA. In Files, open:
   90_OFFLINE_READERS/IPHONE_EXPERIMENTAL/IPHONE_OFFLINE_START_URL.txt
2. Select All and Copy the single, long line beginning with "data:text/html".
3. Open Safari, paste the line into the address bar, and tap Go.
4. On the WESDATA Offline Reader page, tap "Load reader".
5. In Files, select IPHONE_ZIM_READER_PAYLOAD.html from this same folder.
6. If Safari says ServiceWorker mode is unsupported, tap "Okay" to use the
   included Restricted mode. Then choose a ZIM archive.

For the first test, use the small illustrated knots archive:
02_EMERGENCY_AND_SURVIVAL/Offline_Archives/Knots_illustrated_2026-07.zim

The tiny start page loads the 2 MB reader into Safari. The reader then reads
the selected ZIM directly from the USB. No local web server and no network are
used.

OPTIONAL SHORTCUT
-----------------
The shortcut is only a convenience launcher. It cannot contain an App Store
app and it does not bypass iPhone security. See MANUAL_SHORTCUT_RECIPE.txt.
The copy-and-paste method above is the lowest-dependency recovery path.

IMPORTANT LIMITS
----------------
- Experimental, unofficial, and not guaranteed on every iPhone/iOS release.
- Safari must keep the page alive. Avoid switching apps while an article loads.
- The 18 MB Knots and 16 MB NHS archives are the best first tests. Multi-gigabyte
  archives can be slow or may run out of memory on older phones.
- This uses Kiwix JS restricted mode. Conventional encyclopedia-style ZIMs are
  the best fit; complex interactive pages may render only partly.
- The article index and a complete illustrated Bowline article were tested
  directly from the Knots ZIM on this drive.
- A failed or slow archive does not mean the USB is damaged. Try Knots first.
- Offline medical and emergency references can become outdated. Use current
  professional help and official instructions whenever they are available.

TROUBLESHOOTING
---------------
- Safari searches the web instead of opening the page: make sure the complete
  line, including "data:text/html;base64,", was pasted into Safari's address bar.
- Files shows the HTML as text: that is normal. Start with the URL text file.
- Reader page disappears: repeat the six steps; nothing needs reinstalling.
- ZIM chooser shows the wrong folder: use Browse, then Locations > WESDATA.
- Phone cannot see WESDATA: unlock it, reconnect the adapter, and check Browse >
  Locations. Some adapters require external power.

SECURITY
--------
Only select files from this trusted WESDATA drive. The reader is local code and
has the same access as the Safari tab you open it in. It does not transmit files.
