/* import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'no.alesundmasjid.app',
  appName: 'Alesund Masjid',
  webDir: 'out',
  ios: {
    contentInset: 'always'
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    }
  }
};

export default config; */

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'no.alesundmasjid.app',
  appName: 'Alesund Masjid',
  webDir: 'out',
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: '#0b1520',
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      backgroundColor: '#0b1520',
    }
  }
};

export default config;