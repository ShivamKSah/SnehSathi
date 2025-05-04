
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-healthcare-soft-blue/30 rounded-bl-[100px] opacity-60 transform rotate-3 translate-x-1/4 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-healthcare-pale-pink/40 rounded-tr-[100px] opacity-60 transform -rotate-6 -translate-x-10 translate-y-10"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-healthcare-soft-blue/30 text-primary text-sm font-medium mb-6">
              <Sparkles size={14} className="mr-1" />
              <span>AI-Powered SnehSathi</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Empowering Mothers with{" "}
              <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
                AI-Driven
              </span>{" "}
              Healthcare
            </h1>

            
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Personalized SnehSathi with AI risk assessment, nutrition guidance, and access to healthcare schemes - all designed to support you through every stage of motherhood.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg"
                className="group"
                onClick={() => navigate('/risk-assessment')}
              >
                Start Health Assessment
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Heart size={20} />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium">AI Risk Assessment</h3>
                  <p className="text-gray-600 text-sm">Identify health risks early with our AI-powered tools</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium">HIPAA Compliant</h3>
                  <p className="text-gray-600 text-sm">Your health data is secure and protected</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative animate-fade-in animation-delay-300">
            <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:max-w-full">
              <div className="aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-3xl shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Mother and Child" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating card - mobile view might hide this */}
              <div className={cn(
                "absolute bottom-6 left-6 right-6 bg-white p-4 rounded-xl shadow-lg",
                "sm:w-64 md:w-72 lg:w-80 sm:right-auto"
              )}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-healthcare-teal/10 flex items-center justify-center text-healthcare-teal shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                      <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"></path>
                      <path d="M5 14h14"></path>
                      <path d="M9 16v2"></path>
                      <path d="M15 16v2"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Government Schemes</div>
                    <h3 className="text-gray-900 font-medium text-base mb-1">Eligible for 3 Programs</h3>
                    <p className="text-gray-600 text-sm">Based on your profile and location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
