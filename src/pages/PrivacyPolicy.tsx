
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="pt-24 pb-16 font-sans">
  <div className="container mx-auto px-4">
    <Button 
      variant="ghost" 
      size="sm" 
      className="mb-6 flex items-center"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft size={16} className="mr-2" />
      Back
    </Button>

    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Privacy Policy</h1>
      
      <div className="space-y-10 text-gray-700 text-base leading-relaxed">
        
        <div>
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p>
            Welcome to <span className="font-medium text-gray-900">SnehSathi</span>. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you use our maternal health platform.
          </p>
          <p className="mt-2 italic text-gray-600">
            Please read this privacy policy carefully. If you do not agree with the terms, please do not access the application.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
          <p className="mb-2">We may collect the following types of information:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Personal identification:</strong> Name, email, phone number</li>
            <li><strong>Health data:</strong> Information necessary for risk assessments</li>
            <li><strong>Demographics:</strong> Age, location, and other general info</li>
            <li><strong>Location data:</strong> For localized health services</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
          <p className="mb-2">Your data helps us improve and personalize your experience. We use it to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide and maintain our service</li>
            <li>Perform health risk assessments</li>
            <li>Improve user experience and platform features</li>
            <li>Send updates or notifications</li>
            <li>Offer customer support</li>
            <li>Monitor platform usage</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Security of Your Information</h2>
          <p>
            We implement administrative, technical, and physical security measures to protect your personal information. 
            While we strive to use industry-standard safeguards, <span className="italic">no method is 100% secure</span>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Disclosure of Your Information</h2>
          <p className="mb-2">
            We may share your data with third-party service providers for:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Payment processing</li>
            <li>Data analytics and hosting</li>
            <li>Customer support and marketing</li>
          </ul>
          <p className="mt-2">
            We may also disclose information when legally required or requested by public authorities.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Children's Privacy</h2>
          <p>
            Our services are not intended for users under the age of 18. We do not knowingly collect data from minors. 
            If such data is found, we will delete it promptly.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Changes to This Privacy Policy</h2>
          <p>
            We may revise this policy periodically. Changes will be posted here along with an updated "Last Updated" date.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>For any questions, reach out to us at:</p>
          <ul className="list-none mt-2 space-y-1">
            <li><strong>Email:</strong> privacy@snehsathi.org</li>
            <li><strong>Phone:</strong> +91 1234567890</li>
            <li><strong>Address:</strong> SnehSathi Foundation, Healthcare Plaza, New Delhi, India</li>
          </ul>
        </div>

        <p className="text-sm text-gray-500 mt-8">Last Updated: May 3, 2025</p>
      </div>
    </div>
  </div>
</section>
    </Layout>
  );
};

export default PrivacyPolicy;
