import type { CapacitorConfig } from '@capacitor/cli';

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

export default config;