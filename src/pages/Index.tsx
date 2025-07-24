import { useState } from 'react';
import { SafeWalkHeader } from '@/components/SafeWalkHeader';
import { SOSButton } from '@/components/SOSButton';
import { StatusIndicator } from '@/components/StatusIndicator';
import { Settings } from './Settings';
import { useSafetyStatus } from '@/hooks/useSafetyStatus';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'settings'>('home');
  const { toast } = useToast();
  
  const {
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
  } = useSafetyStatus();

  const handleEmergencyTrigger = () => {
    triggerEmergency();
    toast({
      title: "🚨 Emergency Alert Triggered",
      description: `Contacting ${contacts.length} emergency contacts and emergency services.`,
      variant: "destructive",
    });
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    updateSetting(setting, value);
    toast({
      title: "Settings Updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  if (currentView === 'settings') {
    return (
      <Settings
        onBack={() => setCurrentView('home')}
        contacts={contacts}
        onAddContact={addContact}
        onRemoveContact={removeContact}
        settings={settings}
        onSettingChange={handleSettingChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SafeWalkHeader 
        onSettingsClick={() => setCurrentView('settings')}
        status={status}
      />
      
      <main className="pb-8">
        <StatusIndicator
          motionDetection={settings.motionDetection}
          audioMonitoring={settings.audioMonitoring}
          locationTracking={settings.locationTracking}
          cameraReady={settings.cameraReady}
        />
        
        <div className="flex justify-center">
          <SOSButton
            onEmergencyTrigger={handleEmergencyTrigger}
            isActive={emergencyActive}
          />
        </div>
        
        {location && (
          <div className="mx-6 mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              📍 Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          </div>
        )}
        
        {isNativeApp && deviceInfo && (
          <div className="mx-6 mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm text-center text-success-foreground">
              📱 Native App Mode: {deviceInfo.model} ({deviceInfo.platform})
            </p>
          </div>
        )}
        
        {contacts.length === 0 && (
          <div className="mx-6 mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm text-center text-warning-foreground">
              ⚠️ No emergency contacts configured. 
              <button 
                onClick={() => setCurrentView('settings')}
                className="underline ml-1 font-medium"
              >
                Add contacts in Settings
              </button>
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;