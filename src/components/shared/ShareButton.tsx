import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Facebook, MessageCircle, Mail, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/contexts/TranslationContext';
import { useShare, ShareContent } from '@/hooks/use-share';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ShareButtonProps = {
  title?: string;
  text?: string;
  url?: string;
  hashtags?: string[];
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showLabel?: boolean;
};

const ShareButton: React.FC<ShareButtonProps> = ({
  title = 'Maternal Mind Nurture',
  text = 'Check out this maternal health resource!',
  url,
  hashtags = ['MaternalHealth', 'HealthcareApp'],
  variant = 'outline',
  size = 'sm',
  className = '',
  showLabel = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { 
    share,
    shareOnTwitter,
    shareOnFacebook,
    shareOnWhatsApp,
    shareViaEmail,
    shareViaSMS
  } = useShare();

  const content: ShareContent = {
    title,
    text,
    url: url || window.location.href,
    hashtags
  };

  const handleNativeShare = async () => {
    setIsLoading(true);
    await share(content);
    setIsLoading(false);
  };

  // Check if native sharing is supported
  const isNativeShareSupported = navigator.share && 
    navigator.canShare && 
    navigator.canShare({
      title: content.title,
      text: content.text,
      url: content.url
    });

  if (isNativeShareSupported) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleNativeShare}
        disabled={isLoading}
        className={cn("flex items-center gap-2", className)}
      >
        <Share2 className="h-4 w-4" />
        {showLabel && <span>{t('common.share')}</span>}
      </Button>
    );
  }

  // Fallback to dropdown menu for platforms without native sharing
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("flex items-center gap-2", className)}
        >
          <Share2 className="h-4 w-4" />
          {showLabel && <span>{t('common.share')}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('common.shareVia')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => shareOnTwitter(content)}>
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareOnFacebook(content)}>
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareOnWhatsApp(content)}>
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaEmail(content)}>
          <Mail className="h-4 w-4 mr-2" />
          Email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaSMS(content)}>
          <Smartphone className="h-4 w-4 mr-2" />
          SMS
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => {
          await navigator.clipboard.writeText(`${content.title}\n${content.text}\n${content.url}`);
          toast({
            title: 'Link copied to clipboard',
            description: 'You can now share it with others',
          });
        }}>
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
