
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, MessageSquare, Heart, Clock, Filter, ChevronRight, ThumbsUp, Send, SmilePlus, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

// Define interfaces once
interface Discussion {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  author: {
    name: string;
    avatar?: string;
    id?: string;
  };
  date: string;
  replies: number;
  likes: number;
  tags: string[];
  isAnswered?: boolean;
  comments?: Comment[];
}

interface Comment {
  id: number;
  text: string;
  author: {
    name: string;
    avatar?: string;
    id?: string;
  };
  date: string;
  likes: number;
  isLiked?: boolean;
}

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  posts: number;
  lastActive: string;
  tags: string[];
  coverImage?: string;
  isJoined?: boolean;
}

// Define data arrays once
const discussionsData: Discussion[] = [
  {
    id: 1,
    title: "Managing morning sickness in the first trimester",
    excerpt: "I'm 8 weeks pregnant and struggling with severe morning sickness. Has anyone found effective remedies or strategies that helped them?",
    content: "Hello everyone, I'm currently 8 weeks pregnant with my first child and experiencing severe morning sickness. It's affecting my work and daily routine significantly. I've tried eating small meals and ginger tea, but they provide only temporary relief. Has anyone found effective remedies or strategies that helped them manage morning sickness? I'd appreciate any advice!",
    author: {
      name: "Emily Wilson",
      avatar: "https://i.pravatar.cc/150?u=emily",
      id: "user1",
    },
    date: "2 days ago",
    replies: 24,
    likes: 15,
    tags: ["first trimester", "morning sickness", "remedies"],
    isAnswered: true,
    comments: [
      {
        id: 1,
        text: "I found that wearing sea bands on my wrists helped a lot with my nausea. They apply pressure to acupressure points that help with nausea. Also, vitamin B6 supplements helped me - but check with your doctor first before taking any supplements.",
        author: {
          name: "Sarah Miller",
          avatar: "https://i.pravatar.cc/150?u=sarah",
          id: "user2",
        },
        date: "2 days ago",
        likes: 7,
        isLiked: false,
      },
      {
        id: 2,
        text: "Cold foods were a lifesaver for me! Hot foods made the nausea worse. Try popsicles, cold fruit, and smoothies. Also, keep crackers by your bedside to eat before getting up in the morning.",
        author: {
          name: "Jennifer Lee",
          id: "user3",
        },
        date: "1 day ago",
        likes: 5,
        isLiked: false,
      }
    ]
  },
  {
    id: 2,
    title: "Exercise recommendations during second trimester",
    excerpt: "I'm entering my second trimester and want to maintain an exercise routine. What types of exercises are safe and beneficial at this stage?",
    author: {
      name: "Lisa Johnson",
      avatar: "https://i.pravatar.cc/150?u=lisa",
      id: "user4",
    },
    date: "1 week ago",
    replies: 18,
    likes: 22,
    tags: ["second trimester", "exercise", "fitness"],
    comments: []
  },
  {
    id: 3,
    title: "Preparing for hospital delivery during COVID",
    excerpt: "With current COVID protocols, I'm unsure what to expect for my upcoming delivery. Can anyone share their recent experiences at hospitals?",
    author: {
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      id: "user2",
    },
    date: "3 days ago",
    replies: 32,
    likes: 28,
    tags: ["third trimester", "hospital", "delivery", "covid"],
    isAnswered: true,
    comments: []
  },
  {
    id: 4,
    title: "Managing gestational diabetes through diet",
    excerpt: "Recently diagnosed with gestational diabetes and trying to manage it through diet. Looking for meal ideas and tips from others who've been through this.",
    author: {
      name: "Jennifer Lee",
      id: "user3",
    },
    date: "5 days ago",
    replies: 14,
    likes: 19,
    tags: ["gestational diabetes", "nutrition", "diet", "health"],
    comments: []
  },
  {
    id: 5,
    title: "Dealing with insomnia in the third trimester",
    excerpt: "I'm 34 weeks and struggling to get comfortable and sleep at night. Would appreciate any advice or remedies that have worked for others.",
    author: {
      name: "Rachel Green",
      avatar: "https://i.pravatar.cc/150?u=rachel",
      id: "user5",
    },
    date: "2 weeks ago",
    replies: 27,
    likes: 31,
    tags: ["third trimester", "sleep", "insomnia", "comfort"],
    comments: []
  },
];

