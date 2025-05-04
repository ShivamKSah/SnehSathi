import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Users, 
  BookOpen, 
  Map, 
  MessageSquare, 
  UserRound, 
  Baby, 
  HeartPulse,
  Settings,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import ShareButton from '@/components/shared/ShareButton';
import NotificationsButton from '@/components/shared/NotificationsButton';

const NavLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Health Risk Assessment',
    path: '/risk-assessment',
  },
  {
    name: 'Nutrition Guide',
    path: '/nutrition',
  },
  {
    name: 'Healthcare Schemes',
    path: '/schemes',
  },
  {
    name: 'Resources',
    path: '/resources',
    children: [
      { name: 'Articles', path: '/articles', icon: BookOpen },
      { name: 'Community', path: '/community', icon: Users },
      { name: 'Support', path: '/support', icon: HeartPulse },
    ],
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  // Extract ProfileButton as a separate component to improve readability
  const ProfileButton = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('user');
      setUser(null);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account"
      });
      navigate('/');
    };

    if (!user?.email) {
      return <Button size="sm" onClick={() => navigate('/login')}>Login</Button>;
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              ) : (
                <AvatarFallback>
                  <UserRound className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  // Action menu for notifications, share, and settings
  const ActionMenu = () => {
    return (
      <div className="flex items-center space-x-1">
        <NotificationsButton size="icon" variant="ghost" />
        <ShareButton size="icon" variant="ghost" showLabel={false} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {
              const settingsButton = document.querySelector('[data-settings-trigger="true"]');
              if (settingsButton instanceof HTMLElement) {
                settingsButton.click();
              }
            }}>
              App Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        {
          'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100': scrolled,
          'bg-transparent': !scrolled,
        }
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-3 group">
            <img 
              src="/snehsathika.png" 
              alt="SnehSathi Logo" 
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text tracking-wide">
              SnehSathi
            </span>
          </NavLink>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {NavLinks.map((link) => {
              if (link.children) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(link.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      onClick={() => handleDropdownToggle(link.name)}
                      className={cn(
                        'flex items-center text-gray-700 hover:text-primary',
                        {
                          'text-primary': openDropdown === link.name,
                        }
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={16}
                        className={cn('ml-1 transition-transform duration-200', {
                          'rotate-180': openDropdown === link.name,
                        })}
                      />
                    </button>
                    {openDropdown === link.name && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-60 rounded-lg bg-white shadow-lg border border-gray-100 overflow-hidden z-50"
                        onMouseEnter={() => handleDropdownEnter(link.name)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="py-2">
                          {link.children.map((child) => (
                            <NavLink
                              key={child.name}
                              to={child.path}
                              className={({ isActive }) =>
                                cn(
                                  'flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-150',
                                  {
                                    'bg-gray-50 text-primary': isActive,
                                    'text-gray-700': !isActive,
                                  }
                                )
                              }
                            >
                              {child.icon && <child.icon size={16} />}
                              <span>{child.name}</span>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    cn('text-gray-700 hover:text-primary transition-colors duration-150', {
                      'text-primary font-medium': isActive,
                    })
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3">
            <NavLink to="/chat" className="text-gray-700 hover:text-primary">
              <MessageSquare size={20} />
            </NavLink>
            <ActionMenu />
            <ProfileButton />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ActionMenu />
            <button
              onClick={handleMobileMenuToggle}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {NavLinks.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.name} className="space-y-2">
                      <button
                        onClick={() => handleDropdownToggle(link.name)}
                        className="flex items-center justify-between w-full text-left text-gray-700 hover:text-primary py-2"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={16}
                          className={cn('transition-transform duration-200', {
                            'rotate-180': openDropdown === link.name,
                          })}
                        />
                      </button>
                      {openDropdown === link.name && (
                        <div className="pl-4 border-l-2 border-gray-100 space-y-2 animate-slide-down">
                          {link.children.map((child) => (
                            <NavLink
                              key={child.name}
                              to={child.path}
                              className={({ isActive }) =>
                                cn('flex items-center space-x-2 py-2 transition-colors duration-150', {
                                  'text-primary': isActive,
                                  'text-gray-600': !isActive,
                                })
                              }
                              onClick={() => setIsOpen(false)}
                            >
                              {child.icon && <child.icon size={16} />}
                              <span>{child.name}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      cn('py-2 transition-colors duration-150', {
                        'text-primary font-medium': isActive,
                        'text-gray-700': !isActive,
                      })
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                );
              })}

              <div className="pt-3 mt-3 border-t border-gray-100">
                <NavLink 
                  to="/chat" 
                  className="text-gray-700 hover:text-primary py-2 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare size={18} className="mr-2" />
                  <span>AI Chat</span>
                </NavLink>
                <div className="flex items-center justify-between pt-2">
                  <ProfileButton />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
