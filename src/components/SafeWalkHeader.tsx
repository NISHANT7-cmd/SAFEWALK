import { Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SafeWalkHeaderProps {
  onSettingsClick: () => void;
  status: 'safe' | 'monitoring' | 'emergency';
}

export const SafeWalkHeader = ({ onSettingsClick, status }: SafeWalkHeaderProps) => {
  const getStatusText = () => {
    switch (status) {
      case 'safe':
        return 'Protected';
      case 'monitoring':
        return 'Monitoring';
      case 'emergency':
        return 'EMERGENCY ACTIVE';
      default:
        return 'Protected';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'safe':
        return 'text-success';
      case 'monitoring':
        return 'text-accent';
      case 'emergency':
        return 'text-emergency';
      default:
        return 'text-success';
    }
  };

  return (
    <header className="flex items-center justify-between p-6 bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8" />
        <div>
          <h1 className="text-2xl font-bold">SafeWalk</h1>
          <p className={`text-sm font-medium ${getStatusColor()}`}>
            Status: {getStatusText()}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onSettingsClick}
        className="text-primary-foreground hover:bg-white/20"
      >
        <Settings className="h-6 w-6" />
      </Button>
    </header>
  );
};