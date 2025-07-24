import { Activity, Mic, MapPin, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatusIndicatorProps {
  motionDetection: boolean;
  audioMonitoring: boolean;
  locationTracking: boolean;
  cameraReady: boolean;
}

export const StatusIndicator = ({
  motionDetection,
  audioMonitoring,
  locationTracking,
  cameraReady
}: StatusIndicatorProps) => {
  const indicators = [
    {
      icon: Activity,
      label: "Motion Detection",
      active: motionDetection,
      description: "Monitoring device movement"
    },
    {
      icon: Mic,
      label: "Audio Monitoring",
      active: audioMonitoring,
      description: "Listening for distress signals"
    },
    {
      icon: MapPin,
      label: "Location Tracking",
      active: locationTracking,
      description: "GPS location services"
    },
    {
      icon: Camera,
      label: "Camera Ready",
      active: cameraReady,
      description: "Emergency recording available"
    }
  ];

  return (
    <Card className="mx-6 mb-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">System Status</h3>
        <div className="grid grid-cols-2 gap-4">
          {indicators.map(({ icon: Icon, label, active, description }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                active 
                  ? 'bg-success/20 text-success' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  active ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {description}
                </p>
              </div>
              <div className={`h-2 w-2 rounded-full ${
                active ? 'bg-success animate-pulse' : 'bg-muted'
              }`} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};