
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import AppSettings from '@/components/settings/AppSettings';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useAppSettings();
  
  return (
    <div className={`flex flex-col min-h-screen w-full ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <main className="flex-grow pt-16 w-full">{children}</main>
      <Footer />
      <div className="fixed bottom-4 right-4 z-40">
        <AppSettings />
      </div>
    </div>
  );
};

export default Layout;
