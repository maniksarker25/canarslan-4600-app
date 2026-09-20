// Learn more https://docs.expo.io/guides/customizing-metro
const fs = require('fs');
const path = require('path');

// Auto-fix for Windows Node 24 + lightningcss compatibility
try {
  const rootBin = path.join(__dirname, 'node_modules', 'lightningcss-win32-x64-msvc', 'lightningcss.win32-x64-msvc.node');
  const targetDirs = [
    path.join(__dirname, 'node_modules', 'react-native-css-interop', 'node_modules', 'lightningcss-win32-x64-msvc'),
    path.join(__dirname, 'node_modules', 'react-native-css-interop', 'node_modules', 'lightningcss')
  ];

  if (fs.existsSync(rootBin)) {
    const rootSize = fs.statSync(rootBin).size;
    for (const dir of targetDirs) {
      if (fs.existsSync(dir)) {
        const destFile = path.join(dir, 'lightningcss.win32-x64-msvc.node');
        if (!fs.existsSync(destFile) || fs.statSync(destFile).size !== rootSize) {
          fs.copyFileSync(rootBin, destFile);
        }
      }
    }
  }

  // Ensure react-native-css-interop lightningcss loader delegates to root lightningcss
  const nestedLoader = path.join(__dirname, 'node_modules', 'react-native-css-interop', 'node_modules', 'lightningcss', 'node', 'index.js');
  if (fs.existsSync(nestedLoader)) {
    const content = fs.readFileSync(nestedLoader, 'utf8');
    if (!content.includes('../../../../lightningcss')) {
      fs.writeFileSync(nestedLoader, "try { module.exports = require('../../../../lightningcss'); } catch (_) {}\n" + content, 'utf8');
    }
  }

  // Ensure tabs directories stay lowercase on Windows
  const tabsDir = path.join(__dirname, 'app', '(tabs)');
  if (fs.existsSync(tabsDir)) {
    const entries = fs.readdirSync(tabsDir);
    if (entries.includes('Notifications')) {
      const oldP = path.join(tabsDir, 'Notifications');
      const tmpP = path.join(tabsDir, '__temp_notifications__');
      const newP = path.join(tabsDir, 'notifications');
      fs.renameSync(oldP, tmpP);
      fs.renameSync(tmpP, newP);
    }
    if (entries.includes('Profile')) {
      const oldP = path.join(tabsDir, 'Profile');
      const tmpP = path.join(tabsDir, '__temp_profile__');
      const newP = path.join(tabsDir, 'profile');
      fs.renameSync(oldP, tmpP);
      fs.renameSync(tmpP, newP);
    }
  }
} catch (_) {}

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
