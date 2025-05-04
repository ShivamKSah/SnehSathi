import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, ExternalLink, Search, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import EligibilityChecker, { SchemeType } from '@/components/schemes/EligibilityChecker';
import { toast } from '@/hooks/use-toast';

// Mock data - in a real application this would come from an API
const governmentSchemes = [
  {
    id: 1,
    name: "Pradhan Mantri Matru Vandana Yojana",
    description: "Financial assistance of ₹5,000 in three installments for the first living child to compensate for wage loss during pregnancy and childbirth.",
    eligibility: "All pregnant and lactating mothers, excluding those who are in regular employment with the Central Government or State Government or PSU.",
    benefits: "Cash incentive of ₹5,000 in three installments",
    applicationProcess: "Apply through the local Anganwadi Center or through the PMMVY online portal with required documents.",
    requiredDocuments: ["Identity proof", "Address proof", "Bank account details", "MCP card"],
    url: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
    category: "Financial Assistance",
    state: "All India"
  },
  {
    id: 2,
    name: "Janani Suraksha Yojana",
    description: "Safe motherhood intervention promoting institutional delivery among poor pregnant women.",
    eligibility: "Below Poverty Line pregnant women who opt for delivery in government health centers.",
    benefits: "Cash assistance for delivery and post-delivery care. ₹1,400 in rural areas and ₹1,000 in urban areas.",
    applicationProcess: "Register at the nearest government health center during antenatal checkups.",
    requiredDocuments: ["BPL certificate", "Identity proof", "Age proof", "JSY registration card"],
    url: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
    category: "Healthcare",
    state: "All India"
  },
  {
    id: 3,
    name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
    description: "Health insurance scheme providing coverage up to ₹5 lakhs per family per year for secondary and tertiary care hospitalization.",
    eligibility: "Families identified based on deprivation and occupational criteria as per SECC database.",
    benefits: "Cashless and paperless access to services for beneficiaries at public and empaneled private hospitals.",
    applicationProcess: "Check eligibility on the official website or through Common Service Centers.",
    requiredDocuments: ["Aadhar Card", "Ration Card", "Any government issued ID"],
    url: "https://pmjay.gov.in/",
    category: "Health Insurance",
    state: "All India"
  },
  {
    id: 4,
    name: "Chiranjeevi Yojana",
    description: "Public-private partnership to encourage institutional deliveries to reduce maternal and infant mortality.",
    eligibility: "BPL women in rural areas of Gujarat.",
    benefits: "Free delivery and treatment for complications at private hospitals. Transport reimbursement of ₹200.",
    applicationProcess: "Register at the nearest government health center or empaneled private hospital.",
    requiredDocuments: ["BPL certificate", "Aadhar Card", "Proof of residence in Gujarat"],
    url: "https://gujhealth.gujarat.gov.in/",
    category: "Healthcare",
    state: "Gujarat"
  },
  {
    id: 5,
    name: "KCR Kit Scheme",
    description: "Provides basic necessities for mother and newborn to encourage institutional deliveries.",
    eligibility: "Women delivering in government hospitals in Telangana.",
    benefits: "KCR Kit with 16 essential items for newborns. Financial assistance of ₹12,000 for a boy child and ₹13,000 for a girl child.",
    applicationProcess: "Register at government hospitals during antenatal checkups.",
    requiredDocuments: ["Aadhar Card", "Residence proof of Telangana"],
    url: "https://www.telangana.gov.in/",
    category: "Mother and Child Welfare",
    state: "Telangana"
  }
];

