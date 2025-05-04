import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, User, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const DUMMY_USERS = [
  { userId: 'asha123', password: 'pass123' },
  { userId: 'asha456', password: 'pass456' }
];

const AshaLogin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('mobile');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "OTP sent",
          description: "Please check your mobile for the OTP",
        });
        setOtpSent(true);
      } else {
        toast({
          title: "Failed to send OTP",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while sending OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber, otp }),
      });

      const data = await response.json();

      if (data.success) {
        const ashaUser = {
          id: "asha_" + Date.now(),
          name: "ASHA Worker",
          role: "asha_worker",
          mobileNumber,
          avatarUrl: ''
        };

        localStorage.setItem('user', JSON.stringify(ashaUser));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate('/asha-dashboard');
      } else {
        toast({
          title: "OTP verification failed",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not verify OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithPassword = () => {
    if (!userId || !password) {
      toast({
        title: "Invalid credentials",
        description: "Please enter both user ID and password",
        variant: "destructive",
      });
      return;
    }

    const matchedUser = DUMMY_USERS.find(user => user.userId === userId && user.password === password);

    if (!matchedUser) {
      toast({
        title: "Login failed",
        description: "Incorrect ID or password",
        variant: "destructive",
      });
      return;
    }

    const ashaUser = {
      id: userId,
      name: "ASHA Worker",
      role: "asha_worker",
      userId,
      avatarUrl: ''
    };

    localStorage.setItem('user', JSON.stringify(ashaUser));
    toast({
      title: "Login successful",
      description: "Welcome back, ASHA Worker!",
    });

    navigate('/asha-dashboard');
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50/50 to-blue-50/50">
      <header className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-700 hover:text-primary"
          onClick={() => navigate('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path>
          </svg>
          Back to Home
        </Button>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="flex items-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="#9b87f5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
            <path d="M8 7V3m8 4V3"></path>
          </svg>
          <span className="text-2xl font-medium">ASHA Worker Portal</span>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">ASHA Login</CardTitle>
            <CardDescription>Login to access your ASHA worker dashboard</CardDescription>
          </CardHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mobile">Mobile OTP</TabsTrigger>
              <TabsTrigger value="password">ID & Password</TabsTrigger>
            </TabsList>

            <TabsContent value="mobile">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      id="mobileNumber"
                      type="tel"
                      placeholder="Enter your 10-digit mobile"
                      className="pl-10"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      maxLength={10}
                      required
                      disabled={otpSent}
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2 pt-4">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <div className="flex justify-center pt-2">
                      <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                        <InputOTPGroup>
                          {[...Array(6)].map((_, i) => (
                            <InputOTPSlot key={i} index={i} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <div className="text-center pt-2">
                      <Button
                        variant="link"
                        className="text-xs"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp('');
                        }}
                      >
                        Change mobile number
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col">
                {!otpSent ? (
                  <Button
                    className="w-full bg-primary"
                    onClick={handleSendOTP}
                    disabled={loading || !mobileNumber || mobileNumber.length !== 10}
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-primary"
                    onClick={handleLoginWithOTP}
                    disabled={loading || !otp || otp.length !== 6}
                  >
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </Button>
                )}
              </CardFooter>
            </TabsContent>

            <TabsContent value="password">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      id="userId"
                      placeholder="Enter your ASHA ID"
                      className="pl-10"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={togglePasswordVisibility}
                      type="button"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="link" className="p-0 h-auto text-xs">
                      Forgot password?
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col">
                <Button
                  className="w-full bg-primary"
                  onClick={handleLoginWithPassword}
                  disabled={!userId || !password}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AshaLogin;
