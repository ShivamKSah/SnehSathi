
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, HeartHandshake, Mail, Phone, MapPin, SendHorizontal, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const Support: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
  };

  return (
    <Layout>
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate('/resources')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Resources
          </Button>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <HeartHandshake size={14} className="mr-1" />
              <span>We're Here to Help</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Support & Contact
            </h1>
            <p className="text-xl text-gray-600">
              Have questions or need assistance? Reach out to our dedicated maternal health support team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-medium text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-gray-600">
                  Our team of maternal health specialists and support staff are available to assist you with any questions, concerns, or feedback you may have.
                </p>
              </div>
              
              <Card className="overflow-hidden mb-8">
                <CardContent className="p-0">
                  <div className="bg-primary/5 p-6 border-b">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Our Support Channels</h3>
                    <p className="text-gray-600 text-sm">Choose the method that works best for you.</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-4">
                        <Phone size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Phone Support</h4>
                        <p className="text-gray-600 mb-1">Available Mon-Fri, 9am-5pm</p>
                        <a href="tel:+911234567890" className="text-primary hover:underline">+91 12345 67890</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-4">
                        <Mail size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Email Support</h4>
                        <p className="text-gray-600 mb-1">We'll respond within 24 hours</p>
                        <a href="mailto:support@maternalcare.org" className="text-primary hover:underline">support@maternalcare.org</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-4">
                        <MessageCircle size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Live Chat</h4>
                        <p className="text-gray-600 mb-1">Instant support from our AI assistant</p>
                        <Button variant="link" className="text-primary p-0 h-auto" onClick={() => navigate('/chat')}>
                          Start chatting now
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-4">
                        <MapPin size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Visit Us</h4>
                        <p className="text-gray-600">
                          123 Healthcare Avenue, <br />
                          Medical District, <br />
                          New Delhi, 110001
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-primary/10 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Emergency Support</h3>
                <p className="text-gray-700 mb-4">
                  If you're experiencing a medical emergency, please call your local emergency services immediately.
                </p>
                <div className="flex items-center text-primary font-medium">
                  <Phone size={18} className="mr-2" />
                  <span>Emergency: 112</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your query or concern..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <SendHorizontal size={16} className="mr-2" />
                  Send Message
                </Button>
                
                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
