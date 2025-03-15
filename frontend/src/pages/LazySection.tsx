import React, { useEffect, useState } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
}

const LazySection: React.FC<LazySectionProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Load the section when it is 10% visible
    );

    const element = document.getElementById('lazy-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div id="lazy-section">
      {isVisible ? children : <div>Loading...</div>} {/* Display loading indicator before section appears */}
    </div>
  );
};

export default LazySection;
