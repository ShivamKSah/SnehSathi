
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

type CalendarEvent = {
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
};

type AddToCalendarButtonProps = {
  event: CalendarEvent;
};

const AddToCalendarButton: React.FC<AddToCalendarButtonProps> = ({ event }) => {
  const { t } = useTranslation();
  
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const generateGoogleCalendarUrl = (): string => {
    const startDate = formatDate(event.startDate);
    const endDate = event.endDate ? formatDate(event.endDate) : startDate;
    
    let url = `https://calendar.google.com/calendar/render?action=TEMPLATE`;
    url += `&text=${encodeURIComponent(event.title)}`;
    url += `&dates=${startDate}/${endDate}`;
    
    if (event.description) {
      url += `&details=${encodeURIComponent(event.description)}`;
    }
    
    if (event.location) {
      url += `&location=${encodeURIComponent(event.location)}`;
    }
    
    return url;
  };

  const generateICalContent = (): string => {
    const startDate = formatDate(event.startDate);
    const endDate = event.endDate ? formatDate(event.endDate) : startDate;
    
    let content = 'BEGIN:VCALENDAR\n';
    content += 'VERSION:2.0\n';
    content += 'BEGIN:VEVENT\n';
    content += `DTSTART:${startDate}\n`;
    content += `DTEND:${endDate}\n`;
    content += `SUMMARY:${event.title}\n`;
    
    if (event.description) {
      content += `DESCRIPTION:${event.description}\n`;
    }
    
    if (event.location) {
      content += `LOCATION:${event.location}\n`;
    }
    
    content += 'END:VEVENT\n';
    content += 'END:VCALENDAR';
    
    return content;
  };

  const handleAddToCalendar = () => {
    window.open(generateGoogleCalendarUrl(), '_blank');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleAddToCalendar}
      className="flex items-center gap-2"
    >
      <Calendar className="h-4 w-4" />
      <span>{t('common.addToCalendar')}</span>
    </Button>
  );
};

export default AddToCalendarButton;
