
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, X, HelpCircle, ArrowRight, Award, Share2, Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SchemeType {
  id: number;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  applicationProcess: string;
  requiredDocuments: string[];
  url: string;
  category: string;
  state: string;
}

// Define the form schema with validation rules
const eligibilityFormSchema = z.object({
  state: z.string().min(1, { message: "Please select your state" }),
  income: z.string().min(1, { message: "Income is required" }),
  isPregnant: z.boolean().default(false),
  hasChildren: z.boolean().default(false),
  age: z.string().optional(),
  category: z.string().optional(),
  familySize: z.string().optional(),
  occupation: z.string().optional(),
  maritalStatus: z.string().optional(),
  education: z.string().optional(),
  consentToShare: z.boolean().default(false)
});

type EligibilityFormValues = z.infer<typeof eligibilityFormSchema>;

interface EligibilityCheckerProps {
  schemes: SchemeType[];
  onSchemesFiltered: (filteredSchemes: SchemeType[]) => void;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({ schemes, onSchemesFiltered }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [matchScore, setMatchScore] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const totalSteps = 4;

  // Load saved form data from localStorage if available
  const loadSavedData = () => {
    try {
      const savedData = localStorage.getItem('userEligibilityData');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
    return {};
  };

  const form = useForm<EligibilityFormValues>({
    resolver: zodResolver(eligibilityFormSchema),
    defaultValues: {
      state: loadSavedData()?.state || "",
      income: "",
      isPregnant: loadSavedData()?.isPregnant || false,
      hasChildren: loadSavedData()?.hasChildren || false,
      age: "",
      category: loadSavedData()?.category || "",
      familySize: "1",
      occupation: "",
      maritalStatus: "",
      education: "",
      consentToShare: false
    }
  });

  // Update progress bar when step changes
  useEffect(() => {
    setProgress((step / totalSteps) * 100);
  }, [step]);

  const nextStep = () => {
    // Validate current step fields before proceeding
    switch (step) {
      case 1:
        form.trigger(["state", "category"]).then(isValid => {
          if (isValid) setStep(step + 1);
        });
        break;
      case 2:
        form.trigger(["income", "familySize"]).then(isValid => {
          if (isValid) setStep(step + 1);
        });
        break;
      case 3:
        // Step 3 has no required fields, so always proceed
        setStep(step + 1);
        break;
      default:
        if (step < totalSteps) {
          setStep(step + 1);
        }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateEligibilityScore = (scheme: SchemeType, data: EligibilityFormValues): number => {
    let score = 0;
    const maxScore = 100;
    
    // State matching (high importance)
    if (scheme.state === data.state || scheme.state === "All India") {
      score += 30;
    } else {
      // If state doesn't match, the scheme is completely irrelevant
      return 0; 
    }
    
    // Category matching (high importance)
    if (data.category && scheme.category === data.category) {
      score += 25;
    }
    
    // Check for pregnancy-related schemes
    if (data.isPregnant && 
        (scheme.eligibility.toLowerCase().includes("pregnant") || 
         scheme.description.toLowerCase().includes("pregnant") || 
         scheme.category === "Mother and Child Welfare")) {
      score += 20;
    }
    
    // Check for children-related schemes
    if (data.hasChildren && 
        (scheme.eligibility.toLowerCase().includes("child") || 
         scheme.description.toLowerCase().includes("child") || 
         scheme.category === "Mother and Child Welfare")) {
      score += 15;
    }
    
    // Income-based matching
    if (data.income) {
      const incomeValue = parseInt(data.income);
      if (incomeValue < 100000 && scheme.eligibility.toLowerCase().includes("bpl")) {
        score += 15;
      } else if (incomeValue < 300000 && 
                (scheme.eligibility.toLowerCase().includes("low income") || 
                 scheme.eligibility.toLowerCase().includes("economically"))) {
        score += 10;
      }
    }
    
    // Occupation matching
    if (data.occupation && 
        scheme.eligibility.toLowerCase().includes(data.occupation.toLowerCase())) {
      score += 5;
    }
    
    // Family size
    if (data.familySize && parseInt(data.familySize) > 3 && 
        scheme.eligibility.toLowerCase().includes("family")) {
      score += 5;
    }
    
    // Additional factors (marital status, education, etc.)
    if (data.maritalStatus && 
        scheme.eligibility.toLowerCase().includes(data.maritalStatus.toLowerCase())) {
      score += 5;
    }
    
    if (data.education && 
        scheme.eligibility.toLowerCase().includes(data.education.toLowerCase())) {
      score += 5;
    }
    
    return Math.min(score, maxScore);
  };

  const assessEligibility = (data: EligibilityFormValues) => {
    setIsSubmitting(true); // Set loading state
    
    // Simulate processing time (remove in production)
    setTimeout(() => {
      try {
        // Calculate match score for each scheme
        const scores: Record<number, number> = {};
        const eligibleSchemes = schemes.filter(scheme => {
          const score = calculateEligibilityScore(scheme, data);
          scores[scheme.id] = score;
          return score > 30; // Only include schemes with at least a 30% match
        });
        
        // Sort by match score
        eligibleSchemes.sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));
        
        setMatchScore(scores);
        setIsOpen(false);
        setEligibilityChecked(true);
        onSchemesFiltered(eligibleSchemes);

        // Save user preferences locally for future recommendations
        try {
          localStorage.setItem('userEligibilityData', JSON.stringify({
            state: data.state,
            hasChildren: data.hasChildren,
            isPregnant: data.isPregnant,
            category: data.category
          }));
        } catch (error) {
          console.error("Error saving preferences:", error);
        }

        // Show toast with results
        toast({
          title: "Eligibility Assessment Complete",
          description: `Found ${eligibleSchemes.length} schemes matching your criteria.`,
          duration: 5000,
        });
        
        // If user consented to share data for better recommendations
        if (data.consentToShare) {
          // This would connect to an analytics service in a real application
          console.log("User consented to share anonymized data for better recommendations");
          
          toast({
            title: "Thank you for sharing",
            description: "Your anonymized data will help us improve our recommendations.",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error in eligibility assessment:", error);
        toast({
          title: "Assessment Error",
          description: "An error occurred while processing your eligibility. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1000); // 1 second simulation delay
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Healthcare Scheme Matches',
        text: 'I found healthcare schemes I\'m eligible for using the Maternal Care AI platform.',
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support sharing. Try copying the URL manually.",
        duration: 3000,
      });
    }
  };

  const states = ["All India", "Gujarat", "Telangana", "Maharashtra", "Tamil Nadu", "Karnataka", "Delhi", "Uttar Pradesh", "Bihar", "West Bengal", "Rajasthan"];
  const categories = ["Financial Assistance", "Healthcare", "Health Insurance", "Mother and Child Welfare", "Education", "Housing", "Employment"];
  const occupations = ["Farmer", "Self-employed", "Government Employee", "Private Sector", "Unemployed", "Student", "Healthcare Worker"];
  const educationLevels = ["Primary", "Secondary", "Graduation", "Post-Graduation", "None"];
  const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
  
  return (
    <>
      <Button 
        className="w-full md:w-auto"
        onClick={() => {
          setStep(1);
          setIsOpen(true);
        }}
      >
        {eligibilityChecked ? "Reassess Eligibility" : "Check Eligibility"}
        <CheckCircle2 size={16} className="ml-2" />
      </Button>
      
      {eligibilityChecked && (
        <Button
          variant="outline"
          className="w-full md:w-auto mt-2 md:mt-0 md:ml-2"
          onClick={shareResults}
        >
          Share Results
          <Share2 size={16} className="ml-2" />
        </Button>
      )}
      
      <Dialog open={isOpen} onOpenChange={(open) => {
        // Prevent closing dialog if submission is in progress
        if (isSubmitting && !open) return;
        setIsOpen(open);
      }}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Personalized Eligibility Assessment</DialogTitle>
            <DialogDescription>
              Answer a few questions to find schemes that match your specific situation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Step {step} of {totalSteps}</span>
              <span>{progress}% Complete</span>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(assessEligibility)} className="space-y-4">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your State</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Some schemes are only available in specific states.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <FormField
                    control={form.control}
                    name="income"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Household Income (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter your annual income" {...field} />
                        </FormControl>
                        <FormDescription>
                          Many schemes have income eligibility criteria.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="familySize"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Family Size</FormLabel>
                          <span className="text-sm text-gray-500">{field.value} {parseInt(field.value) === 1 ? "person" : "people"}</span>
                        </div>
                        <FormControl>
                          <Slider
                            defaultValue={[parseInt(field.value)]}
                            max={10}
                            min={1}
                            step={1}
                            onValueChange={(value) => field.onChange(value[0].toString())}
                            className="py-4"
                          />
                        </FormControl>
                        <FormDescription>
                          Number of family members living together.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="isPregnant"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Currently Pregnant</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasChildren"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Have Young Children</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Marital Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            {maritalStatuses.map(status => (
                              <FormItem key={status} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={status} />
                                </FormControl>
                                <FormLabel className="font-normal">{status}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your occupation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {occupations.map(occupation => (
                              <SelectItem key={occupation} value={occupation}>{occupation}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {educationLevels.map(level => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consentToShare"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Share anonymized data to improve recommendations</FormLabel>
                          <FormDescription>
                            This helps us provide more accurate scheme suggestions for everyone.
                          </FormDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <HelpCircle size={14} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-[250px]">
                                We only collect anonymous statistical data to improve our algorithm. 
                                Your personal information is never shared with third parties.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
                {step > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                    className="sm:order-1 w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                )}
                
                {step < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={nextStep} 
                    className="w-full sm:w-auto sm:order-2"
                    disabled={isSubmitting}
                  >
                    Next <ArrowRight size={16} className="ml-2" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto sm:order-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Award size={16} className="mr-2" /> Find Matching Schemes
                      </>
                    )}
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="sm:order-0 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  <X size={16} className="mr-2" /> Cancel
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EligibilityChecker;
