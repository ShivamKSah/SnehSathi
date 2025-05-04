
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqItems: FAQItem[] = [
    // General Questions
    {
      question: "What is SnehSathi?",
      answer: "SnehSathi is a maternal health platform that combines AI technology with healthcare expertise to provide personalized care for expectant mothers and new parents. We offer risk assessment, nutrition guidance, access to healthcare schemes, and community support.",
      category: "general"
    },
    {
      question: "Is SnehSathi free to use?",
      answer: "Yes, SnehSathi's core features are available for free to all users. Some premium features may require a subscription, but our essential maternal health tools are accessible to everyone.",
      category: "general"
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Login' button in the top right corner of the screen and selecting 'Sign Up'. You'll need to provide your email, create a password, and fill in basic profile information to get started.",
      category: "general"
    },
    
    // Health Assessment
    {
      question: "How accurate is the health risk assessment?",
      answer: "Our AI-powered risk assessment tool has a 93% accuracy rate in identifying potential health issues. However, it's important to remember that this is a screening tool, not a diagnostic tool. Always consult with healthcare professionals for proper diagnosis.",
      category: "health"
    },
    {
      question: "How often should I take the risk assessment?",
      answer: "We recommend taking the risk assessment once every trimester during pregnancy, or when you experience significant changes in your health condition. For new mothers, an assessment every 3-6 months is advised.",
      category: "health"
    },
    {
      question: "Is my health data secure?",
      answer: "Yes, we take data privacy very seriously. All your health information is encrypted and stored securely. We comply with healthcare data protection regulations and never share your personal health information without your explicit consent.",
      category: "health"
    },
    
    // Nutrition
    {
      question: "How are the nutrition recommendations personalized?",
      answer: "Our nutrition recommendations take into account your age, weight, height, pregnancy stage, dietary preferences, allergies, and any health conditions. The AI also considers local food availability and cultural preferences when making suggestions.",
      category: "nutrition"
    },
    {
      question: "Can I track my nutrient intake?",
      answer: "Yes, SnehSathi allows you to log your meals and track your nutrient intake. The platform will analyze your consumption and provide feedback on whether you're meeting your nutritional requirements.",
      category: "nutrition"
    },
    {
      question: "Do you accommodate special diets?",
      answer: "Yes, our nutrition guidance supports various dietary preferences and restrictions, including vegetarian, vegan, gluten-free, and many others. You can specify your dietary needs in your profile settings.",
      category: "nutrition"
    },
    
    // Healthcare Schemes
    {
      question: "How do I know which government schemes I'm eligible for?",
      answer: "Our eligibility checker analyzes your profile information and location to automatically identify government healthcare schemes you may qualify for. Just complete your profile and visit the 'Healthcare Schemes' section.",
      category: "schemes"
    },
    {
      question: "Does SnehSathi help with the application process?",
      answer: "Yes, we provide guided assistance for applying to government schemes, including document checklists, application form guidance, and instructions for submission. However, the actual application must be submitted through official government channels.",
      category: "schemes"
    },
    {
      question: "Are the scheme details up to date?",
      answer: "We strive to keep all scheme information current, but government programs can change. Always verify the latest details on the official government website, which we link to from our platform.",
      category: "schemes"
    },
    
    // Community
    {
      question: "How can I join a community group?",
      answer: "You can browse available groups in the Community section and click 'Join Group' on any group that interests you. Some groups may be open to all, while others might require approval from moderators.",
      category: "community"
    },
    {
      question: "Can I create my own group?",
      answer: "Yes, you can create your own community group by clicking the 'Create Group' button in the Community section. You'll need to provide a name, description, and set group privacy settings.",
      category: "community"
    },
    {
      question: "How are discussions moderated?",
      answer: "Community discussions are moderated by our team and volunteer moderators to ensure a supportive, respectful environment. We have community guidelines that all members must follow, and inappropriate content can be reported and will be reviewed.",
      category: "community"
    },
    
    // Technical Support
    {
      question: "What devices can I use SnehSathi on?",
      answer: "SnehSathi is available as a web application that works on most modern browsers, including Chrome, Firefox, Safari, and Edge. We also offer a mobile app for Android and iOS devices, which can be downloaded from the respective app stores.",
      category: "technical"
    },
    {
      question: "Does SnehSathi work offline?",
      answer: "Yes, many features of SnehSathi work offline. You can access previously loaded content and even log data while offline. Once you're back online, the app will automatically sync your data with our servers.",
      category: "technical"
    },
    {
      question: "How do I update my profile information?",
      answer: "You can update your profile by clicking on your avatar in the top right corner and selecting 'Profile'. From there, you can edit your personal information, update your health details, and manage your account settings.",
      category: "technical"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'health', name: 'Health Assessment' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'schemes', name: 'Healthcare Schemes' },
    { id: 'community', name: 'Community' },
    { id: 'technical', name: 'Technical Support' },
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="pt-24 pb-16">
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

          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 mb-8">
              Find answers to common questions about SnehSathi and its features. 
              If you can't find what you're looking for, please contact our support team.
            </p>
            
            <div className="mb-8">
              <Label htmlFor="search" className="sr-only">Search FAQs</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  id="search"
                  placeholder="Search questions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => (
                <Button 
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {filteredFAQs.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">No Results Found</h3>
                <p className="text-gray-600">
                  We couldn't find any FAQs matching your search. Please try different keywords or 
                  <Button 
                    variant="link" 
                    className="px-1 text-primary"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                  >
                    reset filters
                  </Button>
                </p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-base">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}

            <Separator className="my-10" />

            <div className="text-center">
              <h3 className="text-xl font-medium mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">Our support team is ready to help you with any other questions you may have.</p>
              <Button onClick={() => navigate('/support')}>Contact Support</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