const groupsData: Group[] = [
  {
    id: 1,
    name: "First-Time Moms Support",
    description: "A supportive community for women experiencing pregnancy and motherhood for the first time.",
    members: 1250,
    posts: 427,
    lastActive: "Today",
    tags: ["first-time moms", "support", "new mothers"],
    coverImage: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=2070&auto=format&fit=crop",
    isJoined: false,
  },
  {
    id: 2,
    name: "Twin & Multiple Births",
    description: "Connect with other parents of twins, triplets, or more to share your unique challenges and joys.",
    members: 850,
    posts: 312,
    lastActive: "Yesterday",
    tags: ["twins", "multiples", "multiple births"],
    coverImage: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=2070&auto=format&fit=crop",
    isJoined: false,
  },
  {
    id: 3,
    name: "High-Risk Pregnancy Support",
    description: "A safe space for discussing the emotional and physical aspects of high-risk pregnancies.",
    members: 975,
    posts: 356,
    lastActive: "2 days ago",
    tags: ["high-risk", "medical support", "complications"],
    coverImage: "https://images.unsplash.com/photo-1595092787797-be55ac013055?q=80&w=2069&auto=format&fit=crop",
    isJoined: true,
  },
  {
    id: 4,
    name: "Natural Birth & Midwifery",
    description: "Discussions on natural birth options, midwifery care, birthing centers, and home births.",
    members: 1125,
    posts: 289,
    lastActive: "Today",
    tags: ["natural birth", "midwifery", "home birth"],
    coverImage: "https://images.unsplash.com/photo-1519397854850-9b0a6a6bb969?q=80&w=2070&auto=format&fit=crop",
    isJoined: false,
  },
  {
    id: 5,
    name: "Working Moms Balance",
    description: "Share strategies for balancing pregnancy, motherhood, and career responsibilities.",
    members: 1560,
    posts: 512,
    lastActive: "Today",
    tags: ["working moms", "career", "balance"],
    coverImage: "https://images.unsplash.com/photo-1571727153834-5903a2277df0?q=80&w=2070&auto=format&fit=crop",
    isJoined: false,
  },
  {
    id: 6,
    name: "Prenatal & Postnatal Fitness",
    description: "Safe exercise routines, yoga, and fitness tips for before and after delivery.",
    members: 890,
    posts: 278,
    lastActive: "Yesterday",
    tags: ["fitness", "exercise", "yoga", "prenatal", "postnatal"],
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    isJoined: false,
  },
];

