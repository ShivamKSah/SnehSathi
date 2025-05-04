
import React, { useEffect, useState, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  SendHorizontal, 
  Calendar, 
  Clock, 
  Download, 
  FileText, 
  Bot, 
  Mic,
  MicOff,
  Loader,
  Globe 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppSettings } from '@/contexts/AppSettingsContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  attachments?: {
    type: 'appointment' | 'nutritionPlan' | 'scheme';
    title: string;
    details: string;
    actionUrl?: string;
    date?: string;
    time?: string;
  }[];
}

// Offline FAQ responses
const offlineFAQs: Record<string, string> = {
  'diet': 'During pregnancy, focus on a balanced diet with fruits, vegetables, lean proteins, and whole grains. Iron-rich foods like spinach and lentils are particularly important.',
  'symptoms': 'Common pregnancy symptoms include morning sickness, fatigue, back pain, and swelling. Contact your healthcare provider if you experience severe headaches, vision changes, or vaginal bleeding.',
  'medicine': 'Always consult your doctor before taking any medication during pregnancy. Some medicines are safe, but others may harm your baby.',
  'exercise': 'Moderate exercise like walking and prenatal yoga is beneficial during pregnancy. Avoid high-impact activities and listen to your body.',
  'scheme': 'Janani Suraksha Yojana (JSY) is a safe motherhood intervention providing financial assistance for institutional delivery. Contact your local ASHA worker for more information.',
  'vaccine': 'Recommended vaccines during pregnancy include Tdap and flu vaccines. They protect both mother and baby from serious diseases.',
};

