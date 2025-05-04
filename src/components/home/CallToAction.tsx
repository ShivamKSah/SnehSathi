
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-medium mb-6">
        Start Your Maternal Health Journey Today
      </h2>
      <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
        Take control of your maternal health with AI-powered risk assessment, personalized nutrition guidance, and access to healthcare schemes.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          size="lg" 
          variant="secondary" 
          className="bg-white text-primary hover:bg-white/90 min-w-40 group"
          onClick={() => navigate('/risk-assessment')}
        >
          Start Assessment
          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <Button 
          size="lg" 
          variant="secondary" 
          className="bg-white text-primary hover:bg-white/90 min-w-40 group"
          onClick={() => navigate('/about')}
        >
          Learn More
        </Button>
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center">
          <div className="text-3xl font-semibold mb-1">10,000+</div>
          <div className="text-white/80">Mothers Helped</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center">
          <div className="text-3xl font-semibold mb-1">93%</div>
          <div className="text-white/80">Risk Prediction Accuracy</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center">
          <div className="text-3xl font-semibold mb-1">20+</div>
          <div className="text-white/80">Government Schemes</div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default CallToAction;
