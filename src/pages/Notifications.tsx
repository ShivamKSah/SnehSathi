
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { BellRing, Calendar, MessageSquare, Apple, FileText, CheckCircle, TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/contexts/TranslationContext';

// Dummy data for notifications
const dummyNotifications = [
  {
    id: '1',
    title: 'Appointment Reminder',
    description: 'Your prenatal checkup is scheduled for tomorrow at 10:00 AM.',
    date: '2023-05-01T10:30:00',
    formattedDate: '10 minutes ago',
    read: false,
    type: 'appointment',
  },
  {
    id: '2',
    title: 'Nutrition Plan Updated',
    description: 'Your personalized nutrition plan for the second trimester has been updated.',
    date: '2023-05-01T09:00:00',
    formattedDate: '2 hours ago',
    read: false,
    type: 'nutrition',
  },
  {
    id: '3',
    title: 'New Community Post',
    description: 'Someone replied to your question in the community forum.',
    date: '2023-04-30T15:45:00',
    formattedDate: 'Yesterday',
    read: true,
    type: 'community',
  },
  {
    id: '4',
    title: 'New Article Available',
    description: 'New article: "Managing Morning Sickness - Practical Tips"',
    date: '2023-04-28T11:20:00',
    formattedDate: '3 days ago',
    read: true,
    type: 'article',
  },
  {
    id: '5',
    title: 'Weekly Health Tip',
    description: 'Stay hydrated! Aim for 8-10 glasses of water daily during pregnancy.',
    date: '2023-04-24T08:15:00',
    formattedDate: '1 week ago',
    read: true,
    type: 'health',
  },
];

type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  read: boolean;
  type: string;
};

const NotificationIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'appointment':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'nutrition':
      return <Apple className="h-5 w-5 text-green-500" />;
    case 'community':
      return <MessageSquare className="h-5 w-5 text-violet-500" />;
    case 'article':
    case 'health':
      return <FileText className="h-5 w-5 text-amber-500" />;
    default:
      return <BellRing className="h-5 w-5 text-gray-500" />;
  }
};

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
  
  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const filteredNotifications = notifications.filter(notification => {
    // Filter by tab
    if (activeTab !== 'all' && notification.type !== activeTab) {
      return false;
    }
    
    // Filter by search
    if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !notification.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-medium text-gray-900 mb-2">
                  {t('common.notifications')}
                  {unreadCount > 0 && (
                    <Badge className="ml-2" variant="secondary">{unreadCount} {t('common.unread')}</Badge>
                  )}
                </h1>
                <p className="text-gray-600">
                  {t('notifications.subtitle')}
                </p>
              </div>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2" 
                    onClick={handleMarkAllAsRead}
                  >
                    <CheckCircle className="h-4 w-4" />
                    {t('common.markAllAsRead')}
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 text-destructive hover:text-destructive" 
                    onClick={handleClearAll}
                  >
                    <TrashIcon className="h-4 w-4" />
                    {t('common.clearAll')}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <Input
                  placeholder={t('notifications.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <div className="px-4 border-b">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="all" className="relative">
                      {t('common.all')}
                      {notifications.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {notifications.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="appointment">
                      {t('notifications.appointments')}
                      {notifications.filter(n => n.type === 'appointment').length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {notifications.filter(n => n.type === 'appointment').length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="nutrition">
                      {t('notifications.nutrition')}
                      {notifications.filter(n => n.type === 'nutrition').length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {notifications.filter(n => n.type === 'nutrition').length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="community">
                      {t('notifications.community')}
                      {notifications.filter(n => n.type === 'community').length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {notifications.filter(n => n.type === 'community').length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="m-0">
                  <div className="divide-y">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "p-4 hover:bg-muted/50 transition-colors",
                            !notification.read && "bg-primary/5 border-l-4 border-l-primary"
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div className="rounded-full bg-muted p-2">
                              <NotificationIcon type={notification.type} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className={cn(
                                  "text-sm font-medium", 
                                  !notification.read && "text-primary"
                                )}>
                                  {notification.title}
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                  {notification.formattedDate}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.description}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="h-8 w-8"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="sr-only">{t('common.markAsRead')}</span>
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="h-8 w-8 text-destructive"
                              >
                                <TrashIcon className="h-4 w-4" />
                                <span className="sr-only">{t('common.delete')}</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-center">
                        <BellRing className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">{t('notifications.noNotificationsTitle')}</h3>
                        <p className="text-muted-foreground mt-1">
                          {t('notifications.noNotificationsDescription')}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {['appointment', 'nutrition', 'community'].map((tabValue) => (
                  <TabsContent key={tabValue} value={tabValue} className="m-0">
                    <div className="divide-y">
                      {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              "p-4 hover:bg-muted/50 transition-colors",
                              !notification.read && "bg-primary/5 border-l-4 border-l-primary"
                            )}
                          >
                            <div className="flex items-start gap-4">
                              <div className="rounded-full bg-muted p-2">
                                <NotificationIcon type={notification.type} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className={cn(
                                    "text-sm font-medium", 
                                    !notification.read && "text-primary"
                                  )}>
                                    {notification.title}
                                  </h3>
                                  <span className="text-xs text-muted-foreground">
                                    {notification.formattedDate}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.description}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                {!notification.read && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className="h-8 w-8"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    <span className="sr-only">{t('common.markAsRead')}</span>
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleDeleteNotification(notification.id)}
                                  className="h-8 w-8 text-destructive"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                  <span className="sr-only">{t('common.delete')}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                          <BellRing className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">{t('notifications.noNotificationsInCategory')}</h3>
                          <p className="text-muted-foreground mt-1">
                            {t('notifications.checkBackLater')}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Notifications;