// Language options
const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'हिंदी (Hindi)' },
  { value: 'tamil', label: 'தமிழ் (Tamil)' },
  { value: 'telugu', label: 'తెలుగు (Telugu)' },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your maternal healthcare assistant powered by Gemini AI. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatLanguage, setChatLanguage] = useState<string>('english');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { darkMode } = useAppSettings();

  // Media recorder setup
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        processAudioInput(audioBlob);
        
        // Stop all audio tracks
        stream.getAudioTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone"
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice input",
        variant: "destructive"
      });
    }
  };
  
  const processAudioInput = async (audioBlob: Blob) => {
    // In a real implementation, this would send the audio to a speech-to-text service
    // For now, we'll simulate with a placeholder message
    toast({
      title: "Processing audio...",
      description: "Converting your speech to text"
    });
    
    // Simulate speech-to-text processing delay
    setTimeout(() => {
      // Example text from speech - in a real app, this would come from an API
      const sampleTexts = [
        "What foods should I eat during pregnancy?",
        "Tell me about safe exercises during pregnancy",
        "What is Janani Suraksha Yojana scheme?",
        "What vaccines are recommended during pregnancy?"
      ];
      
      const transcribedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      setInputMessage(transcribedText);
      
      toast({
        title: "Audio processed",
        description: `Detected: "${transcribedText}"`
      });
    }, 1500);
  };

  const findOfflineResponse = (query: string) => {
    query = query.toLowerCase();
    
    if (query.includes('eat') || query.includes('food') || query.includes('nutrition') || query.includes('diet')) {
      return offlineFAQs['diet'];
    } else if (query.includes('pain') || query.includes('sick') || query.includes('symptom') || query.includes('feel')) {
      return offlineFAQs['symptoms'];
    } else if (query.includes('medicine') || query.includes('drug') || query.includes('medication')) {
      return offlineFAQs['medicine'];
    } else if (query.includes('exercise') || query.includes('walk') || query.includes('yoga')) {
      return offlineFAQs['exercise'];
    } else if (query.includes('scheme') || query.includes('janani') || query.includes('yojana') || query.includes('government')) {
      return offlineFAQs['scheme'];
    } else if (query.includes('vaccine') || query.includes('vaccination') || query.includes('immunization')) {
      return offlineFAQs['vaccine'];
    }
    
    return "I'm currently offline. Please check your internet connection or try again later.";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      if (!isOnline) {
        // Offline mode - use static responses
        setTimeout(() => {
          const offlineResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: findOfflineResponse(userMessage.text),
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, offlineResponse]);
          setIsTyping(false);
        }, 1000);
        return;
      }
      
      // In a real implementation, we would call our backend API here
      // For now, simulate API call with setTimeout
      setTimeout(() => {
        let botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: '',
          sender: 'bot',
          timestamp: new Date(),
        };
        
        const userInput = userMessage.text.toLowerCase();
        const languagePrefix = chatLanguage !== 'english' ? `Answer this in ${chatLanguage}: ` : '';
        
        // Simulate Gemini API response based on user input
        if (userInput.includes('eat') || userInput.includes('food') || userInput.includes('diet')) {
          if (chatLanguage === 'hindi') {
            botResponse.text = 'गर्भावस्था के दौरान आयरन युक्त खाद्य पदार्थ जैसे पालक, दालें और फल खाने पर ध्यान दें। साथ ही पर्याप्त पानी पिएं और पर्याप्त प्रोटीन लें।';
          } else if (chatLanguage === 'tamil') {
            botResponse.text = 'கர்ப்பகாலத்தில், ஸ்பினாச், பருப்பு மற்றும் பழங்கள் போன்ற இரும்புச்சத்து நிறைந்த உணவுகளை உட்கொள்ளுங்கள். அதிக தண்ணீர் குடிக்கவும் மற்றும் போதுமான புரதம் எடுத்துக்கொள்ளவும்.';
          } else if (chatLanguage === 'telugu') {
            botResponse.text = 'గర్భధారణ సమయంలో పాలకూర, పప్పులు మరియు పండ్లు వంటి ఐరన్ సమృద్ధిగా ఉన్న ఆహారాలపై దృష్టి పెట్టండి. అలాగే సమృద్ధిగా నీరు తాగండి మరియు తగినంత ప్రొటీన్ తీసుకోండి.';
          } else {
            botResponse.text = 'During pregnancy, focus on iron-rich foods like spinach, lentils, and seasonal fruits. Aim for at least 5-6 small meals throughout the day with plenty of protein, calcium, and folic acid. Stay well hydrated with 2-3 liters of water daily. Limit caffeine and avoid raw or undercooked foods.';
          }
        } else if (userInput.includes('medicine') || userInput.includes('paracetamol') || userInput.includes('drug')) {
          if (chatLanguage === 'hindi') {
            botResponse.text = 'पैरासिटामोल आमतौर पर गर्भावस्था के दौरान सुरक्षित माना जाता है, लेकिन कोई भी दवा लेने से पहले हमेशा अपने डॉक्टर से परामर्श करें।';
          } else if (chatLanguage === 'tamil') {
            botResponse.text = 'பாராசிட்டமால் பொதுவாக கர்ப்பகாலத்தில் பாதுகாப்பானதாக கருதப்படுகிறது, ஆனால் எந்தவொரு மருந்தையும் எடுப்பதற்கு முன் எப்போதும் உங்கள் மருத்துவரை அணுகவும்.';
          } else if (chatLanguage === 'telugu') {
            botResponse.text = 'గర్భధారణ సమయంలో పారాసిటమాల్ సాధారణంగా సురక్షితమైనదిగా పరిగణించబడుతుంది, అయితే ఏదైనా మందు తీసుకునే ముందు తప్పనిసరిగా మీ వైద్యుడిని సంప్రదించండి.';
          } else {
            botResponse.text = 'Paracetamol (acetaminophen) is generally considered safe during pregnancy when used as directed for short periods. However, you should always consult your healthcare provider before taking any medication. Some medications can cross the placenta and affect your baby\'s development. Never self-medicate during pregnancy.';
          }
        } else if (userInput.includes('janani') || userInput.includes('scheme') || userInput.includes('yojana')) {
          if (chatLanguage === 'hindi') {
            botResponse.text = 'जननी सुरक्षा योजना भारत सरकार की एक योजना है जो गर्भवती महिलाओं को संस्थागत प्रसव के लिए वित्तीय सहायता प्रदान करती है। इसका उद्देश्य मातृ और नवजात शिशु मृत्यु दर को कम करना है। अधिक जानकारी के लिए अपने स्थानीय आशा कार्यकर्ता से संपर्क करें।';
          } else if (chatLanguage === 'tamil') {
            botResponse.text = 'ஜனனி சுரக்ஷா யோஜனா என்பது நிறுவன பிரசவத்திற்காக கர்ப்பிணிப் பெண்களுக்கு நிதி உதவி வழங்கும் இந்திய அரசாங்கத் திட்டமாகும். இதன் நோக்கம் தாய் மற்றும் பச்சிளம் குழந்தை இறப்பு விகிதத்தைக் குறைப்பதாகும். மேலும் தகவலுக்கு உங்கள் உள்ளூர் ஆஷா பணியாளரைத் தொடர்பு கொள்ளவும்.';
          } else if (chatLanguage === 'telugu') {
            botResponse.text = 'జననీ సురక్ష యోజన అనేది సంస్థాగత ప్రసవం కోసం గర్భిణీ స్త్రీలకు ఆర్థిక సహాయాన్ని అందించే భారత ప్రభుత్వ పథకం. దీని లక్ష్యం మాతృ మరియు నవజాత శిశు మరణాల రేటును తగ్గించడం. మరింత సమాచారం కోసం మీ స్థానిక ఆశా కార్యకర్తతో సంప్రదించండి.';
          } else {
            botResponse.text = 'Janani Suraksha Yojana (JSY) is a Government of India scheme that provides financial assistance for institutional delivery to pregnant women. Eligible women receive ₹600 in urban areas and ₹700 in rural areas. ASHA workers can help you register for this scheme and guide you through the process. This scheme aims to reduce maternal and infant mortality by promoting institutional delivery.';
          }
        } else {
          // Default response based on language
          if (chatLanguage === 'hindi') {
            botResponse.text = 'मुझे क्षमा करें, मैं आपका प्रश्न समझ नहीं पाया। कृपया अपना प्रश्न दूसरे तरीके से पूछें या अपने स्थानीय आशा कार्यकर्ता से संपर्क करें।';
          } else if (chatLanguage === 'tamil') {
            botResponse.text = 'மன்னிக்கவும், உங்கள் கேள்வியை நான் புரிந்து கொள்ளவில்லை. தயவுசெய்து உங்கள் கேள்வியை வேறு வழியில் கேளுங்கள் அல்லது உங்கள் உள்ளூர் ஆஷா பணியாளரைத் தொடர்பு கொள்ளுங்கள்.';
          } else if (chatLanguage === 'telugu') {
            botResponse.text = 'క్షమించండి, నేను మీ ప్రశ్నను అర్థం చేసుకోలేకపోయాను. దయచేసి మీ ప్రశ్నను మరొక విధంగా అడగండి లేదా మీ స్థానిక ఆశా కార్యకర్తని సంప్రదించండి.';
          } else {
            botResponse.text = 'I\'m here to help with maternal health questions. Could you please clarify what specific information you\'re looking for about pregnancy, childbirth, or infant care? I can provide information on nutrition, common symptoms, safe exercises, or government schemes for mothers.';
          }
        }

        // Add attachments based on query context
        if (userInput.includes('appointment') || userInput.includes('doctor')) {
          botResponse.attachments = [
            {
              type: 'appointment',
              title: 'Schedule a Checkup',
              details: 'Book an appointment with a healthcare provider',
              date: 'Choose a date',
              time: 'Choose a time',
            }
          ];
        } else if (userInput.includes('diet') || userInput.includes('nutrition') || userInput.includes('food')) {
          botResponse.attachments = [
            {
              type: 'nutritionPlan',
              title: 'Pregnancy Nutrition Guide',
              details: 'Customized nutrition plan for expectant mothers',
              actionUrl: '#',
            }
          ];
        } else if (userInput.includes('scheme') || userInput.includes('benefit')) {
          botResponse.attachments = [
            {
              type: 'scheme',
              title: 'Janani Suraksha Yojana',
              details: 'Financial assistance for institutional delivery',
              actionUrl: '#',
            }
          ];
        }
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      
      setIsTyping(false);
    }
  };

  const renderAttachment = (attachment: Message['attachments'][0]) => {
    switch (attachment.type) {
      case 'appointment':
        return (
          <div className="bg-blue-50 rounded-lg p-3 mt-2 border border-blue-100">
            <div className="flex items-start">
              <Calendar className="text-blue-500 mr-2 mt-1 shrink-0" size={18} />
              <div>
                <h4 className="font-medium text-blue-700">{attachment.title}</h4>
                <p className="text-sm text-blue-600">{attachment.details}</p>
                <div className="flex items-center mt-2 text-sm text-blue-500">
                  <Calendar size={14} className="mr-1" />
                  <span className="mr-3">{attachment.date}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{attachment.time}</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'nutritionPlan':
        return (
          <div className="bg-green-50 rounded-lg p-3 mt-2 border border-green-100">
            <div className="flex items-start">
              <Download className="text-green-500 mr-2 mt-1 shrink-0" size={18} />
              <div>
                <h4 className="font-medium text-green-700">{attachment.title}</h4>
                <p className="text-sm text-green-600">{attachment.details}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-green-600 border-green-200 hover:bg-green-100"
                  onClick={() => {
                    toast({
                      title: "Downloading Nutrition Plan",
                      description: "Your nutrition plan is being prepared for download."
                    });
                  }}
                >
                  <Download size={14} className="mr-1" />
                  Download Plan
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 'scheme':
        return (
          <div className="bg-purple-50 rounded-lg p-3 mt-2 border border-purple-100">
            <div className="flex items-start">
              <FileText className="text-purple-500 mr-2 mt-1 shrink-0" size={18} />
              <div>
                <h4 className="font-medium text-purple-700">{attachment.title}</h4>
                <p className="text-sm text-purple-600">{attachment.details}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-purple-600 border-purple-200 hover:bg-purple-100"
                  onClick={() => window.open(attachment.actionUrl, '_blank')}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <section className="pt-24 pb-16 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col">
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl font-medium text-gray-900 mb-2 dark:text-gray-100">SnehSathi AI Healthcare Assistant</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Chat with our AI assistant powered by Gemini Pro to get answers to your maternal healthcare questions in your preferred language.
              </p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Select value={chatLanguage} onValueChange={setChatLanguage}>
                    <SelectTrigger className="w-[150px] h-8">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${isOnline ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
            
            <Card className="flex-1 flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        {message.sender === 'bot' && (
                          <Avatar className="mr-2 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <Bot size={16} />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div>
                          <div 
                            className={`rounded-lg px-4 py-2 ${
                              message.sender === 'user' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                            }`}
                          >
                            <p>{message.text}</p>
                          </div>
                          
                          {message.attachments?.map((attachment, index) => (
                            <div key={index}>
                              {renderAttachment(attachment)}
                            </div>
                          ))}
                          
                          <div className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start max-w-[80%]">
                        <Avatar className="mr-2 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            <Bot size={16} />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="rounded-lg px-4 py-2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1"
                  />
                  
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="outline"
                    disabled={isTyping}
                    onClick={toggleRecording}
                    className={isRecording ? "bg-red-100 border-red-300 text-red-500 hover:bg-red-200 dark:bg-red-900 dark:border-red-800 dark:text-red-300" : ""}
                  >
                    {isRecording ? (
                      <MicOff size={18} />
                    ) : (
                      <Mic size={18} />
                    )}
                  </Button>
                  
                  <Button type="submit" size="icon" disabled={!inputMessage.trim() || isTyping}>
                    <SendHorizontal size={18} />
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>
                Try asking about nutrition during pregnancy, safe medications, symptoms to watch for, or government schemes like Janani Suraksha Yojana.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Chat;
