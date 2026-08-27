import { ExpoConfig, ConfigContext } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? 'Trailmark (Dev)' : 'Trailmark',
  slug: 'trailmark',
  scheme: IS_DEV ? 'trailmark-dev' : 'trailmark',
  version: '1.4.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  icon: './assets/images/icon.png',
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV ? 'com.twe.trailmark.dev' : 'com.twe.trailmark',
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'Trailmark uses your location to record trail routes.',
      UIBackgroundModes: ['location'],
    },
  },
  android: {
    package: IS_DEV ? 'com.twe.trailmark.dev' : 'com.twe.trailmark',
    permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_BACKGROUND_LOCATION'],
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  plugins: [
    'expo-router',
    ['expo-location', { isAndroidBackgroundLocationEnabled: true }],
    ['expo-build-properties', { android: { compileSdkVersion: 35 } }],
  ],
  experiments: { typedRoutes: true },
  extra: {
    eas: { projectId: '8f2c1b90-7a44-4d0e-9c31-2ab5e6d7f001' },
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.trailmark.app',
  },
});
