module.exports = {
  packagerConfig: {
    icon: 'public/icon.icns'
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        "darwin"
      ]
    }
  ],
  osxSign: {
    identity: "TODO",
    ['hardened-runtime']: true,
    entitlements: "entitlements.plist",
    ['entitlements-inherit']: "entitlements.plist",
    ['signature-flags']: "library"
  },
}


require('dotenv').config()
const { notarize } = require('electron-notarize')

async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: 'com.screenplay',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS
  })
}
void notarizing;
