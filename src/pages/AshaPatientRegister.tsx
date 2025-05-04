
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';

interface PatientFormData {
  name: string;
  age: string;
  address: string;
  gestationWeek: string;
  contact: string;
}

interface PatientEntry extends PatientFormData {
  id: string;
}

const AshaPatientRegister: React.FC = () => {
  const [entries, setEntries] = useState<PatientEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<PatientFormData>({
    name: '',
    age: '',
    address: '',
    gestationWeek: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in and has ASHA role
  React.useEffect(() => {
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
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentEntry(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEntry = () => {
    if (!currentEntry.name.trim()) {
      toast({
        title: "Missing information",
        description: "Patient name is required",
        variant: "destructive",
      });
      return false;
    }
    
    if (!currentEntry.age.trim() || isNaN(Number(currentEntry.age)) || Number(currentEntry.age) <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid age",
        variant: "destructive",
      });
      return false;
    }
    
    if (!currentEntry.contact.trim() || currentEntry.contact.length !== 10) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid 10-digit contact number",
        variant: "destructive",
      });
      return false;
    }
    
    if (!currentEntry.gestationWeek.trim() || isNaN(Number(currentEntry.gestationWeek))) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid gestation week",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const addEntry = () => {
    if (!validateEntry()) return;
    
    const newEntry: PatientEntry = {
      ...currentEntry,
      id: Date.now().toString(),
    };
    
    setEntries(prev => [...prev, newEntry]);
    
    // Clear form
    setCurrentEntry({
      name: '',
      age: '',
      address: '',
      gestationWeek: '',
      contact: '',
    });
    
    toast({
      title: "Entry added",
      description: "Patient entry has been added to the list",
    });
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    
    toast({
      title: "Entry removed",
      description: "Patient entry has been removed from the list",
    });
  };

  const handleSubmit = () => {
    if (entries.length === 0) {
      toast({
        title: "No entries",
        description: "Please add at least one patient entry",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Registration successful",
        description: `${entries.length} patients registered successfully`,
      });
      
      // Store in local storage for offline capability simulation
      const storedEntries = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]');
      localStorage.setItem('pendingRegistrations', JSON.stringify([...storedEntries, ...entries]));
      
      // Clear entries and navigate back
      setEntries([]);
      navigate('/asha-dashboard');
    }, 1500);
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
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Register New Patient</CardTitle>
                <CardDescription>
                  Enter the details of the pregnant woman to register
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name*</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter patient's full name"
                    value={currentEntry.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age*</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Age"
                      value={currentEntry.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gestationWeek">Gestation Week*</Label>
                    <Input
                      id="gestationWeek"
                      name="gestationWeek"
                      type="number"
                      placeholder="Week of pregnancy"
                      value={currentEntry.gestationWeek}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number*</Label>
                  <Input
                    id="contact"
                    name="contact"
                    placeholder="10-digit mobile number"
                    value={currentEntry.contact}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleInputChange({
                        ...e,
                        target: {
                          ...e.target,
                          name: 'contact',
                          value
                        }
                      });
                    }}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Village/town and district"
                    value={currentEntry.address}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full flex items-center gap-2"
                  onClick={addEntry}
                >
                  <Plus size={16} />
                  Add to List
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="w-full lg:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Entries</CardTitle>
                <CardDescription>
                  {entries.length} {entries.length === 1 ? 'patient' : 'patients'} ready for registration
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {entries.length === 0 ? (
                  <div className="text-center py-12 border rounded border-dashed">
                    <p className="text-gray-500">No patient entries added yet</p>
                    <p className="text-sm text-gray-400">Add patients using the form on the left</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {entries.map(entry => (
                      <div key={entry.id} className="border rounded p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{entry.name}, {entry.age} yrs</p>
                          <p className="text-sm text-gray-500">Week {entry.gestationWeek} • {entry.contact}</p>
                          {entry.address && <p className="text-sm text-gray-500">{entry.address}</p>}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeEntry(entry.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full flex items-center gap-2"
                  onClick={handleSubmit}
                  disabled={entries.length === 0 || loading}
                >
                  <Save size={16} />
                  {loading ? 'Registering...' : 'Register All Patients'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AshaPatientRegister;
