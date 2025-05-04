
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Articles: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Maternal Health Articles
            </h1>
            <p className="text-xl text-gray-600">
              Expert-written articles on pregnancy, childbirth, and maternal wellness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface Article {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  url: string; // Added URL field for article links
}

const articles: Article[] = [
  {
    id: 1,
    title: "Essential Nutrients During Pregnancy: What You Need to Know",
    excerpt: "A comprehensive guide to the vitamins and minerals that are crucial for a healthy pregnancy and fetal development.",
    coverImage: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop",
    author: {
      name: "Dr. Sarah Johnson",
      title: "OB-GYN Specialist",
    },
    date: "March 15, 2023",
    readTime: "8 min read",
    category: "Nutrition",
    tags: ["nutrition", "vitamins", "first trimester"],
    url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" // WHO healthy diet link
  },
  {
    id: 2,
    title: "Managing Pregnancy Symptoms in Each Trimester",
    excerpt: "Learn about common pregnancy symptoms and effective strategies to manage them throughout your pregnancy journey.",
    coverImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Dr. Emily Chen",
      title: "Maternal Health Specialist",
    },
    date: "April 2, 2023",
    readTime: "10 min read",
    category: "Health",
    tags: ["symptoms", "wellness", "self-care"],
    url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy/art-20046767" // Mayo Clinic link
  },
  {
    id: 3,
    title: "Safe Exercise During Pregnancy: A Trimester-by-Trimester Guide",
    excerpt: "Discover safe and effective exercise routines tailored for each stage of pregnancy to maintain fitness and health.",
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Maria Rodriguez",
      title: "Prenatal Fitness Instructor",
    },
    date: "February 18, 2023",
    readTime: "12 min read",
    category: "Fitness",
    tags: ["exercise", "physical activity", "wellness"],
    url: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy" // ACOG link
  },
  {
    id: 4,
    title: "Understanding Prenatal Testing: What Tests to Expect and When",
    excerpt: "A comprehensive overview of common prenatal tests, their purposes, and when they are typically performed during pregnancy.",
    coverImage: "Understanding Prenatal Testing.png",
    author: {
      name: "Dr. James Wilson",
      title: "Maternal-Fetal Medicine Specialist",
    },
    date: "May 7, 2023",
    readTime: "15 min read",
    category: "Medical",
    tags: ["testing", "healthcare", "prenatal care"],
    url: "https://www.nichd.nih.gov/health/topics/preconceptioncare/conditioninfo/testing" // NIH link
  },
  {
    id: 5,
    title: "Preparing Your Home for a Newborn: Essential Checklist",
    excerpt: "Get ready for your baby's arrival with this comprehensive guide to preparing your home and gathering essential items.",
    coverImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Lisa Parker",
      title: "Child Safety Specialist",
    },
    date: "June 12, 2023",
    readTime: "9 min read",
    category: "Preparation",
    tags: ["newborn", "baby gear", "third trimester"],
    url: "https://www.healthychildren.org/English/ages-stages/baby/diapers-clothing/Pages/Baby-Nursery-Equipment.aspx" // Healthy Children link
  },
  {
    id: 6,
    title: "Mental Health During Pregnancy: Managing Anxiety and Depression",
    excerpt: "Understand the emotional challenges of pregnancy and learn effective strategies for maintaining mental wellbeing.",
    coverImage: "Mental Health.png",
    author: {
      name: "Dr. Rachel Green",
      title: "Perinatal Psychiatrist",
    },
    date: "July 3, 2023",
    readTime: "11 min read",
    category: "Mental Health",
    tags: ["mental wellness", "anxiety", "emotional health"],
    url: "https://www.nimh.nih.gov/health/publications/perinatal-depression" // NIMH link
  },
];

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const handleReadClick = () => {
    window.open(article.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300 animate-fade-in h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.coverImage} 
          alt={article.title}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-white/80 text-gray-800 backdrop-blur-sm">
          {article.category}
        </Badge>
      </div>
      
      <CardContent className="flex-grow pt-6">
        <h3 className="text-xl font-medium text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">{article.author.name}</span>
          <span className="mx-2">•</span>
          <span>{article.author.title}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {article.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 border-t flex justify-between items-center text-sm">
        <div className="text-gray-500 flex items-center">
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span>{article.readTime}</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary"
          onClick={handleReadClick}
        >
          Read
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Articles;
