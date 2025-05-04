
import { useState } from 'react';

export type CalendarEvent = {
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
};

export function useCalendar() {
  const [isAdding, setIsAdding] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const addToGoogleCalendar = (event: CalendarEvent): void => {
    try {
      setIsAdding(true);
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
      
      window.open(url, '_blank');
    } finally {
      setIsAdding(false);
    }
  };

  const addToOutlookCalendar = (event: CalendarEvent): void => {
    try {
      setIsAdding(true);
      const startDate = formatDate(event.startDate);
      const endDate = event.endDate ? formatDate(event.endDate) : startDate;
      
      let url = `https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`;
      url += `&subject=${encodeURIComponent(event.title)}`;
      url += `&startdt=${startDate}`;
      url += `&enddt=${endDate}`;
      
      if (event.description) {
        url += `&body=${encodeURIComponent(event.description)}`;
      }
      
      if (event.location) {
        url += `&location=${encodeURIComponent(event.location)}`;
      }
      
      window.open(url, '_blank');
    } finally {
      setIsAdding(false);
    }
  };

  const downloadICalFile = (event: CalendarEvent): void => {
    try {
      setIsAdding(true);
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
      
      const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsAdding(false);
    }
  };

  return {
    isAdding,
    addToGoogleCalendar,
    addToOutlookCalendar,
    downloadICalFile
  };
}
