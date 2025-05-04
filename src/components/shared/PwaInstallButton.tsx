import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { usePwa } from '@/hooks/use-pwa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type PwaInstallButtonProps = {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showOfflineIndicator?: boolean;
};

const PwaInstallButton: React.FC<PwaInstallButtonProps> = ({
  variant = 'outline',
  size = 'sm',
  className = '',
  showOfflineIndicator = true
}) => {
  const { isInstallable, isInstalled, isOnline, updateAvailable, promptToInstall, checkForUpdates } = usePwa();
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const { t } = useTranslation();

  // Check for updates periodically
  useEffect(() => {
    if (updateAvailable) {
      setShowUpdateDialog(true);
    }
    
    const interval = setInterval(() => {
      checkForUpdates();
    }, 60 * 60 * 1000); // Check for updates every hour
    
    return () => clearInterval(interval);
  }, [updateAvailable, checkForUpdates]);

  // Don't render install button if already installed
  if (isInstalled) {
    // But do render update button if update is available
    if (updateAvailable) {
      return (
        <Button 
          variant="default"
          size={size}
          onClick={() => window.location.reload()}
          className={`flex items-center gap-2 animate-pulse ${className}`}
        >
          <RefreshCw className="h-4 w-4" />
          <span>{t('common.updateApp')}</span>
        </Button>
      );
    }
    
    // Show offline indicator if requested
    if (showOfflineIndicator && !isOnline) {
      return (
        <Button 
          variant="outline"
          size={size}
          className={`flex items-center gap-2 text-destructive border-destructive ${className}`}
          disabled
        >
          <WifiOff className="h-4 w-4" />
          <span>{t('common.offline')}</span>
        </Button>
      );
    }
    
    return null;
  }

  // Don't render if not installable
  if (!isInstallable) return null;

  return (
    <>
      <Button 
        variant={variant}
        size={size}
        onClick={promptToInstall}
        className={`flex items-center gap-2 ${className}`}
      >
        <Download className="h-4 w-4" />
        <span>{t('common.downloadApp')}</span>
      </Button>
      
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('common.updateAvailable')}</DialogTitle>
            <DialogDescription>
              {t('common.updateDescription')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
              {t('common.later')}
            </Button>
            <Button onClick={() => window.location.reload()}>
              {t('common.updateNow')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PwaInstallButton;
