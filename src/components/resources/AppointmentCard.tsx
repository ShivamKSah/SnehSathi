
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, Hospital } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppointmentCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
          <Hospital className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle>Medical Appointments</CardTitle>
        <CardDescription>
          Schedule consultations with healthcare providers
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-slate-500 mt-0.5 mr-2" />
            <div>
              <h4 className="text-sm font-medium">Book Appointments</h4>
              <p className="text-sm text-muted-foreground">
                Schedule visits with obstetricians, midwives, and specialists
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-slate-500 mt-0.5 mr-2" />
            <div>
              <h4 className="text-sm font-medium">Track Appointments</h4>
              <p className="text-sm text-muted-foreground">
                Manage and view your upcoming appointments
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate('/appointments')} className="w-full">
          Book Appointment
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentCard;
