
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const NutritionConsultation: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Book Your Nutrition Consultation
            </h1>
            <p className="text-xl text-gray-600 mb-12 text-center">
              Get personalized nutrition guidance from our expert consultants
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Virtual Consultation</CardTitle>
                  <CardDescription>30-minute online session</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Flexible scheduling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Personalized nutrition plan</span>
                    </li>
                  </ul>
                  <Button className="w-full" onClick={() => window.location.href = '/appointments'}>
                    Book Virtual Session
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>In-Person Consultation</CardTitle>
                  <CardDescription>45-minute clinic visit</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Comprehensive assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Physical measurements</span>
                    </li>
                  </ul>
                  <Button className="w-full" onClick={() => window.location.href = '/appointments'}>
                    Book Clinic Visit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NutritionConsultation;
