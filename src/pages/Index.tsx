
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AISection from "@/components/home/AISection";
import CallToAction from "@/components/home/CallToAction";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <TestimonialsSection />
      <AISection />
      
      {/* ASHA Worker Portal Banner */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-100 py-12 px-4">
  <div className="container mx-auto max-w-5xl">
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl bg-white shadow-xl border border-purple-200">
      <div className="flex items-start gap-4">
        <div className="bg-purple-100 p-3 rounded-full shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.84 6.514L12 20l-7-2.908a12.083 12.083 0 01.84-6.514L12 14z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-purple-800 mb-1">ASHA Worker Portal</h2>
          <p className="text-gray-600">
            Seamlessly manage patient registrations, follow-ups, and access maternal care data.
          </p>
        </div>
      </div>
      <Link to="/asha-login">
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-lg shadow-lg transition-all">
          Access ASHA Portal
        </Button>
      </Link>
    </div>
  </div>
</div>
      
      <CallToAction />
    </Layout>
  );
};

export default Index;
