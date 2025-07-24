import { ArrowLeft, Shield, Volume2, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EmergencyContacts } from "@/components/EmergencyContacts";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface SettingsProps {
  onBack: () => void;
  contacts: Contact[];
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  onRemoveContact: (id: string) => void;
  settings: {
    motionDetection: boolean;
    audioMonitoring: boolean;
    locationTracking: boolean;
    cameraReady: boolean;
  };
  onSettingChange: (setting: string, value: boolean) => void;
}

export const Settings = ({ 
  onBack, 
  contacts, 
  onAddContact, 
  onRemoveContact,
  settings,
  onSettingChange
}: SettingsProps) => {
  const settingItems = [
    {
      key: 'motionDetection',
      icon: Shield,
      title: 'Motion Detection',
      description: 'Automatically detect sudden movements or falls',
      value: settings.motionDetection
    },
    {
      key: 'audioMonitoring',
      icon: Volume2,
      title: 'Audio Monitoring',
      description: 'Listen for distress calls and unusual sounds',
      value: settings.audioMonitoring
    },
    {
      key: 'locationTracking',
      icon: MapPin,
      title: 'Location Tracking',
      description: 'Share your location during emergencies',
      value: settings.locationTracking
    },
    {
      key: 'cameraReady',
      icon: Camera,
      title: 'Emergency Recording',
      description: 'Automatically start recording during alerts',
      value: settings.cameraReady
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-primary-foreground hover:bg-white/20"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Safety Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {settingItems.map(({ key, icon: Icon, title, description, value }) => (
              <div key={key} className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-primary/20 rounded-full mt-1">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={key} className="text-sm font-medium">
                      {title}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {description}
                    </p>
                  </div>
                </div>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => onSettingChange(key, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <EmergencyContacts
          contacts={contacts}
          onAddContact={onAddContact}
          onRemoveContact={onRemoveContact}
        />
      </div>
    </div>
  );
};