import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

// Add type declaration for the standalone property on Navigator
interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export function usePwa() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const { toast } = useToast();

  // Check if app is installed
  useEffect(() => {
    const checkIfInstalled = () => {
      // Check if app is in standalone mode or display-mode is standalone
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      // iOS detection
      const isIOSInstalled = 
        (navigator as NavigatorWithStandalone).standalone || 
        window.matchMedia('(display-mode: standalone)').matches;
      
      setIsInstalled(isInStandaloneMode || isIOSInstalled);
    };
    
    checkIfInstalled();
    
    // Listen for changes in display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches);
    };
    
    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    return undefined;
  }, []);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Save the event so it can be triggered later
      setInstallPromptEvent(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "You're back online",
        description: "All features are now available",
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        variant: "destructive",
        title: "You're offline",
        description: "Some features may not be available",
      });
    };
    
    // Set initial state
    setIsOnline(navigator.onLine);
    
    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  // Service Worker update detection
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      });
    }
  }, []);

  const checkForUpdates = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update().catch(() => {
          // Silent error handling for update check
        });
      });
    }
  }, []);

  const promptToInstall = useCallback(async () => {
    if (installPromptEvent) {
      try {
        await installPromptEvent.prompt();
        const choiceResult = await installPromptEvent.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setIsInstalled(true);
        } else {
          console.log('User dismissed the install prompt');
        }
        
        // Clear the saved prompt as it can only be used once
        setInstallPromptEvent(null);
      } catch (error) {
        console.error('Error while prompting to install:', error);
        
        // Fallback for browsers that don't properly support the install prompt
        toast({
          title: "Installation Instructions",
          description: "Use your browser menu to 'Add to Home Screen' or 'Install' this application",
        });
      }
    } else {
      // Handle case where prompt isn't available
      toast({
        title: "Installation Instructions",
        description: "Use your browser menu to 'Add to Home Screen' or 'Install' this application",
      });
    }
  }, [installPromptEvent, toast]);

  return {
    isOnline,
    isInstallable,
    isInstalled,
    updateAvailable,
    promptToInstall,
    checkForUpdates
  };
}
