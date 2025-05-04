
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Users, MessageSquare, BookOpen, CalendarClock, Calendar, Hospital } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AppointmentCard from '@/components/resources/AppointmentCard';

const Resources: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              <BookOpen size={14} className="mr-1" />
              <span>Resources Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Maternal Health Resources
            </h1>
            <p className="text-xl text-gray-600">
              Access comprehensive tools and information to support your maternal health journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <AppointmentCard />
            
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Articles & Guides</CardTitle>
                <CardDescription>
                  Evidence-based information and guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <p className="text-sm">
                    Browse articles written by healthcare professionals covering all aspects of maternal health, from pregnancy to postpartum care.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Pregnancy care and wellness</li>
                    <li>• Nutrition and healthy eating</li>
                    <li>• Labor and delivery preparation</li>
                    <li>• Postpartum recovery</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/articles')} variant="outline" className="w-full">
                  Browse Articles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Community Forums</CardTitle>
                <CardDescription>
                  Connect with other mothers and experts
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <p className="text-sm">
                    Join our supportive community where you can ask questions, share experiences, and connect with others on similar journeys.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Discussion forums by trimester</li>
                    <li>• Specialized support groups</li>
                    <li>• Expert Q&A sessions</li>
                    <li>• Share your stories</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/community')} variant="outline" className="w-full">
                  Join Community
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <CalendarClock className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Government Schemes</CardTitle>
                <CardDescription>
                  Access benefits and support programs
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <p className="text-sm">
                    Learn about government schemes and benefits available to support maternal health and childcare.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Financial assistance programs</li>
                    <li>• Healthcare subsidies</li>
                    <li>• Maternity leave policies</li>
                    <li>• Childcare support</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/schemes')} variant="outline" className="w-full">
                  Explore Schemes
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>AI Chat Assistant</CardTitle>
                <CardDescription>
                  Get instant answers to your questions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <p className="text-sm">
                    Our AI-powered chat assistant can provide immediate answers to common questions and direct you to appropriate resources.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• 24/7 available support</li>
                    <li>• Evidence-based information</li>
                    <li>• Pregnancy and postpartum guidance</li>
                    <li>• Resource recommendations</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/chat')} variant="outline" className="w-full">
                  Start Chatting
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Support Services</CardTitle>
                <CardDescription>
                  Get help when you need it most
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <p className="text-sm">
                    Access various support services designed to assist you throughout your maternal health journey.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Mental health resources</li>
                    <li>• Lactation support</li>
                    <li>• Emergency contacts</li>
                    <li>• SnehSathi helplines</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/support')} variant="outline" className="w-full">
                  Find Support
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
