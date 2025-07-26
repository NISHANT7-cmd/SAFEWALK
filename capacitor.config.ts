import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d6356dcef737452a905390c8962a0d6f',
  appName: 'safe-stride-ai',
  webDir: 'dist',
  server: {
    url: "https://d6356dce-f737-452a-9053-90c8962a0d6f.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#6B46C1",
      androidScaleType: "CENTER_CROP",
      showSpinner: false
    },
    Geolocation: {
      permissions: {
        location: "always"
      }
    },
    Camera: {
      permissions: {
        camera: "required",
        photos: "required"
      }
    },
    Microphone: {
      permissions: {
        microphone: "required"
      }
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;