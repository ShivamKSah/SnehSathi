
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Mother of two',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'The AI risk assessment identified my gestational diabetes early, allowing for timely intervention. This platform has been a lifesaver for me and my baby.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Patel',
    role: 'Healthcare worker',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'As an ASHA worker in rural Rajasthan, the offline mode and voice features help me provide better care to expectant mothers in areas with limited connectivity.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ananya Gupta',
    role: 'First-time mother',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'The nutritional guidance adjusted perfectly to my dietary preferences and local food availability. The personalized recommendations made a huge difference.',
    rating: 4,
  },
  {
    id: 4,
    name: 'Dr. Vikram Mehta',
    role: 'OB-GYN Specialist',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
    quote: 'I recommend this platform to all my patients. The AI risk predictions are impressively accurate and the government scheme matcher helps my patients access the care they need.',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from mothers, healthcare workers, and doctors using our platform.
            </p>
          </div>

          <div className="relative w-full max-w-7xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-healthcare-soft-blue/30 to-healthcare-pale-pink/30 p-1">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl">

                <div className="text-primary opacity-30 mb-6">
                  <Quote size={48} />
                </div>

                <div>
                  {testimonials.map((testimonial, index) =>
                    index === currentIndex && (
                      <div 
                        key={testimonial.id}
                        className="transition-opacity duration-500"
                      >
                        <blockquote className="text-xl md:text-2xl text-gray-700 mb-8">
                          {testimonial.quote}
                        </blockquote>

                        <div className="flex items-center">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-sm"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{testimonial.name}</div>
                            <div className="text-gray-500 text-sm">{testimonial.role}</div>
                          </div>
                          <div className="ml-auto">
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < testimonial.rating ? "" : "text-gray-300"}>★</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {currentIndex + 1} of {testimonials.length} testimonials
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={prevTestimonial}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors duration-200"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextTestimonial}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors duration-200"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots for mobile/alternate navigation */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-primary scale-125" : "bg-gray-300"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default TestimonialsSection;
