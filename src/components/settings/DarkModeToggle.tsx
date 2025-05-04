
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon } from 'lucide-react';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import { useTranslation } from '@/contexts/TranslationContext';

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useAppSettings();
  const { t } = useTranslation();

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleDarkMode}
      className="flex items-center gap-2"
    >
      <Moon className={`h-4 w-4 ${darkMode ? 'text-yellow-300' : 'text-slate-400'}`} />
      <span className="sr-only md:not-sr-only">{t('common.darkMode')}</span>
    </Button>
  );
};

export default DarkModeToggle;
