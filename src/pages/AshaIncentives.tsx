
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Award, Calendar, TrendingUp, CheckCircle, Bell } from 'lucide-react';

interface IncentiveData {
  safeDeliveries: {
    current: number;
    target: number;
    incentiveAmount: number;
  };
  followUps: {
    current: number;
    target: number;
    incentiveAmount: number;
  };
  registrations: {
    current: number;
    target: number;
    incentiveAmount: number;
  };
  totalEarned: number;
  pendingAmount: number;
  recentPayments: {
    date: string;
    amount: number;
    status: 'paid' | 'pending';
    description: string;
  }[];
  incentiveHistory: {
    month: string;
    earned: number;
  }[];
}

const AshaIncentives: React.FC = () => {
  const [incentiveData, setIncentiveData] = useState<IncentiveData | null>(null);
  const [loading, setLoading] = useState(true);
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
    
    // Fetch incentive data
    fetchIncentiveData();
  }, [navigate]);
  
  const fetchIncentiveData = () => {
    setLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockData: IncentiveData = {
        safeDeliveries: {
          current: 8,
          target: 10,
          incentiveAmount: 300
        },
        followUps: {
          current: 24,
          target: 30,
          incentiveAmount: 150
        },
        registrations: {
          current: 12,
          target: 15,
          incentiveAmount: 100
        },
        totalEarned: 3600,
        pendingAmount: 1200,
        recentPayments: [
          {
            date: '2025-04-15',
            amount: 1200,
            status: 'paid',
            description: 'March incentives'
          },
          {
            date: '2025-03-15',
            amount: 1500,
            status: 'paid',
            description: 'February incentives'
          },
          {
            date: '2025-05-15',
            amount: 1200,
            status: 'pending',
            description: 'April incentives'
          }
        ],
        incentiveHistory: [
          { month: 'Jan', earned: 1400 },
          { month: 'Feb', earned: 1500 },
          { month: 'Mar', earned: 1200 },
          { month: 'Apr', earned: 1200 }
        ]
      };
      
      setIncentiveData(mockData);
      setLoading(false);
    }, 1000);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
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
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Incentive Tracker</h1>
          <p className="text-gray-500">Monitor your performance and incentives earned</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : incentiveData ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Safe Deliveries</CardTitle>
                    <Award size={20} className="text-yellow-500" />
                  </div>
                  <CardDescription>₹{incentiveData.safeDeliveries.incentiveAmount} per delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Progress toward target</span>
                        <span className="font-medium">
                          {incentiveData.safeDeliveries.current}/{incentiveData.safeDeliveries.target}
                        </span>
                      </div>
                      <Progress value={calculateProgress(incentiveData.safeDeliveries.current, incentiveData.safeDeliveries.target)} />
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Earned: </span>
                        ₹{incentiveData.safeDeliveries.current * incentiveData.safeDeliveries.incentiveAmount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Follow-ups</CardTitle>
                    <CheckCircle size={20} className="text-blue-500" />
                  </div>
                  <CardDescription>₹{incentiveData.followUps.incentiveAmount} per follow-up</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Progress toward target</span>
                        <span className="font-medium">
                          {incentiveData.followUps.current}/{incentiveData.followUps.target}
                        </span>
                      </div>
                      <Progress value={calculateProgress(incentiveData.followUps.current, incentiveData.followUps.target)} />
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Earned: </span>
                        ₹{incentiveData.followUps.current * incentiveData.followUps.incentiveAmount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Registrations</CardTitle>
                    <Bell size={20} className="text-purple-500" />
                  </div>
                  <CardDescription>₹{incentiveData.registrations.incentiveAmount} per registration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Progress toward target</span>
                        <span className="font-medium">
                          {incentiveData.registrations.current}/{incentiveData.registrations.target}
                        </span>
                      </div>
                      <Progress value={calculateProgress(incentiveData.registrations.current, incentiveData.registrations.target)} />
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Earned: </span>
                        ₹{incentiveData.registrations.current * incentiveData.registrations.incentiveAmount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Recent incentive payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incentiveData.recentPayments.map((payment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-md bg-gray-50 border">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{payment.amount}</p>
                          <span 
                            className={`text-xs px-2 py-1 rounded-full ${
                              payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {payment.status === 'paid' ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>Current period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-md">
                      <p className="text-sm text-purple-800">Total Earned (This Month)</p>
                      <p className="text-2xl font-bold text-purple-900">₹{incentiveData.totalEarned}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md">
                        <span className="text-sm font-medium text-yellow-800">Pending</span>
                        <span className="font-bold text-yellow-800">₹{incentiveData.pendingAmount}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm text-gray-500 mb-2">Next Payment Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>15th May, 2025</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp size={24} className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Performance Tip</h3>
                  <p className="text-sm text-gray-600">
                    Completing 2 more safe deliveries this month will earn you an additional bonus of ₹500. 
                    Follow up with patients who are near their due date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg font-medium">Unable to load incentive data</p>
            <p className="text-gray-500 mt-2">Please try again later</p>
            <Button 
              className="mt-6"
              onClick={fetchIncentiveData}
            >
              Retry
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AshaIncentives;
