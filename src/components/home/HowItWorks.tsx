
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create a Profile',
    description: 'Set up your personal or family profile with basic health information and preferences.',
  },
  {
    number: '02',
    title: 'Complete Health Assessment',
    description: 'Answer questions about your health history, current symptoms, and lifestyle factors.',
  },
  {
    number: '03',
    title: 'Get Personalized Insights',
    description: 'Receive AI-generated health insights, risk assessments, and personalized recommendations.',
  },
  {
    number: '04',
    title: 'Explore Eligible Schemes',
    description: 'Discover government healthcare programs you qualify for based on your profile.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
                How Our Platform Works
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our intuitive process makes it easy to access personalized maternal and child healthcare.
              </p>

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex animate-slide-right" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="mr-6">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="h-full w-px bg-gray-200 mx-auto mt-2"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center text-primary font-medium cursor-pointer group">
                <span>Learn more about our approach</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-healthcare-soft-blue to-healthcare-pale-pink rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Doctor consulting with pregnant woman" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-90"
                />
              </div>

              {/* Testimonial/Stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg max-w-xs animate-fade-in">
                <div className="flex items-center mb-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="text-sm font-medium">Priya Sharma</h4>
                    <p className="text-xs text-gray-500">Mother of two</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  "The AI risk assessment identified my gestational diabetes early, allowing for timely intervention."
                </p>
                <div className="flex items-center text-amber-500">
                  <span>★★★★★</span>
                  <span className="text-gray-500 text-xs ml-2">5.0 rating</span>
                </div>
              </div>

              {/* Stats card */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-lg animate-fade-in animation-delay-200">
                <h4 className="text-gray-900 font-medium mb-2">Impact Statistics</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle2 size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">93% accuracy in risk prediction</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">10,000+ mothers assisted</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">20+ government schemes integrated</span>
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

export default HowItWorks;
