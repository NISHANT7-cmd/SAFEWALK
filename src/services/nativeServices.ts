import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export class NativeServices {
  static async isNative(): Promise<boolean> {
    return Capacitor.isNativePlatform();
  }

  // Location Services
  static async getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
    try {
      if (!await this.isNative()) {
        // Fallback to web geolocation
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }),
            () => resolve(null)
          );
        });
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });

      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    } catch (error) {
      console.error('Location error:', error);
      return null;
    }
  }

  static async watchLocation(callback: (location: { lat: number; lng: number }) => void): Promise<string | null> {
    try {
      if (!await this.isNative()) {
        // Web fallback
        const id = navigator.geolocation.watchPosition(
          (position) => callback({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }),
          (error) => console.error('Location watch error:', error),
          { enableHighAccuracy: true }
        );
        return id.toString();
      }

      const id = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 30000
        },
        (position) => {
          if (position) {
            callback({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          }
        }
      );

      return id;
    } catch (error) {
      console.error('Location watch error:', error);
      return null;
    }
  }

  // Camera Services
  static async takeEmergencyPhoto(): Promise<string | null> {
    try {
      if (!await this.isNative()) {
        console.log('Camera not available in web mode');
        return null;
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        saveToGallery: true
      });

      return image.base64String || null;
    } catch (error) {
      console.error('Camera error:', error);
      return null;
    }
  }

  // Haptic Feedback
  static async emergencyVibration(): Promise<void> {
    try {
      if (!await this.isNative()) {
        // Web fallback
        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200, 100, 200]);
        }
        return;
      }

      await Haptics.impact({ style: ImpactStyle.Heavy });
      setTimeout(() => Haptics.impact({ style: ImpactStyle.Heavy }), 200);
      setTimeout(() => Haptics.impact({ style: ImpactStyle.Heavy }), 400);
    } catch (error) {
      console.error('Haptics error:', error);
    }
  }

  // Push Notifications
  static async scheduleEmergencyNotification(title: string, body: string): Promise<void> {
    try {
      if (!await this.isNative()) {
        // Web notification fallback
        if ('Notification' in window) {
          if (Notification.permission === 'granted') {
            new Notification(title, { body, icon: '/favicon.ico' });
          } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
              new Notification(title, { body, icon: '/favicon.ico' });
            }
          }
        }
        return;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: Date.now(),
            sound: 'default',
            attachments: undefined,
            actionTypeId: "",
            extra: null
          }
        ]
      });
    } catch (error) {
      console.error('Notification error:', error);
    }
  }

  // Device Information
  static async getDeviceInfo(): Promise<any> {
    try {
      if (!await this.isNative()) {
        return {
          model: 'Web Browser',
          platform: 'web',
          osVersion: navigator.userAgent,
          manufacturer: 'Unknown'
        };
      }

      const info = await Device.getInfo();
      return info;
    } catch (error) {
      console.error('Device info error:', error);
      return null;
    }
  }

  // Request Permissions
  static async requestPermissions(): Promise<boolean> {
    try {
      if (!await this.isNative()) {
        // Request web permissions
        const results = await Promise.all([
          navigator.geolocation ? 
            new Promise(resolve => navigator.geolocation.getCurrentPosition(
              () => resolve(true), 
              () => resolve(false)
            )) : 
            Promise.resolve(false),
          'Notification' in window ? 
            Notification.requestPermission().then(p => p === 'granted') : 
            Promise.resolve(false)
        ]);
        
        return results.some(Boolean);
      }

      // Request native permissions
      const locationPermission = await Geolocation.requestPermissions();
      const notificationPermission = await LocalNotifications.requestPermissions();
      
      return locationPermission.location === 'granted' && 
             notificationPermission.display === 'granted';
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  }
}