const Schemes: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState(governmentSchemes);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);

    // Only apply regular filters if not showing assessment results
    if (!assessmentCompleted) {
      setIsLoading(true);
      
      // Filter schemes based on search term and selected state
      const filtered = governmentSchemes.filter(scheme => {
        const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             scheme.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesState = selectedState === null || scheme.state === selectedState || scheme.state === "All India";
        
        return matchesSearch && matchesState;
      });
      
      setTimeout(() => {
        setFilteredSchemes(filtered);
        setIsLoading(false);
      }, 300); // Small timeout for UX
    }
  }, [searchTerm, selectedState, assessmentCompleted]);

  const handleSchemesFiltered = (schemes: SchemeType[]) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setFilteredSchemes(schemes);
      setAssessmentCompleted(true);
      setIsLoading(false);
      
      // Scroll to results
      const resultsElement = document.getElementById('schemes-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // If no schemes found, show a helpful message
      if (schemes.length === 0) {
        toast({
          title: "No matching schemes found",
          description: "Try adjusting your eligibility criteria or consult a local health worker for assistance.",
          duration: 5000,
        });
      }
    }, 500);
  };

  // Reset filters and assessment
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedState(null);
    setFilteredSchemes(governmentSchemes);
    setAssessmentCompleted(false);
  };

  const states = ["All India", "Gujarat", "Telangana", "Maharashtra", "Tamil Nadu", "Karnataka"];

  return (
    <Layout>
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-50/50 via-white/80 to-purple-50/50 opacity-70"></div>
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              <FileText size={14} className="mr-1" />
              <span>Government Support Programs</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Healthcare Schemes
            </h1>
            <p className="text-xl text-gray-600">
              Find and apply for government healthcare schemes you're eligible for based on your profile.
            </p>
          </div>
          
          {/* Search and filter section */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium mb-4">Find Applicable Schemes</h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search by scheme name or keyword..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setAssessmentCompleted(false);
                    }}
                    disabled={assessmentCompleted || isLoading}
                  />
                </div>
                
                <div className="w-full md:w-auto">
                  <select 
                    className="w-full md:w-auto px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={selectedState || ''}
                    onChange={(e) => {
                      setSelectedState(e.target.value === '' ? null : e.target.value);
                      setAssessmentCompleted(false);
                    }}
                    disabled={assessmentCompleted || isLoading}
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge 
                  variant={selectedState === null && !assessmentCompleted ? "default" : "outline"} 
                  className={`cursor-pointer ${assessmentCompleted || isLoading ? 'opacity-50' : ''}`}
                  onClick={() => {
                    if (!assessmentCompleted && !isLoading) {
                      setSelectedState(null);
                    }
                  }}
                >
                  All Categories
                </Badge>
                {["Financial Assistance", "Healthcare", "Health Insurance", "Mother and Child Welfare"].map(category => (
                  <Badge 
                    key={category}
                    variant={searchTerm.includes(category) && !assessmentCompleted ? "default" : "outline"} 
                    className={`cursor-pointer ${assessmentCompleted || isLoading ? 'opacity-50' : ''}`}
                    onClick={() => {
                      if (!assessmentCompleted && !isLoading) {
                        setSearchTerm(category);
                      }
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Eligibility checker prompt */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-primary mb-2">Personalized Eligibility Check</h3>
                <p className="text-gray-600">
                  Answer a few questions to find schemes you're eligible for based on your specific situation.
                </p>
              </div>
              <EligibilityChecker 
                schemes={governmentSchemes} 
                onSchemesFiltered={handleSchemesFiltered}
              />
            </div>
          </div>
          
          {/* Schemes list */}
          <div id="schemes-results" className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">
                {assessmentCompleted 
                  ? `Recommended Schemes for You (${filteredSchemes.length})` 
                  : `Available Schemes ${selectedState ? `in ${selectedState}` : ''}`
                }
              </h2>
              
              {assessmentCompleted && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetFilters}
                >
                  Reset All Filters
                </Button>
              )}
            </div>
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600">Finding matching schemes...</p>
              </div>
            )}
            
            {!isLoading && assessmentCompleted && filteredSchemes.length > 0 && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex">
                <CheckCircle2 size={20} className="text-green-500 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 mb-1 font-medium">Personalized recommendations</p>
                  <p className="text-green-700 text-sm">
                    Based on your profile, we've identified these schemes that you may be eligible for. 
                    Please review the specific eligibility criteria for each scheme before applying.
                  </p>
                </div>
              </div>
            )}
            
            {!isLoading && filteredSchemes.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                <AlertTriangle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">No Matching Schemes Found</h3>
                <p className="text-gray-600 mb-4">
                  {assessmentCompleted 
                    ? "Based on your profile, we couldn't find any matching schemes. Consider consulting with a local health worker for additional options."
                    : "Try adjusting your search criteria or state filter."}
                </p>
                <Button 
                  variant="outline"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              !isLoading && (
                <div className="grid grid-cols-1 gap-6">
                  {filteredSchemes.map((scheme) => (
                    <Card key={scheme.id} className={`animate-fade-in ${assessmentCompleted ? 'border-primary/30 shadow-md' : ''}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{scheme.name}</CardTitle>
                            <CardDescription className="mt-1">{scheme.description}</CardDescription>
                          </div>
                          <Badge>{scheme.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Eligibility</h4>
                            <p className="text-sm">{scheme.eligibility}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Benefits</h4>
                            <p className="text-sm">{scheme.benefits}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Application Process</h4>
                            <p className="text-sm">{scheme.applicationProcess}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t">
                        <div className="text-sm">
                          <span className="text-gray-500">Available in: </span>
                          <span className="font-medium">{scheme.state}</span>
                        </div>
                        <Button 
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() => {
                            // Ensure proper redirection with window.open
                            window.open(scheme.url, '_blank', 'noopener,noreferrer');
                            
                            // Track application click in analytics (if implemented)
                            console.log(`Scheme application initiated: ${scheme.name}`);
                          }}
                        >
                          Apply Now
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Schemes;
