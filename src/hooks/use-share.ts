
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type ShareContent = {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
  hashtags?: string[];
};

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const share = async (content: ShareContent = {}): Promise<boolean> => {
    try {
      setIsSharing(true);
      
      const shareData = {
        title: content.title || document.title,
        text: content.text || '',
        url: content.url || window.location.href,
        files: content.files || []
      };
      
      // Check if the Web Share API is available and can share this content
      if (navigator.share && 
          navigator.canShare && 
          navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return true;
      } else {
        // Fallback for browsers without Web Share API
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        toast({
          title: 'Link copied to clipboard',
          description: 'You can now share it with others',
        });
        return true;
      }
    } catch (err) {
      console.error('Error sharing:', err);
      toast({
        variant: 'destructive',
        title: 'Sharing failed',
        description: 'Please try again later',
      });
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  const shareOnTwitter = (content: ShareContent = {}): void => {
    const text = content.text || '';
    const url = content.url || window.location.href;
    const hashtags = content.hashtags?.join(',') || '';
    
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}${hashtags ? `&hashtags=${hashtags}` : ''}`;
    window.open(twitterShareUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnFacebook = (content: ShareContent = {}): void => {
    const url = content.url || window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookShareUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnWhatsApp = (content: ShareContent = {}): void => {
    const text = content.text || '';
    const url = content.url || window.location.href;
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
    window.open(whatsappShareUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnTelegram = (content: ShareContent = {}): void => {
    const text = content.text || '';
    const url = content.url || window.location.href;
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(telegramShareUrl, '_blank', 'noopener,noreferrer');
  };

  const shareViaEmail = (content: ShareContent = {}): void => {
    const subject = content.title || document.title;
    const body = `${content.text || ''}\n\n${content.url || window.location.href}`;
    const emailShareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailShareUrl);
  };

  const shareViaSMS = (content: ShareContent = {}): void => {
    const text = content.text || '';
    const url = content.url || window.location.href;
    const smsShareUrl = `sms:?body=${encodeURIComponent(`${text} ${url}`)}`;
    window.open(smsShareUrl);
  };

  return {
    isSharing,
    share,
    shareOnTwitter,
    shareOnFacebook,
    shareOnWhatsApp,
    shareOnTelegram,
    shareViaEmail,
    shareViaSMS
  };
}
