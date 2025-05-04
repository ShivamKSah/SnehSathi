
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Heart, Users, Award, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="pt-24 pb-16 bg-gradient-to-b from-white to-purple-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <img src="/snehsathika.png" alt="SnehSathi logo" className="w-14 h-14 object-contain" />
          </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              About SnehSathi
            </h1>
            <p className="text-xl text-gray-600">
              We are on a mission to make maternal healthcare accessible, personalized, and effective for every woman.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl font-medium text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  SnehSathi was founded with a simple yet powerful mission: to leverage technology to improve maternal health outcomes. 
                  We believe that every woman deserves access to high-quality healthcare information, personalized to her unique needs.
                </p>
                <p className="text-gray-600">
                  Through our AI-driven platform, we aim to bridge gaps in maternal healthcare access, especially in underserved communities, 
                  by providing risk assessments, nutritional guidance, and connecting women with government healthcare schemes.
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 min-h-[300px] md:min-h-full flex items-center justify-center p-8">
                <img 
                  src="https://images.unsplash.com/photo-1566647387313-9fda80664848?q=80&w=2574" 
                  alt="Mother and child" 
                  className="rounded-lg shadow-lg max-w-full max-h-[300px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Users className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Our Team</h3>
              <p className="text-gray-600">
                Our diverse team includes healthcare professionals, data scientists, and technology experts, all united by our passion for maternal health.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Award className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Our Approach</h3>
              <p className="text-gray-600">
                We combine AI technology with evidence-based medical knowledge to provide personalized, actionable healthcare guidance.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Our Impact</h3>
              <p className="text-gray-600">
                Since our inception, we've helped thousands of women access better maternal healthcare and navigate available support systems.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-medium text-gray-900 text-center mb-10">Our Core Values</h2>
            <div className="space-y-6">
              {[
                {
                  title: "Accessibility",
                  description: "Making quality maternal healthcare information available to all women, regardless of location or economic status."
                },
                {
                  title: "Personalization",
                  description: "Recognizing that each pregnancy is unique and providing tailored guidance based on individual circumstances."
                },
                {
                  title: "Evidence-Based Approach",
                  description: "Ensuring all our recommendations are grounded in the latest medical research and best practices."
                },
                {
                  title: "Empowerment",
                  description: "Giving women the knowledge and tools they need to make informed decisions about their health."
                }
              ].map((value, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1">
                    <CheckCircle className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 rounded-xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Join Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Whether you're a healthcare professional, a tech enthusiast, or simply passionate about maternal health, 
              there are many ways to get involved with our work and help us make a difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/support" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Contact Us
              </a>
              <a href="/community" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Join Community
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
