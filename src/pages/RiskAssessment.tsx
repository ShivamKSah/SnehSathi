
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import RiskAssessmentForm from '@/components/risk-assessment/RiskAssessmentForm';
import { ArrowLeft, ShieldAlert, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RiskAssessment: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-healthcare-soft-blue/30 via-white/80 to-healthcare-pale-pink/30 opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <ShieldAlert size={14} className="mr-1" />
              <span>AI-Powered Health Assessment</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Maternal Health Risk Assessment
            </h1>
            <p className="text-xl text-gray-600">
              Answer a few questions about your health to receive personalized insights and recommendations.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex">
              <Info size={20} className="text-blue-500 mr-3 shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-800 mb-1 font-medium">This is not a medical diagnosis</p>
                <p className="text-blue-700 text-sm">
                  This assessment provides general guidance based on your responses. Always consult with a healthcare professional for medical advice. Seek immediate medical attention for urgent health concerns.
                </p>
              </div>
            </div>
          </div>
          
          <RiskAssessmentForm />
          
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Why Use Our Health Risk Assessment?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Early Detection</h4>
                <p className="text-gray-600">
                  Our AI model identifies potential health risks early, allowing for timely intervention and better outcomes.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21H21M3 18H21M8 3H16C16.5304 3 17.0391 3.21071 17.4142 3.58579C17.7893 3.96086 18 4.46957 18 5V18H6V5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Personalized Insights</h4>
                <p className="text-gray-600">
                  Receive tailored recommendations based on your unique health profile and risk factors.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Scientific Approach</h4>
                <p className="text-gray-600">
                  Our model is built on medical research and trained using real-world maternal health data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RiskAssessment;
