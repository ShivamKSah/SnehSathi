
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CalendarIcon, Clock, Hospital, MapPin, Phone, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [doctorType, setDoctorType] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const doctorTypes = [
    { value: 'obgyn', label: 'Obstetrician/Gynecologist' },
    { value: 'midwife', label: 'Midwife' },
    { value: 'perinatologist', label: 'Perinatologist (High-Risk Specialist)' },
    { value: 'pediatrician', label: 'Pediatrician' },
    { value: 'familyDoctor', label: 'Family Doctor' },
    { value: 'geneticCounselor', label: 'Genetic Counselor' },
    { value: 'nutritionist', label: 'Nutritionist' },
    { value: 'lactationConsultant', label: 'Lactation Consultant' },
  ];

  const appointmentTypes = [
    { value: 'initial', label: 'Initial Prenatal Visit' },
    { value: 'followUp', label: 'Follow-up Prenatal Check-up' },
    { value: 'ultrasound', label: 'Ultrasound/Sonogram' },
    { value: 'geneticScreening', label: 'Genetic Screening' },
    { value: 'glucoseTest', label: 'Glucose Tolerance Test' },
    { value: 'vaccination', label: 'Vaccination' },
    { value: 'postpartumCheckup', label: 'Postpartum Check-up' },
    { value: 'nutritionConsult', label: 'Nutrition Consultation' },
    { value: 'breastfeedingSupport', label: 'Breastfeeding Support' },
    { value: 'mentalHealthSupport', label: 'Mental Health Support' },
  ];

  const locations = [
    { value: 'cityHospital', label: 'City General Hospital', address: '123 Main St, Downtown', phone: '(555) 123-4567' },
    { value: 'communityHealth', label: 'Community Health Center', address: '456 Park Ave, Westside', phone: '(555) 234-5678' },
    { value: 'womensClinic', label: 'Women\'s Health Clinic', address: '789 Oak Dr, Eastside', phone: '(555) 345-6789' },
    { value: 'familyPractice', label: 'Family Practice Associates', address: '101 Pine Rd, Northside', phone: '(555) 456-7890' },
    { value: 'maternityCenter', label: 'Maternity & Birthing Center', address: '202 Cedar St, Southside', phone: '(555) 567-8901' },
  ];

  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'obgyn',
      location: 'cityHospital',
      image: 'https://i.pravatar.cc/150?u=sarah',
      rating: 4.9,
      reviews: 124,
      nextAvailable: 'Tomorrow',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'obgyn',
      location: 'womensClinic',
      image: 'https://i.pravatar.cc/150?u=michael',
      rating: 4.7,
      reviews: 89,
      nextAvailable: 'Thursday',
    },
    {
      id: 3,
      name: 'Nurse Lisa Williams',
      specialty: 'midwife',
      location: 'maternityCenter',
      image: 'https://i.pravatar.cc/150?u=lisa',
      rating: 4.8,
      reviews: 112,
      nextAvailable: 'Today',
    },
    {
      id: 4,
      name: 'Dr. Robert Davis',
      specialty: 'perinatologist',
      location: 'cityHospital',
      image: 'https://i.pravatar.cc/150?u=robert',
      rating: 4.9,
      reviews: 76,
      nextAvailable: 'Friday',
    },
    {
      id: 5,
      name: 'Dr. Emily Rodriguez',
      specialty: 'obgyn',
      location: 'communityHealth',
      image: 'https://i.pravatar.cc/150?u=emily',
      rating: 4.6,
      reviews: 93,
      nextAvailable: 'Tomorrow',
    },
    {
      id: 6,
      name: 'Dr. James Wilson',
      specialty: 'familyDoctor',
      location: 'familyPractice',
      image: 'https://i.pravatar.cc/150?u=james',
      rating: 4.5,
      reviews: 68,
      nextAvailable: 'Today',
    },
  ];

  const times = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const filteredDoctors = availableDoctors.filter(doctor => {
    if (doctorType && doctor.specialty !== doctorType) return false;
    if (location && doctor.location !== location) return false;
    return true;
  });

  const handleBookAppointment = () => {
    if (!date) {
      toast({
        title: "Select date",
        description: "Please select an appointment date",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Booked",
      description: `Your appointment has been successfully scheduled for ${format(date, 'PPP')}`,
    });
  };

  const getLocationDetails = (locationId: string) => {
    return locations.find(loc => loc.value === locationId);
  };

  const getAppointmentTypeName = (typeId: string) => {
    const type = appointmentTypes.find(type => type.value === typeId);
    return type ? type.label : '';
  };

  return (
    <Layout>
      <section className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              <Hospital size={14} className="mr-1" />
              <span>Healthcare Appointments</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Book Your Appointment
            </h1>
            <p className="text-xl text-gray-600">
              Schedule consultations with healthcare providers at hospitals and clinics.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="new" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="new">New Appointment</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
              </TabsList>

              <TabsContent value="new" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Appointment Details</CardTitle>
                        <CardDescription>
                          Select the type of appointment you need
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="appointmentType">Appointment Type</Label>
                          <Select value={appointmentType} onValueChange={setAppointmentType}>
                            <SelectTrigger id="appointmentType">
                              <SelectValue placeholder="Select type of appointment" />
                            </SelectTrigger>
                            <SelectContent>
                              {appointmentTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="doctorType">Doctor Specialty</Label>
                          <Select value={doctorType} onValueChange={setDoctorType}>
                            <SelectTrigger id="doctorType">
                              <SelectValue placeholder="Select specialty" />
                            </SelectTrigger>
                            <SelectContent>
                              {doctorTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger id="location">
                              <SelectValue placeholder="Select facility" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((loc) => (
                                <SelectItem key={loc.value} value={loc.value}>
                                  {loc.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {location && (
                          <div className="bg-gray-50 p-3 rounded-md text-sm space-y-2 mt-4">
                            <p className="font-medium">{getLocationDetails(location)?.label}</p>
                            <div className="flex items-start text-gray-500">
                              <MapPin size={14} className="mr-1 mt-0.5 shrink-0" />
                              <span>{getLocationDetails(location)?.address}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Phone size={14} className="mr-1 shrink-0" />
                              <span>{getLocationDetails(location)?.phone}</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Pick a Date</CardTitle>
                        <CardDescription>
                          Select your preferred appointment date
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border w-full pointer-events-auto"
                          disabled={(date) => 
                            date < new Date() || 
                            date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                          }
                        />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Available Healthcare Providers</CardTitle>
                          <CardDescription>
                            {filteredDoctors.length === 0 
                              ? "No providers match your criteria. Try adjusting your filters." 
                              : `${filteredDoctors.length} providers available`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {filteredDoctors.length === 0 ? (
                              <div className="text-center py-8">
                                <User size={40} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-gray-500">No healthcare providers match your selected criteria.</p>
                                <p className="text-gray-500">Try adjusting your filters.</p>
                              </div>
                            ) : (
                              filteredDoctors.map((doctor) => (
                                <Card key={doctor.id} className="overflow-hidden">
                                  <div className="flex flex-col sm:flex-row">
                                    <div className="p-4 sm:p-5 flex-grow">
                                      <div className="flex items-start gap-3">
                                        <div className="h-12 w-12 rounded-full overflow-hidden border bg-gray-100 shrink-0">
                                          <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                          <h3 className="font-medium">{doctor.name}</h3>
                                          <p className="text-sm text-gray-500">
                                            {doctorTypes.find(type => type.value === doctor.specialty)?.label}
                                          </p>
                                          <div className="flex items-center mt-1">
                                            <div className="flex text-amber-400">
                                              {'★'.repeat(Math.floor(doctor.rating))}
                                              {'☆'.repeat(5 - Math.floor(doctor.rating))}
                                            </div>
                                            <span className="text-xs text-gray-500 ml-1">
                                              ({doctor.rating}/5, {doctor.reviews} reviews)
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2 mt-2 text-xs">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full flex items-center">
                                              <Clock size={10} className="mr-1" />
                                              Next available: {doctor.nextAvailable}
                                            </span>
                                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full flex items-center">
                                              <MapPin size={10} className="mr-1" />
                                              {locations.find(loc => loc.value === doctor.location)?.label}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="p-4 sm:p-5 bg-gray-50 sm:border-l">
                                      {date ? (
                                        <div className="space-y-2">
                                          <p className="text-sm font-medium flex items-center">
                                            <CalendarIcon size={14} className="mr-1" />
                                            {format(date, 'PPP')}
                                          </p>
                                          <div className="grid grid-cols-3 gap-2">
                                            {times.slice(0, 6).map((time) => (
                                              <Button 
                                                key={time} 
                                                variant="outline" 
                                                size="sm" 
                                                className="text-xs w-full"
                                                onClick={handleBookAppointment}
                                              >
                                                {time}
                                              </Button>
                                            ))}
                                          </div>
                                          <Popover>
                                            <PopoverTrigger asChild>
                                              <Button variant="link" size="sm" className="text-xs p-0">View more times</Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                              <div className="grid grid-cols-3 gap-2">
                                                {times.slice(6).map((time) => (
                                                  <Button 
                                                    key={time} 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="text-xs w-full"
                                                    onClick={handleBookAppointment}
                                                  >
                                                    {time}
                                                  </Button>
                                                ))}
                                              </div>
                                            </PopoverContent>
                                          </Popover>
                                        </div>
                                      ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center py-2">
                                          <CalendarIcon size={18} className="text-gray-400 mb-1" />
                                          <p className="text-sm text-gray-500">Select a date to see available times</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </Card>
                              ))
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {appointmentType && date && filteredDoctors.length > 0 && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Additional Information</CardTitle>
                            <CardDescription>
                              Please provide any relevant details for your {getAppointmentTypeName(appointmentType)}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Textarea 
                              placeholder="Describe your symptoms, concerns, or questions for the healthcare provider..."
                              className="min-h-32"
                            />
                          </CardContent>
                          <CardFooter>
                            <Button onClick={handleBookAppointment} className="w-full">
                              Book Appointment
                            </Button>
                          </CardFooter>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upcoming">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Upcoming Appointments</CardTitle>
                    <CardDescription>
                      View and manage your scheduled appointments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border overflow-hidden">
                        <div className="bg-blue-50 border-b p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Prenatal Check-up</h3>
                            <p className="text-sm text-gray-600">Appointment with Dr. Sarah Johnson</p>
                          </div>
                          <Button variant="outline" size="sm">Reschedule</Button>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Date & Time</p>
                              <p className="text-sm text-gray-600">May 15, 2023 at 10:30 AM</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Location</p>
                              <p className="text-sm text-gray-600">City General Hospital</p>
                              <p className="text-xs text-gray-600">123 Main St, Downtown</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Contact</p>
                              <p className="text-sm text-gray-600">(555) 123-4567</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border overflow-hidden">
                        <div className="bg-green-50 border-b p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Ultrasound</h3>
                            <p className="text-sm text-gray-600">Appointment with Dr. Michael Chen</p>
                          </div>
                          <Button variant="outline" size="sm">Reschedule</Button>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Date & Time</p>
                              <p className="text-sm text-gray-600">June 2, 2023 at 2:15 PM</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Location</p>
                              <p className="text-sm text-gray-600">Women's Health Clinic</p>
                              <p className="text-xs text-gray-600">789 Oak Dr, Eastside</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Contact</p>
                              <p className="text-sm text-gray-600">(555) 345-6789</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Appointments;
