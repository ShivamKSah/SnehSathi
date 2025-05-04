import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'slider' | 'text';
  options?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  info?: string;
  min?: number;
  max?: number;
  unit?: string;
}

const questions: Question[] = [
  {
    id: 'age',
    text: 'What is your age?',
    type: 'slider',
    min: 18,
    max: 50,
    unit: 'years',
    info: 'Maternal age is an important factor in pregnancy risk assessment.',
  },
  {
    id: 'pregnancy_stage',
    text: 'What trimester of pregnancy are you in currently?',
    type: 'single',
    options: [
      { value: 'first', label: 'First trimester (weeks 1-12)' },
      { value: 'second', label: 'Second trimester (weeks 13-26)' },
      { value: 'third', label: 'Third trimester (weeks 27-40)' },
      { value: 'not_pregnant', label: 'I am not currently pregnant' },
    ],
  },
  {
    id: 'previous_pregnancies',
    text: 'How many previous pregnancies have you had?',
    type: 'single',
    options: [
      { value: '0', label: 'None (This is my first)' },
      { value: '1', label: '1 previous pregnancy' },
      { value: '2', label: '2 previous pregnancies' },
      { value: '3_plus', label: '3 or more previous pregnancies' },
    ],
  },
  {
    id: 'symptoms',
    text: 'Are you experiencing any of the following symptoms? (Select all that apply)',
    type: 'multiple',
    options: [
      { value: 'headache', label: 'Severe or persistent headaches' },
      { value: 'vision', label: 'Blurred vision or seeing spots' },
      { value: 'swelling', label: 'Swelling in hands, feet, or face' },
      { value: 'abdominal_pain', label: 'Abdominal pain' },
      { value: 'bleeding', label: 'Vaginal bleeding' },
      { value: 'fever', label: 'Fever or chills' },
      { value: 'dizziness', label: 'Dizziness or fainting' },
      { value: 'none', label: 'None of the above' },
    ],
    info: 'These symptoms may indicate potential complications.',
  },
  {
    id: 'medical_history',
    text: 'Do you have any of the following medical conditions? (Select all that apply)',
    type: 'multiple',
    options: [
      { value: 'diabetes', label: 'Diabetes (Type 1, Type 2, or Gestational)' },
      { value: 'hypertension', label: 'Hypertension (High blood pressure)' },
      { value: 'thyroid', label: 'Thyroid disorders' },
      { value: 'heart_disease', label: 'Heart disease' },
      { value: 'asthma', label: 'Asthma' },
      { value: 'anemia', label: 'Anemia' },
      { value: 'none', label: 'None of the above' },
    ],
  },
];

const RiskAssessmentForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState<'low' | 'moderate' | 'high' | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    const currentQuestionId = currentQuestion.id;
    if (!answers[currentQuestionId] && currentQuestion.type !== 'multiple') {
      toast({
        title: "Please answer the question",
        description: "This information helps us provide an accurate assessment.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSingleSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleMultipleSelect = (value: string) => {
    const currentValues = answers[currentQuestion.id] || [];
    
    if (value === 'none') {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: ['none']
      }));
      return;
    }
    
    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v: string) => v !== value);
      
      if (newValues.length === 0) {
        newValues = ['none'];
      }
      
      if (currentValues.includes('none') && value !== 'none') {
        newValues = newValues.filter((v: string) => v !== 'none');
      }
    } else {
      newValues = [...currentValues.filter((v: string) => v !== 'none'), value];
    }
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: newValues
    }));
  };

  const handleSliderChange = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleTextChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    
    setTimeout(() => {
      const hasSymptoms = answers.symptoms && 
        answers.symptoms.length > 0 && 
        !answers.symptoms.includes('none');
      
      const hasMedicalConditions = answers.medical_history && 
        answers.medical_history.length > 0 && 
        !answers.medical_history.includes('none');
      
      const age = answers.age || 30;

      const isHighRiskAge = age < 20 || age > 35;
      
      if (
        (hasSymptoms && answers.symptoms.includes('bleeding')) || 
        (hasSymptoms && answers.symptoms.includes('vision') && hasMedicalConditions && answers.medical_history.includes('hypertension'))
      ) {
        setRiskLevel('high');
      } else if (
        hasSymptoms || 
        hasMedicalConditions || 
        isHighRiskAge
      ) {
        setRiskLevel('moderate');
      } else {
        setRiskLevel('low');
      }
      
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSubmitted(false);
    setRiskLevel(null);
  };

  const handleExploreRecommendations = () => {
    localStorage.setItem('riskAssessmentResults', JSON.stringify({
      riskLevel,
      answers,
      date: new Date().toISOString()
    }));
    
    navigate('/nutrition', { state: { fromRiskAssessment: true } });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="p-6 md:p-8">
        {!submitted ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-start mb-2">
                <h2 className="text-xl md:text-2xl font-medium text-gray-900">
                  {currentQuestion.text}
                </h2>
                {currentQuestion.info && (
                  <div className="ml-2 group relative">
                    <Info size={18} className="text-gray-400 cursor-help" />
                    <div className="absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-lg p-3 text-sm text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {currentQuestion.info}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-10">
              {currentQuestion.type === 'single' && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => (
                    <div 
                      key={option.value}
                      onClick={() => handleSingleSelect(option.value)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 ${
                        answers[currentQuestion.id] === option.value 
                          ? 'border-primary bg-primary/10 shadow-sm' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            answers[currentQuestion.id] === option.value 
                              ? 'border-primary' 
                              : 'border-gray-300'
                          }`}
                        >
                          {answers[currentQuestion.id] === option.value && (
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          {option.description && (
                            <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === 'multiple' && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => {
                    const isSelected = answers[currentQuestion.id]?.includes(option.value);
                    return (
                      <div 
                        key={option.value}
                        onClick={() => handleMultipleSelect(option.value)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 ${
                          isSelected 
                            ? 'border-primary bg-primary/10 shadow-sm' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div 
                            className={`w-5 h-5 rounded-sm border flex items-center justify-center mr-3 ${
                              isSelected 
                                ? 'border-primary bg-primary' 
                                : 'border-gray-300'
                            }`}
                          >
                            {isSelected && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{option.label}</div>
                            {option.description && (
                              <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {currentQuestion.type === 'slider' && (
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">
                      {currentQuestion.min} {currentQuestion.unit}
                    </span>
                    <span className="text-gray-500">
                      {currentQuestion.max} {currentQuestion.unit}
                    </span>
                  </div>
                  
                  <input 
                    type="range" 
                    min={currentQuestion.min} 
                    max={currentQuestion.max} 
                    value={answers[currentQuestion.id] || currentQuestion.min}
                    onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  
                  <div className="text-center mt-4 text-xl font-medium text-primary">
                    {answers[currentQuestion.id] || currentQuestion.min} {currentQuestion.unit}
                  </div>
                </div>
              )}
              
              {currentQuestion.type === 'text' && (
                <div>
                  <textarea
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleTextChange(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="ghost" 
                onClick={handlePrevious} 
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              <Button onClick={handleNext}>
                {currentQuestionIndex < questions.length - 1 ? (
                  <>
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </>
                ) : (
                  'Submit Assessment'
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-4 animate-fade-in">
            <div className="text-center mb-8">
              <div className={`
                w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6
                ${riskLevel === 'low' ? 'bg-green-100 text-green-500' : 
                  riskLevel === 'moderate' ? 'bg-amber-100 text-amber-500' : 
                  'bg-red-100 text-red-500'}
              `}>
                {riskLevel === 'low' ? (
                  <CheckCircle size={40} />
                ) : riskLevel === 'moderate' ? (
                  <AlertCircle size={40} />
                ) : (
                  <AlertCircle size={40} />
                )}
              </div>
              
              <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3">
                {riskLevel === 'low' ? 'Low Risk Assessment' : 
                  riskLevel === 'moderate' ? 'Moderate Risk Assessment' : 
                  'High Risk Assessment'}
              </h2>
              
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                {riskLevel === 'low' ? 
                  'Based on your responses, you appear to have a low risk of pregnancy complications. Continue with regular check-ups and a healthy lifestyle.' : 
                  riskLevel === 'moderate' ? 
                  'Based on your responses, you have some factors that may increase your risk. We recommend consulting with a healthcare provider soon.' : 
                  'Based on your responses, you have several high-risk factors. Please consult with a healthcare provider as soon as possible.'}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
                <h3 className="font-medium text-gray-900 mb-3">Key Findings:</h3>
                <ul className="space-y-2 text-left">
                  {answers.age && (
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Age: {answers.age} years</span>
                    </li>
                  )}
                  
                  {answers.pregnancy_stage && (
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>
                        Pregnancy stage: {
                          answers.pregnancy_stage === 'first' ? 'First trimester' :
                          answers.pregnancy_stage === 'second' ? 'Second trimester' :
                          answers.pregnancy_stage === 'third' ? 'Third trimester' :
                          'Not currently pregnant'
                        }
                      </span>
                    </li>
                  )}
                  
                  {answers.symptoms && answers.symptoms.length > 0 && !answers.symptoms.includes('none') && (
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Reported symptoms: {answers.symptoms.length}</span>
                    </li>
                  )}
                  
                  {answers.medical_history && answers.medical_history.length > 0 && !answers.medical_history.includes('none') && (
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Medical conditions: {answers.medical_history.length}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Recommendations:</h3>
              <div className="space-y-4">
                {riskLevel === 'high' && (
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex">
                      <AlertCircle size={20} className="text-red-500 mr-2 shrink-0" />
                      <p className="text-red-700">
                        <strong>Seek medical attention immediately.</strong> The symptoms you've reported may indicate a serious complication.
                      </p>
                    </div>
                  </div>
                )}
                
                {riskLevel === 'moderate' && (
                  <div className="p-4 border border-amber-200 rounded-lg bg-amber-50">
                    <div className="flex">
                      <AlertCircle size={20} className="text-amber-500 mr-2 shrink-0" />
                      <p className="text-amber-700">
                        <strong>Schedule an appointment with your healthcare provider within the next few days.</strong> Discuss the symptoms and risk factors identified in this assessment.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Next Steps:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary mr-2 mt-0.5" />
                      <span>Download your personalized health report</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary mr-2 mt-0.5" />
                      <span>Explore nutrition recommendations for your specific needs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary mr-2 mt-0.5" />
                      <span>Check eligibility for government healthcare schemes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary mr-2 mt-0.5" />
                      <span>Talk to our AI assistant for additional guidance</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={resetForm}>
                  Start New Assessment
                </Button>
                <Button className="group" onClick={handleExploreRecommendations}>
                  Explore Recommendations
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskAssessmentForm;
