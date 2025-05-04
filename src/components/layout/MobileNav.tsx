
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Home, 
  Activity, 
  Apple, 
  FileText, 
  Book, 
  Users, 
  HeadsetIcon, 
  MessageSquare, 
  Info,
  LogIn,
  BellRing,
  CalendarDays
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import DarkModeToggle from '../settings/DarkModeToggle';
import LanguageSelector from '../settings/LanguageSelector';
import { usePwa } from '@/hooks/use-pwa';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const MobileNav: React.FC = () => {
  const { t } = useTranslation();
  const { isOnline } = usePwa();
  
  const navItems = [
    { path: '/', label: 'nav.home', icon: Home },
    { path: '/risk-assessment', label: 'nav.risk', icon: Activity },
    { path: '/nutrition', label: 'nav.nutrition', icon: Apple },
    { path: '/schemes', label: 'nav.schemes', icon: FileText },
    { path: '/resources', label: 'nav.resources', icon: Book },
    { path: '/appointments', label: 'nav.appointments', icon: CalendarDays },
    { path: '/community', label: 'nav.community', icon: Users },
    { path: '/support', label: 'nav.support', icon: HeadsetIcon },
    { path: '/chat', label: 'nav.chat', icon: MessageSquare, badge: 'New' },
    { path: '/about', label: 'nav.about', icon: Info },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Maternal Mind Nurture</SheetTitle>
          <div className="flex items-center justify-between mt-2">
            <DarkModeToggle />
            <LanguageSelector />
            {!isOnline && (
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                Offline
              </Badge>
            )}
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto py-2">
          <nav className="px-2">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        cn(
                          "flex items-center py-2 px-3 rounded-md transition-colors",
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-secondary"
                        )
                      }
                    >
                      <Icon className="h-5 w-5 mr-3 shrink-0" />
                      <span>{t(item.label)}</span>
                      {item.badge && (
                        <Badge className="ml-auto" variant="outline">
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        
        <SheetFooter className="p-4 mt-auto border-t">
          <NavLink 
            to="/notifications" 
            className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-secondary w-full"
          >
            <BellRing className="h-5 w-5 mr-3" />
            {t('nav.notifications')}
          </NavLink>
          
          <NavLink 
            to="/login" 
            className="flex w-full items-center justify-center py-2 px-4 bg-primary text-primary-foreground rounded-md"
          >
            <LogIn className="h-5 w-5 mr-2" />
            {t('nav.login')}
          </NavLink>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
