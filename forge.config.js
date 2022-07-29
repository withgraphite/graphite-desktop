require('dotenv').config();

// In order to submit the package for notarization you must add a file called ".env" to the
// root of this directory that contains
//
// APPLEID=<appleEmail>
// APPLEIDPASS=<password>
//
// or just run your command with env vars set, e.g.:
//
// APPLEID=<appleEmail> APPLEIDPASS=<password> yarn make
//
// where appleEmail is the email address for your Apple account in the Graphite
// and password is an app-specific password (https://support.apple.com/en-us/HT204397)

module.exports = {
  plugins: [
    ['@electron-forge/plugin-auto-unpack-natives'],
  ],
  packagerConfig: {
    icon: "public/icon.icns",
    osxSign: {
      identity: 'Developer ID Application: Screenplay Studios Inc (6V5LDB8335)',
      ["hardened-runtime"]: true,
      entitlements: "entitlements.plist",
      ["entitlements-inherit"]: "entitlements.plist",
      ["signature-flags"]: "library",
      ["gatekeeper-assess"]: false, // https://github.com/electron/osx-sign/issues/196
    },
    osxNotarize: {
      appleId: process.env.APPLEID,
      appleIdPassword: process.env.APPLEIDPASS,
    },
    asar: true,
    prune: true,
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin",
      ],
    },
  ],
}
