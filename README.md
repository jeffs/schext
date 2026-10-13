# Schoology Chrome Extension

Sets the due time of new assignments to 8:25 a.m., or to the time chosen in
the extension's options.

## Building

    npm install
    npm run build

Then load the `extension` directory at `chrome://extensions` using "Load
unpacked". `npm run package` writes `var/schext.zip` for upload to the Chrome
Web Store.
