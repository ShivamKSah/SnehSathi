import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLocation } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Check, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RiskAssessmentResults {
  riskLevel: 'low' | 'moderate' | 'high' | null;
  answers: Record<string, any>;
  date: string;
}

interface NutritionItem {
  title: string;
  description: string;
  benefits: string[];
  examples: string[];
  color: string;
}

const Nutrition: React.FC = () => {
  const location = useLocation();
  const [riskResults, setRiskResults] = useState<RiskAssessmentResults | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    if (location.state?.fromRiskAssessment) {
      const storedResults = localStorage.getItem('riskAssessmentResults');
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults);
          setRiskResults(parsedResults);
          setShowRecommendations(true);
        } catch (e) {
          console.error("Failed to parse risk assessment results", e);
        }
      }
    }
    
    window.scrollTo(0, 0);
  }, [location]);

  const getNutritionRecommendations = () => {
    const baseNutrition: NutritionItem[] = [
      {
        title: 'Folate-Rich Foods',
        description: 'Folate is essential for preventing neural tube defects in early pregnancy.',
        benefits: ['Prevents birth defects', 'Supports cell division', 'Promotes healthy red blood cells'],
        examples: ['Leafy greens (spinach, kale)', 'Legumes (lentils, chickpeas)', 'Citrus fruits', 'Fortified cereals'],
        color: 'bg-green-50 border-green-200'
      },
      {
        title: 'Iron-Rich Foods',
        description: 'Iron prevents anemia and supports oxygen delivery to your baby.',
        benefits: ['Prevents anemia', 'Supports oxygen delivery', 'Reduces fatigue'],
        examples: ['Lean meats', 'Beans and lentils', 'Tofu', 'Spinach and other dark leafy greens'],
        color: 'bg-red-50 border-red-200'
      },
      {
        title: 'Calcium Sources',
        description: 'Calcium supports bone development for your growing baby.',
        benefits: ['Builds baby\'s bones and teeth', 'Maintains maternal bone density', 'Supports heart and muscle function'],
        examples: ['Dairy products', 'Fortified plant milks', 'Tofu made with calcium sulfate', 'Leafy greens like kale'],
        color: 'bg-blue-50 border-blue-200'
      },
      {
        title: 'Omega-3 Fatty Acids',
        description: 'Essential for brain and eye development in your baby.',
        benefits: ['Supports brain development', 'Promotes eye health', 'May reduce risk of preterm birth'],
        examples: ['Fatty fish (salmon, sardines)', 'Chia and flax seeds', 'Walnuts', 'Algae oil supplements'],
        color: 'bg-yellow-50 border-yellow-200'
      }
    ];

    if (riskResults) {
      const specialized: NutritionItem[] = [];
      
      if (riskResults.riskLevel === 'high') {
        specialized.push({
          title: 'Blood Pressure Support',
          description: 'These foods may help manage blood pressure during pregnancy.',
          benefits: ['Rich in potassium', 'Low in sodium', 'Supports healthy blood vessels'],
          examples: ['Bananas', 'Sweet potatoes', 'Avocados', 'Leafy greens', 'Beets'],
          color: 'bg-purple-50 border-purple-200'
        });
        
        specialized.push({
          title: 'Anti-Inflammatory Foods',
          description: 'Foods that may help reduce inflammation and support overall health.',
          benefits: ['May reduce swelling', 'Supports immune function', 'Rich in antioxidants'],
          examples: ['Berries', 'Fatty fish', 'Olive oil', 'Nuts', 'Tomatoes'],
          color: 'bg-pink-50 border-pink-200'
        });
      }

      if (riskResults.answers.medical_history?.includes('diabetes')) {
        specialized.push({
          title: 'Blood Sugar Management',
          description: 'Foods that help manage blood sugar levels during pregnancy.',
          benefits: ['Promotes stable blood sugar', 'Provides sustained energy', 'Reduces sugar cravings'],
          examples: ['Whole grains', 'Lean proteins', 'Nuts and seeds', 'Non-starchy vegetables', 'Berries'],
          color: 'bg-orange-50 border-orange-200'
        });
      }
      
      if (riskResults.answers.symptoms?.includes('swelling')) {
        specialized.push({
          title: 'Edema Reduction',
          description: 'Foods that may help reduce swelling during pregnancy.',
          benefits: ['Natural diuretic properties', 'Supports kidney function', 'May reduce fluid retention'],
          examples: ['Cucumbers', 'Watermelon', 'Celery', 'Lemons', 'Asparagus'],
          color: 'bg-cyan-50 border-cyan-200'
        });
      }

      return [...specialized, ...baseNutrition];
    }

    return baseNutrition;
  };
  
  const nutritionRecommendations = getNutritionRecommendations();

  const toggleCategory = (title: string) => {
    if (activeCategory === title) {
      setActiveCategory(null);
    } else {
      setActiveCategory(title);
    }
  };

  return (
    <Layout>
      <section className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Maternal Nutrition Guide</h1>
            <p className="text-xl text-gray-600 mb-12 text-center">
              Proper nutrition is essential for a healthy pregnancy and baby's development.
            </p>
            
            {showRecommendations && riskResults && (
              <Alert className="mb-8 bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-5 w-5 text-blue-500" />
                <AlertTitle className="text-blue-800">Personalized Recommendations</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Based on your risk assessment results ({riskResults.riskLevel} risk), we've customized nutrition recommendations for you.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 text-center">
              {showRecommendations ? 'Your Personalized Nutrition Plan' : 'Key Nutrition Guidelines for Maternal Health'}
            </h2>

            <div className="grid grid-cols-1 gap-6 mb-12">
              {nutritionRecommendations.map((item, index) => (
                <Card 
                  key={index} 
                  className={`overflow-hidden border ${item.color}`}
                >
                  <CardHeader 
                    className={`cursor-pointer`}
                    onClick={() => toggleCategory(item.title)}
                  >
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <ArrowDown 
                        className={`h-5 w-5 transition-transform ${activeCategory === item.title ? 'rotate-180' : ''}`}
                      />
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  
                  {activeCategory === item.title && (
                    <CardContent className="pt-2">
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                        <ul className="space-y-1">
                          {item.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Recommended Sources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.examples.map((example, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-white rounded-full text-sm border border-gray-200 shadow-sm"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <h3 className="text-xl font-medium text-gray-900 mb-4">General Nutrition Guidelines</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Stay hydrated</span>
                    <p className="text-gray-600">Drink 8-10 glasses of water daily to support amniotic fluid, increased blood volume, and prevent dehydration.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Small, frequent meals</span>
                    <p className="text-gray-600">Eat 5-6 small meals throughout the day to maintain energy levels and reduce nausea.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Prenatal vitamins</span>
                    <p className="text-gray-600">Take a daily prenatal vitamin as recommended by your healthcare provider to supplement your diet.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Limit caffeine</span>
                    <p className="text-gray-600">Restrict caffeine intake to less than 200mg per day (about one 12oz cup of coffee).</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Need more guidance?</h3>
              <p className="text-gray-600 mb-6">
                Speak with a nutritionist who specializes in maternal health for personalized advice.
              </p>
              <Button 
                className="mx-auto"
                onClick={() => window.location.href = '/nutrition-consultation'}
              >
                Book Nutrition Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Nutrition;
