  
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, FileText, Video, Download, CheckCircle } from 'lucide-react';

interface TrainingResource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'audio';
  url: string;
  thumbnailUrl?: string;
  durationMinutes?: number;
  isCompleted: boolean;
  language: string;
}

const AshaTrainingResources: React.FC = () => {
  const [resources, setResources] = useState<TrainingResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<TrainingResource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState('all');
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
    
    // Fetch resources
    fetchResources();
  }, [navigate]);
  
  // Filter resources when search query or active language changes
  useEffect(() => {
    filterResources();
  }, [searchQuery, activeLanguage, resources]);
  
  const fetchResources = () => {
    setLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockResources: TrainingResource[] = [
        {
          id: '1',
          title: 'Identifying Pregnancy Complications',
          description: 'Learn how to identify warning signs during pregnancy and when to refer to medical facilities.',
          type: 'video',
          url: '#',
          thumbnailUrl: '/Identifying Pregnancy Complications.jpg',
          durationMinutes: 12,
          isCompleted: true,  
          language: 'hindi'
        },
        {
          id: '2',
          title: 'Antenatal Care Basics',
          description: 'Essential guide for providing antenatal care in community settings.',
          type: 'document',
          url: '#',
          isCompleted: false,
          language: 'english'
        },
        {
          id: '3',
          title: 'Maternal Nutrition',
          description: 'Guidelines for advising pregnant women about proper nutrition during pregnancy.',
          type: 'video',
          url: '#',
          thumbnailUrl: '/Maternal Nutrition.jpg',
          durationMinutes: 15,
          isCompleted: false,
          language: 'hindi'
        },
        {
          id: '4',
          title: 'Safe Delivery Practices',
          description: 'Emergency procedures and best practices for safe delivery.',
          type: 'video',
          url: '#',
          thumbnailUrl: '/Safe Delivery Practices.jpg',
          durationMinutes: 20,
          isCompleted: false,
          language: 'english'
        },
        {
          id: '5',
          title: 'Postnatal Care Guide',
          description: 'Complete guide for providing care after delivery for both mother and infant.',
          type: 'document',
          url: '#',
          isCompleted: true,
          language: 'hindi'
        }
      ];
      
      setResources(mockResources);
      setFilteredResources(mockResources);
      setLoading(false);
    }, 1000);
  };
  
  const filterResources = () => {
    let filtered = [...resources];
    
    // Filter by language
    if (activeLanguage !== 'all') {
      filtered = filtered.filter(resource => resource.language === activeLanguage);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredResources(filtered);
  };
  
  const handleMarkAsCompleted = (resourceId: string) => {
    setResources(prevResources =>
      prevResources.map(resource =>
        resource.id === resourceId
          ? { ...resource, isCompleted: !resource.isCompleted }
          : resource
      )
    );
    
    toast({
      title: "Progress updated",
      description: "Your training progress has been updated",
    });
  };
  
  const handleDownloadForOffline = (resourceId: string) => {
    toast({
      title: "Downloading resource",
      description: "This resource will be available offline",
    });
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
        
        <div className="flex flex-col lg:flex-row gap-2 justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Training Resources</h1>
            <p className="text-gray-500">Access training materials and professional development content</p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search resources..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveLanguage} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hindi">Hindi</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <Card key={resource.id} className="overflow-hidden">
                    {resource.type === 'video' && resource.thumbnailUrl && (
                      <div className="aspect-video relative">
                        <img
                          src={resource.thumbnailUrl}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/60 rounded-full p-3">
                            <Video size={24} className="text-white" />
                          </div>
                        </div>
                        {resource.durationMinutes && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {resource.durationMinutes} min
                          </div>
                        )}
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        {resource.isCompleted && (
                          <div className="bg-green-100 p-1 rounded-full">
                            <CheckCircle size={16} className="text-green-600" />
                          </div>
                        )}
                      </div>
                      <CardDescription>
                        <span className="capitalize">{resource.language}</span> • {resource.type}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-gray-700">{resource.description}</p>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => handleMarkAsCompleted(resource.id)}>
                        {resource.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1" 
                        onClick={() => handleDownloadForOffline(resource.id)}
                      >
                        <Download size={14} />
                        Offline
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-medium">No resources found</p>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="hindi" className="mt-0">
            {/* Content will be filtered automatically by the effect */}
          </TabsContent>
          
          <TabsContent value="english" className="mt-0">
            {/* Content will be filtered automatically by the effect */}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-medium mb-2">Having trouble accessing resources?</h2>
          <p className="text-sm text-gray-600">Contact your supervisor or call the helpline at 1800-XXX-XXXX for assistance</p>
        </div>
      </div>
    </Layout>
  );
};

export default AshaTrainingResources;
