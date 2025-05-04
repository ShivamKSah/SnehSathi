
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, AlertTriangle, FileEdit, Mic, Calendar, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock patient data type
interface PatientDetail {
  id: string;
  name: string;
  age: number;
  address: string;
  contact: string;
  gestationWeek: number;
  lastVisit: string;
  nextAppointment: string;
  riskLevel: 'low' | 'medium' | 'high' | 'unknown';
  visits: {
    date: string;
    notes: string;
    vitalSigns: {
      bloodPressure: string;
      weight: number;
    }
  }[];
}

const AshaPatientDetail: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in and has ASHA role
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/asha-login');
      return;
    }
    
    const user = JSON.parse(userString);
    if (user.role !== 'asha_worker') {
      navigate('/login');
      toast({
        title: "Access Denied",
        description: "This area is only for ASHA workers",
        variant: "destructive",
      });
      return;
    }
    
    // Fetch patient data
    fetchPatientDetails();
  }, [navigate, patientId]);
  
  const fetchPatientDetails = () => {
    setLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockPatient: PatientDetail = {
        id: patientId || '1',
        name: 'Priya Sharma',
        age: 24,
        address: 'Laxmi Nagar, Delhi',
        contact: '9876543210',
        gestationWeek: 16,
        lastVisit: '2025-04-28',
        nextAppointment: '2025-05-15',
        riskLevel: 'low',
        visits: [
          {
            date: '2025-04-28',
            notes: 'Regular check-up. Patient reported minor discomfort but otherwise doing well.',
            vitalSigns: {
              bloodPressure: '110/70',
              weight: 52
            }
          },
          {
            date: '2025-04-10',
            notes: 'Initial registration. All parameters normal.',
            vitalSigns: {
              bloodPressure: '120/80',
              weight: 51
            }
          }
        ]
      };
      
      setPatient(mockPatient);
      setLoading(false);
    }, 1000);
  };
  
  const handleStartRecording = () => {
    setIsRecording(true);
    
    // Simulate recording
    toast({
      title: "Recording started",
      description: "Speak clearly into the microphone",
    });
    
    // Simulate ending the recording after 5 seconds
    setTimeout(() => {
      setIsRecording(false);
      
      toast({
        title: "Voice note saved",
        description: "Voice note has been saved and will be uploaded when connected",
      });
    }, 5000);
  };
  
  const handleSendAlert = () => {
    toast({
      title: "Emergency alert sent",
      description: "Medical team has been notified about this patient",
      variant: "destructive",
    });
  };
  
  const handleAddVisit = () => {
    toast({
      title: "Feature coming soon",
      description: "Visit recording functionality will be available in the next update",
    });
  };
  
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate('/asha-dashboard')}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Button>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : patient ? (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{patient.name}</h1>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                    {patient.riskLevel.charAt(0).toUpperCase() + patient.riskLevel.slice(1)} Risk
                  </span>
                </div>
                <p className="text-gray-500">{patient.age} years • {patient.gestationWeek} weeks pregnant</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleAddVisit}
                >
                  <FileEdit size={16} />
                  Add Visit
                </Button>
                <Button 
                  variant={isRecording ? "destructive" : "outline"}
                  className="flex items-center gap-2"
                  onClick={handleStartRecording}
                  disabled={isRecording}
                >
                  <Mic size={16} />
                  {isRecording ? "Recording..." : "Voice Note"}
                </Button>
                <Button 
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={handleSendAlert}
                >
                  <AlertTriangle size={16} />
                  Send Alert
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Address</dt>
                      <dd>{patient.address}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd>{patient.contact}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Calendar size={24} className="text-primary" />
                    <div>
                      <p className="font-medium">Next Appointment</p>
                      <p className="text-lg">{new Date(patient.nextAppointment).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Schedule Next Visit
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Vital Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Current Blood Pressure</p>
                      <p className="text-lg font-medium">{patient.visits[0]?.vitalSigns?.bloodPressure || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Weight</p>
                      <p className="text-lg font-medium">{patient.visits[0]?.vitalSigns?.weight || 'N/A'} kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="visits">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="visits">Visit History</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="visits" className="p-4 border rounded-md mt-2">
                <h3 className="font-medium mb-4">Visit History</h3>
                <div className="space-y-4">
                  {patient.visits.map((visit, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between">
                        <p className="font-medium">{new Date(visit.date).toLocaleDateString()}</p>
                        <span className="text-xs text-gray-500">
                          BP: {visit.vitalSigns.bloodPressure}, Weight: {visit.vitalSigns.weight} kg
                        </span>
                      </div>
                      <p className="text-sm mt-1">{visit.notes}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="p-4 border rounded-md mt-2">
                <h3 className="font-medium mb-4">Voice Notes</h3>
                <div className="text-center py-8">
                  <p className="text-gray-500">No voice notes recorded yet</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 flex items-center gap-2"
                    onClick={handleStartRecording}
                  >
                    <Mic size={16} />
                    Record New Note
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="p-4 border rounded-md mt-2">
                <h3 className="font-medium mb-4">Patient Resources</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="font-medium">First Trimester Care Guide</p>
                    <p className="text-sm text-gray-600">Basic guidance for early pregnancy</p>
                    <Button variant="link" className="px-0">Download PDF</Button>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="font-medium">Nutrition Guidelines</p>
                    <p className="text-sm text-gray-600">Diet recommendations for pregnancy</p>
                    <Button variant="link" className="px-0">View Guidelines</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg font-medium">Patient not found</p>
            <p className="text-gray-500 mt-2">The patient you're looking for doesn't exist or you don't have access</p>
            <Button 
              className="mt-6"
              onClick={() => navigate('/asha-dashboard')}
            >
              Return to Dashboard
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AshaPatientDetail;
