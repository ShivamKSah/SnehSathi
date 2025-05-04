
import React, { createContext, useContext } from 'react';
import { getText, Language } from '@/utils/translations';
import { useAppSettings } from './AppSettingsContext';

type TranslationContextType = {
  t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useAppSettings();
  
  const t = (key: string) => getText(key, language);

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
