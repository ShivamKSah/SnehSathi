
import React, { useState, useEffect, ChangeEvent } from 'react';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRound, LogOut, Save, ImageIcon, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().optional(),
  phone: z.string().optional(),
  avatarUrl: z.string().optional().or(z.string().length(0))
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      phone: '',
      avatarUrl: ''
    }
  });

  const watchAvatarUrl = form.watch("avatarUrl");

  // Check if avatar URL changes and update preview if using URL upload method
  useEffect(() => {
    if (uploadType === 'url' && watchAvatarUrl) {
      setAvatarPreview(watchAvatarUrl);
    }
  }, [watchAvatarUrl, uploadType]);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Check if profile is complete
      const hasName = !!parsedUser.name;
      const hasEmail = !!parsedUser.email;
      setIsProfileComplete(hasName && hasEmail);
      
      // If profile is not complete, go into edit mode
      if (!hasName || !hasEmail) {
        setIsEditing(true);
      }

      // Reset form with stored values
      form.reset({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        bio: parsedUser.bio || '',
        phone: parsedUser.phone || '',
        avatarUrl: parsedUser.avatarUrl || ''
      });

      // Set avatar preview based on stored data
      if (parsedUser.avatarImage) {
        setAvatarPreview(parsedUser.avatarImage);
        setUploadType('file');
      } else if (parsedUser.avatarUrl) {
        setAvatarPreview(parsedUser.avatarUrl);
        setUploadType('url');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    navigate('/');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size and type
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    setAvatarFile(file);
    setUploadType('file');
    
    // Convert file to base64 string for preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setAvatarPreview(base64);
      form.setValue("avatarUrl", "");
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: ProfileFormData) => {
    // Create updated user object with either file or URL based avatar
    const updatedUser = { 
      ...user, 
      ...data,
      avatarImage: uploadType === 'file' ? avatarPreview : null,
    };
    
    // If using file upload, clear the URL field
    if (uploadType === 'file') {
      updatedUser.avatarUrl = '';
    }

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    setIsProfileComplete(true);
    
    toast({
      title: isProfileComplete ? "Profile updated" : "Profile created",
      description: isProfileComplete 
        ? "Your profile has been updated successfully" 
        : "Your profile has been created successfully"
    });
  };

  const handleAvatarError = () => {
    // Handle avatar loading error
    if (uploadType === 'url') {
      setAvatarPreview('');
      
      if (isEditing) {
        toast({
          title: "Avatar URL error",
          description: "Could not load the image from the provided URL. Please check the URL and try again.",
          variant: "destructive"
        });
      }
    }
  };

  const switchUploadMethod = (method: 'url' | 'file') => {
    setUploadType(method);
    if (method === 'url') {
      setAvatarFile(null);
      if (watchAvatarUrl) {
        setAvatarPreview(watchAvatarUrl);
      } else {
        setAvatarPreview('');
      }
    } else {
      form.setValue("avatarUrl", "");
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <p className="text-center text-gray-500">Please login to view your profile</p>
              <Button className="w-full mt-4" onClick={() => navigate('/login')}>
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage 
                src={uploadType === 'file' 
                  ? avatarPreview 
                  : (user.avatarUrl || user.avatarImage || '')} 
                onError={handleAvatarError} 
                alt={user.name || "Profile picture"}
              />
              <AvatarFallback>
                <UserRound className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.name || 'Complete Your Profile'}</CardTitle>
              <p className="text-gray-500">{user.email}</p>
            </div>
            {isProfileComplete && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="ml-auto"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about yourself" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Avatar upload section with tabs for URL and File upload */}
                  <div className="space-y-3">
                    <Label>Avatar</Label>
                    <div className="flex space-x-2 mb-2">
                      <Button 
                        type="button" 
                        variant={uploadType === 'url' ? 'default' : 'outline'} 
                        onClick={() => switchUploadMethod('url')}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        URL
                      </Button>
                      <Button 
                        type="button" 
                        variant={uploadType === 'file' ? 'default' : 'outline'} 
                        onClick={() => switchUploadMethod('file')}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Upload
                      </Button>
                    </div>

                    {uploadType === 'url' ? (
                      <FormField
                        control={form.control}
                        name="avatarUrl"
                        render={({ field }) => (
                          <FormItem>
                            <div className="space-y-2">
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input 
                                    placeholder="Enter avatar URL" 
                                    {...field} 
                                  />
                                  {watchAvatarUrl && (
                                    <div className="flex-shrink-0">
                                      <Avatar className="h-10 w-10">
                                        <AvatarImage 
                                          src={watchAvatarUrl} 
                                          onError={handleAvatarError}
                                          alt="Avatar preview" 
                                        />
                                        <AvatarFallback>
                                          <ImageIcon className="h-4 w-4" />
                                        </AvatarFallback>
                                      </Avatar>
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <p className="text-xs text-gray-500">
                                Enter a direct URL to an image (e.g., https://example.com/your-image.jpg)
                              </p>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Label htmlFor="avatar-upload" className="cursor-pointer">
                              <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-sm text-center text-gray-500">
                                  Click to upload an image <br />
                                  <span className="text-xs">PNG, JPG, GIF up to 5MB</span>
                                </p>
                              </div>
                            </Label>
                            <Input 
                              type="file" 
                              id="avatar-upload" 
                              onChange={handleFileChange} 
                              accept="image/*"
                              className="hidden" 
                            />
                          </div>
                          {avatarPreview && uploadType === 'file' && (
                            <div className="flex-shrink-0">
                              <Avatar className="h-16 w-16">
                                <AvatarImage 
                                  src={avatarPreview}
                                  alt="Avatar preview" 
                                />
                                <AvatarFallback>
                                  <ImageIcon className="h-6 w-6" />
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          )}
                        </div>
                        {avatarFile && (
                          <p className="text-sm text-gray-600">
                            Selected file: {avatarFile.name} ({(avatarFile.size / 1024).toFixed(1)} KB)
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                    {isProfileComplete && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label>Bio</Label>
                    <p className="text-gray-600 mt-1">{user.bio || 'No bio added yet'}</p>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <p className="text-gray-600 mt-1">{user.phone || 'No phone number added'}</p>
                  </div>
                  <div>
                    <Label>Avatar</Label>
                    <div className="mt-1 flex items-center space-x-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage 
                          src={user.avatarImage || user.avatarUrl || ''} 
                          onError={handleAvatarError}
                          alt={user.name || "Profile picture"}
                        />
                        <AvatarFallback>
                          <UserRound className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      {!user.avatarImage && !user.avatarUrl && <p className="text-gray-600">No avatar set</p>}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Account Settings</h3>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