const Community: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [discussions, setDiscussions] = useState(discussionsData);
  const [filteredDiscussions, setFilteredDiscussions] = useState(discussions);
  const [groups, setGroups] = useState(groupsData);
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [commentText, setCommentText] = useState('');
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    tags: '',
    coverImage: ''
  });
  const [viewDiscussionModalOpen, setViewDiscussionModalOpen] = useState(false);
  const [newDiscussionModalOpen, setNewDiscussionModalOpen] = useState(false);
  const [newGroupModalOpen, setNewGroupModalOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    setFilteredDiscussions(
      discussions.filter(discussion => 
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
    
    setFilteredGroups(
      groups.filter(group => 
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, discussions, groups]);

  const handleAddComment = () => {
    if (!commentText.trim() || !selectedDiscussion) return;

    const updatedDiscussions = discussions.map(discussion => {
      if (discussion.id === selectedDiscussion.id) {
        const comments = discussion.comments || [];
        const newComment: Comment = {
          id: comments.length + 1,
          text: commentText,
          author: {
            name: "You",
            id: "currentUser"
          },
          date: "Just now",
          likes: 0,
          isLiked: false
        };
        
        return {
          ...discussion,
          comments: [...comments, newComment],
          replies: discussion.replies + 1
        };
      }
      return discussion;
    });

    setDiscussions(updatedDiscussions);
    const updated = updatedDiscussions.find(d => d.id === selectedDiscussion.id);
    if (updated) {
      setSelectedDiscussion(updated);
    }
    setCommentText('');
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully"
    });
  };

  const handleLikeComment = (discussionId: number, commentId: number) => {
    const updatedDiscussions = discussions.map(discussion => {
      if (discussion.id === discussionId && discussion.comments) {
        const updatedComments = discussion.comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked
            };
          }
          return comment;
        });
        
        return {
          ...discussion,
          comments: updatedComments
        };
      }
      return discussion;
    });

    setDiscussions(updatedDiscussions);
    const updated = updatedDiscussions.find(d => d.id === discussionId);
    if (updated) {
      setSelectedDiscussion(updated);
    }
  };

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide a title and content for your discussion"
      });
      return;
    }

    const tags = newDiscussion.tags ? newDiscussion.tags.split(',').map(tag => tag.trim()) : [];
    
    const newDiscussionObj: Discussion = {
      id: discussions.length + 1,
      title: newDiscussion.title,
      excerpt: newDiscussion.content.substring(0, 150) + (newDiscussion.content.length > 150 ? '...' : ''),
      content: newDiscussion.content,
      author: {
        name: "You",
        id: "currentUser"
      },
      date: "Just now",
      replies: 0,
      likes: 0,
      tags,
      comments: []
    };

    setDiscussions([newDiscussionObj, ...discussions]);
    setNewDiscussion({ title: '', content: '', tags: '' });
    setNewDiscussionModalOpen(false);
    toast({
      title: "Discussion created",
      description: "Your discussion has been posted successfully"
    });
  };

  const handleCreateGroup = () => {
    if (!newGroup.name.trim() || !newGroup.description.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide a name and description for your group"
      });
      return;
    }

    const tags = newGroup.tags ? newGroup.tags.split(',').map(tag => tag.trim()) : [];
    
    const newGroupObj: Group = {
      id: groups.length + 1,
      name: newGroup.name,
      description: newGroup.description,
      members: 1,
      posts: 0,
      lastActive: "Just now",
      tags,
      coverImage: newGroup.coverImage || "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?q=80&w=2070&auto=format&fit=crop",
      isJoined: true
    };

    setGroups([newGroupObj, ...groups]);
    setNewGroup({ name: '', description: '', tags: '', coverImage: '' });
    setNewGroupModalOpen(false);
    toast({
      title: "Group created",
      description: "Your group has been created successfully"
    });
  };

  const handleJoinGroup = (groupId: number) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          isJoined: !group.isJoined,
          members: group.isJoined ? group.members - 1 : group.members + 1
        };
      }
      return group;
    });

    setGroups(updatedGroups);
    const action = updatedGroups.find(g => g.id === groupId)?.isJoined ? "joined" : "left";
    
    toast({
      title: `Group ${action}`,
      description: `You have successfully ${action} this group`
    });
  };

  const handleLikeDiscussion = (discussionId: number) => {
    const updatedDiscussions = discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          likes: discussion.likes + 1
        };
      }
      return discussion;
    });

    setDiscussions(updatedDiscussions);
    toast({
      title: "Discussion liked",
      description: "You have liked this discussion"
    });
  };

  const handleViewDiscussion = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
    setViewDiscussionModalOpen(true);
  };

  return (
    <Layout>
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate('/resources')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Resources
          </Button>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              <Users size={14} className="mr-1" />
              <span>Join the Conversation</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Maternal Health Community
            </h1>
            <p className="text-xl text-gray-600">
              Connect with other mothers, share experiences, and get support from our community.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-auto flex-1">
                <Input
                  placeholder="Search discussions or groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchTerm('')}
                  disabled={!searchTerm}
                >
                  {searchTerm ? '✕' : '🔍'}
                </Button>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                  <TabsList>
                    <TabsTrigger value="discussions">Discussions</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filter Community Content</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <h3 className="text-sm font-medium mb-2">Topics</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {["Pregnancy", "First Trimester", "Second Trimester", "Third Trimester", "Nutrition", "Exercise", "Mental Health", "Parenting"].map(tag => (
                          <Badge 
                            key={tag}
                            variant={searchTerm.includes(tag.toLowerCase()) ? "default" : "outline"} 
                            className="cursor-pointer"
                            onClick={() => setSearchTerm(tag.toLowerCase())}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-sm font-medium mb-2">Sort By</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start">
                          Newest
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Most Popular
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Most Replies
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Recently Active
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="discussions" className="mt-0">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-medium">Community Discussions</h2>
                  <Dialog open={newDiscussionModalOpen} onOpenChange={setNewDiscussionModalOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <MessageSquare size={16} className="mr-2" />
                        Start Discussion
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Start a New Discussion</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <label className="text-sm font-medium block mb-1">Title</label>
                          <Input 
                            placeholder="Enter a descriptive title..." 
                            value={newDiscussion.title}
                            onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Message</label>
                          <Textarea 
                            className="min-h-32" 
                            placeholder="Share your thoughts, questions, or experiences..."
                            value={newDiscussion.content}
                            onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Tags</label>
                          <Input 
                            placeholder="e.g., first trimester, nutrition, exercise" 
                            value={newDiscussion.tags}
                            onChange={(e) => setNewDiscussion({...newDiscussion, tags: e.target.value})}
                          />
                          <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                        </div>
                        <Button className="w-full" onClick={handleCreateDiscussion}>Post Discussion</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {filteredDiscussions.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No Discussions Found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or start a new discussion.</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <MessageSquare size={16} className="mr-2" />
                          Start Discussion
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        {/* Same content as above dialog */}
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredDiscussions.map((discussion) => (
                      <DiscussionCard 
                        key={discussion.id} 
                        discussion={discussion} 
                        onView={() => handleViewDiscussion(discussion)}
                        onLike={() => handleLikeDiscussion(discussion.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="groups" className="mt-0">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-medium">Support Groups</h2>
                  <Dialog open={newGroupModalOpen} onOpenChange={setNewGroupModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Users size={16} className="mr-2" />
                        Create Group
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create a New Group</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <label className="text-sm font-medium block mb-1">Group Name</label>
                          <Input 
                            placeholder="Enter a group name..." 
                            value={newGroup.name}
                            onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Description</label>
                          <Textarea 
                            className="min-h-24" 
                            placeholder="Describe what this group is about..."
                            value={newGroup.description}
                            onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Tags</label>
                          <Input 
                            placeholder="e.g., support, first-time moms, twins" 
                            value={newGroup.tags}
                            onChange={(e) => setNewGroup({...newGroup, tags: e.target.value})}
                          />
                          <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Cover Image URL (optional)</label>
                          <Input 
                            placeholder="https://example.com/image.jpg" 
                            value={newGroup.coverImage}
                            onChange={(e) => setNewGroup({...newGroup, coverImage: e.target.value})}
                          />
                        </div>
                        <Button className="w-full" onClick={handleCreateGroup}>Create Group</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {filteredGroups.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No Groups Found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredGroups.map((group) => (
                      <GroupCard 
                        key={group.id} 
                        group={group}
                        onJoinGroup={() => handleJoinGroup(group.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* View Discussion Modal */}
        <Dialog open={viewDiscussionModalOpen} onOpenChange={setViewDiscussionModalOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedDiscussion && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="mr-2">
                        {selectedDiscussion.author.avatar ? (
                          <AvatarImage src={selectedDiscussion.author.avatar} alt={selectedDiscussion.author.name} />
                        ) : null}
                        <AvatarFallback>{selectedDiscussion.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{selectedDiscussion.author.name}</p>
                        <p className="text-xs text-gray-500">{selectedDiscussion.date}</p>
                      </div>
                    </div>
                    {selectedDiscussion.isAnswered && (
                      <Badge variant="default" className="bg-green-100 text-green-800 border-none">
                        Answered
                      </Badge>
                    )}
                  </div>
                  <DialogTitle className="text-xl mt-4">{selectedDiscussion.title}</DialogTitle>
                </DialogHeader>

                <div className="text-gray-700 mt-2">
                  <p>{selectedDiscussion.content || selectedDiscussion.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mt-4">
                    {selectedDiscussion.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MessageSquare size={14} className="mr-1" />
                        <span>{selectedDiscussion.replies} {selectedDiscussion.replies === 1 ? 'reply' : 'replies'}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center text-gray-500 hover:text-red-500"
                        onClick={() => handleLikeDiscussion(selectedDiscussion.id)}
                      >
                        <Heart size={14} className="mr-1" />
                        <span>{selectedDiscussion.likes} likes</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Comments</h3>
                  
                  <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                    {selectedDiscussion.comments && selectedDiscussion.comments.length > 0 ? (
                      selectedDiscussion.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                {comment.author.avatar ? (
                                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                ) : null}
                                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{comment.author.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{comment.date}</span>
                            </div>
                            {comment.author.id === "currentUser" && (
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Edit size={14} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500">
                                  <Trash size={14} />
                                </Button>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Button
                              variant="ghost" 
                              size="sm" 
                              className={`flex items-center text-xs ${comment.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                              onClick={() => handleLikeComment(selectedDiscussion.id, comment.id)}
                            >
                              <ThumbsUp size={12} className="mr-1" />
                              <span>{comment.likes} likes</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Add a comment</h4>
                    <div className="flex gap-2">
                      <Textarea 
                        placeholder="Write your comment..." 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="icon" onClick={handleAddComment}>
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>
    </Layout>
  );
};

// Component definitions
const DiscussionCard: React.FC<{ 
  discussion: Discussion, 
  onView: () => void,
  onLike: () => void
}> = ({ discussion, onView, onLike }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar className="mr-2">
              {discussion.author.avatar ? (
                <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
              ) : null}
              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{discussion.author.name}</p>
              <p className="text-xs text-gray-500">{discussion.date}</p>
            </div>
          </div>
          {discussion.isAnswered && (
            <Badge variant="default" className="bg-green-100 text-green-800 border-none">
              Answered
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <CardTitle className="mb-2 text-xl">{discussion.title}</CardTitle>
        <p className="text-gray-600 line-clamp-2">{discussion.excerpt}</p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {discussion.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between border-t">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <MessageSquare size={14} className="mr-1" />
            <span>{discussion.replies} replies</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-gray-500 hover:text-red-500 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
          >
            <Heart size={14} className="mr-1" />
            <span>{discussion.likes} likes</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="text-primary" onClick={onView}>
          View Discussion
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const GroupCard: React.FC<{ 
  group: Group,
  onJoinGroup: () => void
}> = ({ group, onJoinGroup }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-36 overflow-hidden relative">
        <img 
          src={group.coverImage || "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=2070&auto=format&fit=crop"} 
          alt={group.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white text-lg font-medium">{group.name}</h3>
          <div className="flex items-center text-xs text-white/80">
            <Users size={12} className="mr-1" />
            <span>{group.members.toLocaleString()} members</span>
            <span className="mx-2">•</span>
            <Clock size={12} className="mr-1" />
            <span>Active {group.lastActive}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-4 pb-3">
        <p className="text-gray-600 text-sm line-clamp-2">{group.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {group.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <MessageSquare size={14} className="inline mr-1" /> {group.posts} posts
        </div>
        <Button 
          variant={group.isJoined ? "default" : "outline"} 
          size="sm"
          onClick={onJoinGroup}
        >
          {group.isJoined ? 'Joined' : 'Join Group'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Community;
