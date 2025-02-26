import { useState, useEffect, useRef, useMemo } from 'react';
import PlaqueComponent from './PlaqueComponent';

interface Deceased {
  id: number;
  name: string;
  dateOfDeath: string;
  description?: string;
}

interface MemorialListProps {
  deceased: Deceased[];
}

const ITEMS_PER_SLIDE = 20;

const MemorialList = ({ deceased }: MemorialListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Group deceased records into slides of 20 items each
  const slideGroups = useMemo(() => {
    const groups = [];
    for (let i = 0; i < deceased.length; i += ITEMS_PER_SLIDE) {
      groups.push(deceased.slice(i, i + ITEMS_PER_SLIDE));
    }
    return groups.length > 0 ? groups : [[]]; // Ensure at least one group
  }, [deceased]);
  
  // Calculate total slides
  const totalSlides = slideGroups.length;

  // Auto-advance to the next slide every 10 seconds
  useEffect(() => {
    const advanceSlide = () => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
    };

    // Start the timer
    autoPlayRef.current = setInterval(advanceSlide, 10000);
    
    // Clean up on unmount
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [totalSlides]);

  // Manual navigation functions
  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
  };

  return (
    <div className="flex flex-col h-full p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">In Loving Memory</h2>
      
      <div className="flex-1 relative overflow-hidden">
        {/* Carousel Container */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          data-testid="memorial-slider"
          data-current-index={currentIndex} // For testing purposes
        >
          {slideGroups.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto p-2">
              {group.map((person) => (
                <div key={person.id} className="h-full">
                  <PlaqueComponent
                    name={person.name}
                    dateOfDeath={person.dateOfDeath}
                    description={person.description}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Navigation Controls */}
        {totalSlides > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-2 py-2">
            <button 
              onClick={goToPrevious}
              className="p-1 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer"
              aria-label="Previous memorial group"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Indicators */}
            <div className="flex space-x-1 items-center">
              {slideGroups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide group ${index + 1}`}
                  className={`w-2 h-2 rounded-full ${
                    currentIndex === index ? 'bg-gray-700' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="p-1 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer"
              aria-label="Next memorial group"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemorialList;