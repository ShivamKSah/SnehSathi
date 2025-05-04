
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BellRing } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Dummy notifications for demonstration
const dummyNotifications = [
  {
    id: '1',
    title: 'Appointment Reminder',
    description: 'Your prenatal checkup is scheduled for tomorrow at 10:00 AM',
    date: '10 min ago',
    read: false,
    type: 'appointment',
  },
  {
    id: '2',
    title: 'Nutrition Plan Updated',
    description: 'Your personalized nutrition plan for the second trimester has been updated',
    date: '2 hours ago',
    read: false,
    type: 'nutrition',
  },
  {
    id: '3',
    title: 'New Article',
    description: 'New article available: "Managing Morning Sickness - Practical Tips"',
    date: 'Yesterday',
    read: true,
    type: 'article',
  },
  {
    id: '4',
    title: 'Community Activity',
    description: 'Someone replied to your question in the community forum',
    date: '2 days ago',
    read: true,
    type: 'community',
  },
];

type NotificationItemProps = {
  notification: {
    id: string;
    title: string;
    description: string;
    date: string;
    read: boolean;
    type: string;
  };
  onMarkAsRead: (id: string) => void;
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  return (
    <Card 
      className={cn(
        "mb-2 cursor-pointer hover:bg-muted/50 transition-colors",
        !notification.read && "border-l-4 border-l-primary"
      )}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <CardHeader className="py-2 px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">{notification.title}</CardTitle>
          <span className="text-xs text-muted-foreground">{notification.date}</span>
        </div>
      </CardHeader>
      <CardContent className="py-1 px-3">
        <CardDescription className="text-xs">{notification.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

type NotificationsButtonProps = {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
};

const NotificationsButton: React.FC<NotificationsButtonProps> = ({
  variant = 'ghost',
  size = 'icon',
  className = '',
  showText = false,
}) => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={variant} size={size} className={cn("relative flex items-center", className)}>
          <BellRing className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              className={cn("absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center",
                showText && "relative static ml-2")}
            >
              {unreadCount}
            </Badge>
          )}
          {showText && <span className="ml-2">{t('common.notifications')}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-3 border-b flex items-center justify-between">
          <h3 className="font-medium">{t('common.notifications')}</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="text-xs h-7"
            >
              {t('common.markAllAsRead')}
            </Button>
          )}
        </div>
        <ScrollArea className="h-[350px]">
          <div className="p-3">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                {t('common.noNotifications')}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-3 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs" 
            onClick={() => setOpen(false)}
          >
            {t('common.viewAll')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsButton;
