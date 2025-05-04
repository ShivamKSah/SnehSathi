
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900">Terms of Service</h1>

      <div className="space-y-10 text-gray-800 text-base leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you and 
            SnehSathi concerning your access to and use of our maternal health platform. 
            By accessing or using our service, you agree to be bound by these Terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Medical Disclaimer</h2>
          <p>
            SnehSathi is a supportive tool for maternal health and is not a substitute for 
            professional medical advice, diagnosis, or treatment. Always seek the advice of your 
            physician or other qualified health provider with any questions you may have regarding 
            a medical condition. Never disregard professional medical advice or delay in seeking it 
            because of something you have read on our platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current 
            information at all times. Failure to do so constitutes a breach of the Terms, which may 
            result in immediate termination of your account.
          </p>
          <p>
            You are responsible for safeguarding the password and for all activities that occur under 
            your account. You agree not to disclose your password to any third party.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the 
            exclusive property of SnehSathi and its licensors. The Service is protected by copyright, 
            trademark, and other laws.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">User Contributions</h2>
          <p>
            Our Service may allow you to post, link, store, share and otherwise make available certain 
            information, text, graphics, videos, or other material in community forums. You are responsible 
            for the content you contribute and must ensure it complies with all laws and regulations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, 
            for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
          <p>
            In no event shall SnehSathi, nor its directors, employees, partners, agents, suppliers, 
            or affiliates, be liable for any indirect, incidental, special, consequential or punitive 
            damages, including without limitation, loss of profits, data, use, goodwill, or other 
            intangible losses, resulting from your access to or use of or inability to access or use 
            the Service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of India. SnehSathi and 
            yourself irrevocably consent to the exclusive jurisdiction of the courts in New Delhi, India
            for any action arising out of or relating to these Terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, 
            we will provide at least 30 days' notice prior to any new terms taking effect.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <ul className="list-none mt-2 space-y-1">
            <li><strong>Email:</strong> legal@snehsathi.org</li>
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

export default TermsOfService;
