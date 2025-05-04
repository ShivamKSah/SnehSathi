
import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import LanguageSelector from './LanguageSelector';
import PwaInstallButton from '../shared/PwaInstallButton';
import ShareButton from '../shared/ShareButton';
import NotificationsButton from '../shared/NotificationsButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { usePwa } from '@/hooks/use-pwa';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/contexts/TranslationContext';
import { cn } from '@/lib/utils';

const AppSettings: React.FC = () => {
  const { isOnline, updateAvailable, checkForUpdates } = usePwa();
  const { t } = useTranslation();

  // Check for updates when component mounts
  React.useEffect(() => {
    checkForUpdates();
    const interval = setInterval(checkForUpdates, 60 * 60 * 1000); // Check for updates every hour
    return () => clearInterval(interval);
  }, [checkForUpdates]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full shadow-md bg-background/70 backdrop-blur-md hover:bg-background/90"
          data-settings-trigger="true"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">{t('common.settings')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{t('common.appSettings')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('common.configurePreferences')}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span>{t('common.darkMode')}</span>
              <DarkModeToggle />
            </div>
            <div className="flex items-center justify-between">
              <span>{t('common.language')}</span>
              <LanguageSelector />
            </div>
          </div>
          
          <div className="flex items-center gap-2 pt-2 border-t">
            {!isOnline && (
              <Badge variant="outline" className={cn("bg-destructive/10 text-destructive border-destructive/20")}>
                {t('common.offline')}
              </Badge>
            )}
            
            {updateAvailable && (
              <Badge variant="outline" className={cn("bg-primary/10 text-primary border-primary/20 cursor-pointer")} onClick={checkForUpdates}>
                {t('common.updateAvailable')}
              </Badge>
            )}
            
            <div className="flex items-center gap-2 ml-auto">
              <NotificationsButton />
              <PwaInstallButton />
              <ShareButton showLabel={false} />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AppSettings;
