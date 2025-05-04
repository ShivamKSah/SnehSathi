
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Mic, 
  AlertTriangle, 
  FileEdit, 
  Search, 
  RefreshCcw,
  Award,
  BookOpen,
  Bell,
  FileText,
  Calendar,
  User
} from 'lucide-react';

// Mock data types
interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  riskLevel: 'low' | 'medium' | 'high' | 'unknown';
  nextAppointment: string;
  address: string;
  contact: string;
  gestationWeek: number;
}

const AshaDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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
    
    // Fetch patients data
    fetchPatients();
  }, [navigate]);
  
  const fetchPatients = () => {
    setLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockPatients: Patient[] = [
        {
          id: '1',
          name: 'Priya Sharma',
          age: 24,
          lastVisit: '2025-04-28',
          riskLevel: 'low',
          nextAppointment: '2025-05-15',
          address: 'Laxmi Nagar, Delhi',
          contact: '9876543210',
          gestationWeek: 16
        },
        {
          id: '2',
          name: 'Meena Kumari',
          age: 29,
          lastVisit: '2025-04-25',
          riskLevel: 'medium',
          nextAppointment: '2025-05-10',
          address: 'Gandhi Road, Mumbai',
          contact: '8765432109',
          gestationWeek: 24
        },
        {
          id: '3',
          name: 'Fatima Khan',
          age: 22,
          lastVisit: '2025-04-30',
          riskLevel: 'high',
          nextAppointment: '2025-05-07',
          address: 'Pratap Nagar, Jaipur',
          contact: '7654321098',
          gestationWeek: 32
        },
        {
          id: '4',
          name: 'Lakshmi Reddy',
          age: 27,
          lastVisit: '2025-05-01',
          riskLevel: 'low',
          nextAppointment: '2025-05-22',
          address: 'Kukatpally, Hyderabad',
          contact: '6543210987',
          gestationWeek: 12
        },
        {
          id: '5',
          name: 'Anita Gupta',
          age: 32,
          lastVisit: '2025-04-20',
          riskLevel: 'medium',
          nextAppointment: '2025-05-12',
          address: 'Salt Lake, Kolkata',
          contact: '9876543211',
          gestationWeek: 28
        }
      ];
      
      setPatients(mockPatients);
      setLoading(false);
    }, 1000);
  };
  
  const handleAddPatient = () => {
    navigate('/asha-patient-register');
  };
  
  const handleViewPatient = (patientId: string) => {
    navigate(`/asha-patient/${patientId}`);
  };
  
  const handleAddVisitNote = (patientId: string) => {
    toast({
      title: "Feature Coming Soon",
      description: "Add visit note functionality will be available soon",
    });
  };
  
  const handleVoiceNote = (patientId: string) => {
    toast({
      title: "Feature Coming Soon",
      description: "Voice note recording will be available soon",
    });
  };
  
  const handleAlert = (patientId: string) => {
    toast({
      title: "Alert Sent",
      description: "Emergency alert has been sent to the doctor",
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
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">ASHA Worker Dashboard</h1>
            <p className="text-gray-500">Manage your assigned pregnant women</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name or address..."
                className="pl-10 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              className="flex items-center justify-center gap-2"
              onClick={handleAddPatient}
            >
              <Plus size={16} />
              <span>Add Patient</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center gap-2"
              onClick={() => fetchPatients()}
            >
              <RefreshCcw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
        
        {/* Quick Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link to="/asha-incentives">
            <Card className="hover:bg-slate-50 transition-colors cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                <div className="p-2 rounded-full bg-purple-100 mb-2">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-center font-medium">Incentives</h3>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/asha-training-resources">
            <Card className="hover:bg-slate-50 transition-colors cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                <div className="p-2 rounded-full bg-blue-100 mb-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-center font-medium">Training</h3>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/notifications">
            <Card className="hover:bg-slate-50 transition-colors cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                <div className="p-2 rounded-full bg-red-100 mb-2">
                  <Bell className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-center font-medium">Alerts</h3>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/asha-patient-register">
            <Card className="hover:bg-slate-50 transition-colors cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                <div className="p-2 rounded-full bg-green-100 mb-2">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-center font-medium">Register</h3>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        {/* Patient Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-50 to-fuchsia-50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-800 rounded-full">Today</span>
              </div>
              <h3 className="text-lg font-medium">Upcoming Appointments</h3>
              <p className="text-3xl font-bold mt-1 mb-2 text-purple-900">
                {patients.filter(p => new Date(p.nextAppointment) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
              </p>
              <p className="text-sm text-gray-600">Appointments in the next 7 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-800 rounded-full">Critical</span>
              </div>
              <h3 className="text-lg font-medium">High Risk Patients</h3>
              <p className="text-3xl font-bold mt-1 mb-2 text-red-900">
                {patients.filter(p => p.riskLevel === 'high').length}
              </p>
              <p className="text-sm text-gray-600">Patients requiring urgent attention</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-teal-50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
              </div>
              <h3 className="text-lg font-medium">Total Patients</h3>
              <p className="text-3xl font-bold mt-1 mb-2 text-green-900">
                {patients.length}
              </p>
              <p className="text-sm text-gray-600">Patients under your care</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Assigned Patients</CardTitle>
            <CardDescription>
              You have {filteredPatients.length} patients assigned to you
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No patients found matching your search</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Next Appointment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                            {patient.riskLevel.charAt(0).toUpperCase() + patient.riskLevel.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(patient.nextAppointment).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewPatient(patient.id)}
                              title="View Details"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleAddVisitNote(patient.id)}
                              title="Add Visit Note"
                            >
                              <FileEdit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleVoiceNote(patient.id)}
                              title="Record Voice Note"
                            >
                              <Mic size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleAlert(patient.id)}
                              title="Alert Doctor"
                            >
                              <AlertTriangle size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AshaDashboard;
