
import React from 'react';
import { Heart, Baby, Utensils, FileText, Mic, Wifi } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Maternal Health Risk Prediction',
    description: 'AI-powered risk assessment based on symptoms, medical history, and user input with interactive questionnaires for personalized screening.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Utensils,
    title: 'Personalized Nutritional Guidance',
    description: 'AI-powered dietary recommendations based on local food availability and cultural preferences with smart nutrition tracking.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: FileText,
    title: 'Healthcare Scheme Matching',
    description: 'Automated eligibility checker that recommends relevant government schemes with guided application assistance.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Mic,
    title: 'Voice & Multilingual Support',
    description: 'Speech-to-text assistant for low-literacy users and ASHA workers with support for multiple Indian languages.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Wifi,
    title: 'Offline Mode & Data Syncing',
    description: 'Collect data offline in areas with limited internet access and sync automatically when connectivity is restored.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Baby,
    title: 'Child Growth Monitoring',
    description: 'Track your child\'s growth and development milestones with AI-powered insights and personalized recommendations.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Comprehensive Care Features
          </h2>
          <p className="text-xl text-gray-600">
            Our platform combines AI technology with healthcare expertise to provide a complete maternal and child care solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center ${feature.color} mb-5`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
