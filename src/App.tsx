import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar, ScrollProgress, LoadingScreen, Footer } from './components/layout';
import {
  Hero,
  About,
  Skills,
  Projects,
  Leadership,
  Education,
  Certifications,
  WhyHireMe,
  Contact
} from './components/sections';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen progress={loadingProgress} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ScrollProgress />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Leadership />
            <Education />
            <Certifications />
            <WhyHireMe />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
