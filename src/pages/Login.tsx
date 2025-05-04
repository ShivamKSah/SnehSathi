//corect code.....

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Set your API base URL here (environment variable fallback)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = activeTab === 'login'
      ? `${API_BASE_URL}/api/login`
      : `${API_BASE_URL}/api/register`;

    const payload = {
      email,
      password,
      ...(activeTab === 'register' && { name }),
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('Invalid server response. Please try again.');
      }

      if (!res.ok) {
        throw new Error(data?.message || 'Something went wrong');
      }

      if (activeTab === 'login') {
        localStorage.setItem('user', JSON.stringify(data.user));

        toast({
          title: 'Login successful',
          description: `Welcome to SnehSathi, ${data.user.name || 'User'}!`,
        });

        navigate('/');
      } else {
        // Registration success
        toast({
          title: 'Registration Successful',
          description: 'You can now login with your credentials.',
        });

        // Reset form and switch to login tab
        setName('');
        setPassword('');
        setActiveTab('login');
      }

    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50/50 to-blue-50/50">
      <header className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-700 hover:text-primary"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="flex items-center mb-10 space-x-4 group">
          <img
            src="/snehsathika.png"
            alt="SnehSathi Logo"
            className="h-20 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
          />
          <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text tracking-wide">
            SnehSathi
          </span>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === 'login'
                ? 'Sign in to access your maternal health journey'
                : 'Join us to start your personalized maternal health journey'}
            </CardDescription>
          </CardHeader>

          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="p-0 h-auto text-xs" type="button">
                        Forgot password?
                      </Button>
                    </div>
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
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        id="register-password"
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
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters and include a number and special character.
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
