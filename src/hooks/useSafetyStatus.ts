import { useState, useEffect } from 'react';
import { NativeServices } from '@/services/nativeServices';

interface SafetySettings {
  motionDetection: boolean;
  audioMonitoring: boolean;
  locationTracking: boolean;
  cameraReady: boolean;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export const useSafetyStatus = () => {
  const [status, setStatus] = useState<'safe' | 'monitoring' | 'emergency'>('safe');
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isNativeApp, setIsNativeApp] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  
  const [settings, setSettings] = useState<SafetySettings>({
    motionDetection: true,
    audioMonitoring: true,
    locationTracking: true,
    cameraReady: true,
  });

  const [contacts, setContacts] = useState<Contact[]>([]);

  // Initialize native services
  useEffect(() => {
    const initNative = async () => {
      const isNative = await NativeServices.isNative();
      setIsNativeApp(isNative);
      
      if (isNative) {
        const deviceInfo = await NativeServices.getDeviceInfo();
        setDeviceInfo(deviceInfo);
        
        // Request permissions
        await NativeServices.requestPermissions();
      }
    };
    
    initNative();
  }, []);

  // Enhanced monitoring when features are enabled
  useEffect(() => {
    const hasActiveMonitoring = Object.values(settings).some(Boolean);
    if (hasActiveMonitoring && !emergencyActive) {
      setStatus('monitoring');
    } else if (emergencyActive) {
      setStatus('emergency');
    } else {
      setStatus('safe');
    }
  }, [settings, emergencyActive]);

  // Enhanced location tracking with native services
  useEffect(() => {
    if (settings.locationTracking) {
      const updateLocation = async () => {
        const loc = await NativeServices.getCurrentLocation();
        if (loc) {
          setLocation(loc);
        }
      };
      
      updateLocation();
      
      // Watch location if native
      if (isNativeApp) {
        NativeServices.watchLocation((loc) => {
          setLocation(loc);
        });
      }
    }
  }, [settings.locationTracking, isNativeApp]);

  const triggerEmergency = async () => {
    setEmergencyActive(true);
    setStatus('emergency');
    
    // Native emergency response
    console.log('🚨 EMERGENCY TRIGGERED!');
    console.log('📱 Device:', deviceInfo?.model || 'Unknown');
    console.log('📍 Location:', location);
    console.log('📞 Contacting:', contacts.map(c => c.name).join(', '));
    
    // Haptic feedback
    await NativeServices.emergencyVibration();
    
    // Take emergency photo
    const photo = await NativeServices.takeEmergencyPhoto();
    if (photo) {
      console.log('📸 Emergency photo captured');
    }
    
    // Send notification
    await NativeServices.scheduleEmergencyNotification(
      '🚨 SafeWalk Emergency Alert',
      `Emergency triggered at ${location ? `${location.lat}, ${location.lng}` : 'unknown location'}`
    );
    
    // Auto-reset after 30 seconds for demo
    setTimeout(() => {
      setEmergencyActive(false);
    }, 30000);
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };
    setContacts(prev => [...prev, newContact]);
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const updateSetting = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  return {
    status,
    emergencyActive,
    settings,
    contacts,
    location,
    isNativeApp,
    deviceInfo,
    triggerEmergency,
    addContact,
    removeContact,
    updateSetting,
  };
};