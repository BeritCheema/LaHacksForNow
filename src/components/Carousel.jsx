import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard.jsx';

const INITIAL_INTERVAL = 3600;
const MIN_INTERVAL = 1800;
const INTERVAL_STEP = 120;
const AUTO_RESUME_DELAY = 7000;

const Carousel = ({ experiences }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentInterval, setCurrentInterval] = useState(INITIAL_INTERVAL);
  const rotationTimeout = useRef(null);
  const resumeTimeout = useRef(null);

  const angleStep = useMemo(() => 360 / experiences.length, [experiences.length]);

  useEffect(() => {
    if (!autoRotate) {
      if (rotationTimeout.current) {
        clearTimeout(rotationTimeout.current);
      }
      return undefined;
    }

    rotationTimeout.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
      setCurrentInterval((prev) => Math.max(MIN_INTERVAL, prev - INTERVAL_STEP));
    }, currentInterval);

    return () => {
      if (rotationTimeout.current) {
        clearTimeout(rotationTimeout.current);
      }
    };
  }, [activeIndex, autoRotate, currentInterval, experiences.length]);

  useEffect(() => {
    setAutoRotate(true);
  }, []);

  useEffect(() => {
    if (autoRotate) {
      setCurrentInterval(INITIAL_INTERVAL);
    }
  }, [autoRotate]);

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) {
        clearTimeout(resumeTimeout.current);
      }
      if (rotationTimeout.current) {
        clearTimeout(rotationTimeout.current);
      }
    };
  }, []);

  const pauseAutoRotate = () => {
    setAutoRotate(false);
    if (rotationTimeout.current) {
      clearTimeout(rotationTimeout.current);
    }
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = setTimeout(() => {
      setAutoRotate(true);
      resumeTimeout.current = null;
    }, AUTO_RESUME_DELAY);
  };

  const handlePrev = () => {
    pauseAutoRotate();
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const handleNext = () => {
    pauseAutoRotate();
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  return (
    <div className="relative flex w-full max-w-4xl flex-col items-center">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 transform-gpu">
        <div className="mx-auto h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      </div>
      <motion.div
        className="relative h-72 w-full transform-gpu"
        style={{
          perspective: '1200px',
        }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: -activeIndex * angleStep }}
          transition={{ duration: 0.6, ease: [0.45, 0, 0.55, 1] }}
        >
          {experiences.map((experience, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={experience.title}
                className="absolute pointer-events-auto"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${index * angleStep}deg) translateZ(360px)`
                }}
              >
                <ExperienceCard
                  index={index}
                  isActive={isActive}
                  title={experience.title}
                  subtitle={experience.subtitle}
                  year={experience.year}
                  logo={experience.logo}
                  alt={experience.alt}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      <div className="z-20 mt-10 flex items-center gap-6">
        <button
          type="button"
          onClick={handlePrev}
          className="rounded-full border border-white/10 bg-[#1a1a1a]/80 p-3 text-white shadow shadow-black/60 transition hover:border-accent hover:bg-accent/20"
        >
          <span className="sr-only">Previous</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-6 w-6"
          >
            <path d="M15.75 19.5 8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="text-sm uppercase tracking-[0.5em] text-white/60">
          {String(activeIndex + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-full border border-white/10 bg-[#1a1a1a]/80 p-3 text-white shadow shadow-black/60 transition hover:border-accent hover:bg-accent/20"
        >
          <span className="sr-only">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-6 w-6"
          >
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
