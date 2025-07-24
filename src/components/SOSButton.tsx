import { AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SOSButtonProps {
  onEmergencyTrigger: () => void;
  isActive: boolean;
}

export const SOSButton = ({ onEmergencyTrigger, isActive }: SOSButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onEmergencyTrigger();
    
    // Reset the pressed state after animation
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Emergency SOS</h2>
        <p className="text-muted-foreground">
          Press and hold to trigger emergency alert
        </p>
      </div>
      
      <div className="relative">
        {/* Outer ring animation when active */}
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-emergency/20 animate-ping scale-150"></div>
        )}
        
        <Button
          variant="emergency"
          size="emergency"
          onClick={handlePress}
          className={`relative transition-all duration-200 ${
            isPressed ? 'scale-95' : 'scale-100'
          } ${isActive ? 'animate-pulse' : ''}`}
          disabled={isActive}
        >
          {isActive ? (
            <Phone className="h-8 w-8 animate-bounce" />
          ) : (
            <AlertTriangle className="h-8 w-8" />
          )}
        </Button>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        {isActive ? (
          <span className="text-emergency font-medium">
            Emergency services contacted!
          </span>
        ) : (
          "Tap to send immediate alert to your emergency contacts"
        )}
      </div>
    </div>
  );
};