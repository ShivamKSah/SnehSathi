
import React from 'react';
import { Brain, Shield, Lock, Server } from 'lucide-react';

const AISection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-healthcare-soft-blue/40 via-white to-healthcare-pale-pink/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <span className="inline-block text-primary font-medium mb-4">AI-POWERED HEALTHCARE</span>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
              Advanced AI Technology for Maternal Healthcare
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Our platform uses state-of-the-art artificial intelligence to provide accurate, personalized maternal and child healthcare guidance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Smart Diagnosis</h3>
                  <p className="text-gray-600 text-sm">
                    AI algorithms analyze symptoms and medical history for accurate risk assessment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Privacy First</h3>
                  <p className="text-gray-600 text-sm">
                    All data is encrypted and secured with enterprise-grade protection.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Secure Access</h3>
                  <p className="text-gray-600 text-sm">
                    Multi-factor authentication ensures only authorized access to sensitive information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Server size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Continuous Learning</h3>
                  <p className="text-gray-600 text-sm">
                    Our AI system improves over time as it processes more health data.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in animation-delay-200">
            <div className="glass-card w-full rounded-2xl overflow-hidden shadow-xl aspect-square relative">
              <div className="flex flex-col h-full p-6">
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    {/* AI Visualization */}
                    <div className="w-full h-64 bg-gradient-to-br from-primary/10 via-healthcare-light-blue/20 to-healthcare-teal/10 rounded-xl flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center opacity-80">
                        <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse-soft"></div>
                        <div className="w-48 h-48 rounded-full border-2 border-primary/30 absolute animate-spin" style={{ animationDuration: '15s' }}></div>
                        <div className="w-64 h-64 rounded-full border border-primary/20 absolute animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
                      </div>
                      <div className="z-10 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 20.5V22M12 2V3.5M3.5 12H2M22 12H20.5M19.07 19.07L17.95 17.95M4.93 19.07L6.05 17.95M4.93 4.93L6.05 6.05M19.07 4.93L17.95 6.05" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Chat Interface */}
                    <div className="absolute bottom-0 right-0 w-48 bg-white rounded-lg shadow-lg p-3 transform translate-y-1/4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">AI</div>
                        <p className="text-xs font-medium">AI Assistant</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-2 text-xs text-gray-700">
                        Based on your symptoms, I recommend checking for gestational diabetes.
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="text-[10px] text-gray-500">Just now</div>
                        <div className="text-[10px] text-primary">93% confidence</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-medium">Risk Analysis Progress</h3>
                    <span className="text-sm text-primary">87%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Processing medical data</span>
                    <span>Generating results</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating label */}
            <div className="absolute -top-4 left-10 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100 animate-float">
              <span className="text-sm font-medium text-primary">Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
