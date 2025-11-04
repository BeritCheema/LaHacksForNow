import { motion } from 'framer-motion';
import { FaAws, FaJsSquare, FaPython, FaReact } from 'react-icons/fa';
import { SiOpenai, SiTailwindcss } from 'react-icons/si';

import Navbar from '../components/Navbar.jsx';
import Carousel from '../components/Carousel.jsx';
import Footer from '../components/Footer.jsx';
import amazonLogo from '../assets/amazon-logo.svg';

const experiences = [
  {
    title: 'Amazon Music FinTech',
    subtitle: 'SDE Intern',
    year: '2025',
    logo: amazonLogo,
    alt: 'Amazon',
  },
  {
    title: 'AI Browser Agent',
    subtitle: 'LLM + Chrome Extension',
    year: '2025',
  },
  {
    title: 'Claude Builder Club',
    subtitle: 'Founder @ UCI/SJSU',
    year: '2025',
  },
  {
    title: 'Waymark',
    subtitle: 'Location Memory App',
    year: '2024',
  },
];

const techStack = [
  { label: 'React', Icon: FaReact, color: '#61DAFB' },
  { label: 'AWS', Icon: FaAws, color: '#FF9900' },
  { label: 'OpenAI', Icon: SiOpenai, color: '#10A37F' },
  { label: 'Python', Icon: FaPython, color: '#3776AB' },
  { label: 'Tailwind', Icon: SiTailwindcss, color: '#38BDF8' },
  { label: 'JavaScript', Icon: FaJsSquare, color: '#F7DF1E' },
];

const TechStackOrbit = () => {
  const radius = 120;

  return (
    <div className="relative flex h-72 w-72 items-center justify-center md:h-80 md:w-80">
      <motion.div
        className="absolute inset-0 rounded-full border border-white/10"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
      >
        {techStack.map(({ label, Icon, color }, index) => {
          const angle = (index / techStack.length) * 360;
          return (
            <div
              key={label}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
              }}
            >
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white shadow-lg shadow-black/40 drop-shadow-[0_0_8px_rgba(0,191,255,0.25)] transition-colors duration-500 hover:drop-shadow-[0_0_12px_#00BFFF]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.1 }}
                style={{ color }}
                title={label}
              >
                <motion.div
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                  className="transition-colors duration-500 hover:text-accent"
                >
                  <Icon />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
      <div className="relative z-10 flex flex-col items-center gap-1 rounded-full border border-accent/20 bg-[#0d0d0d]/80 px-6 py-4 text-center shadow-lg shadow-black/50">
        <span className="text-xs uppercase tracking-[0.45em] text-accent/60">Orbit</span>
        <span className="text-sm font-semibold text-white/80">Berit Cheema</span>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <div className="relative z-20 w-full">
        <Navbar />
      </div>
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6">
        <section className="flex flex-col items-center gap-8 py-20 text-center">
          <div className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-accent">
              Tech Experiences
            </span>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Berit Cheema — Tech Experiences
            </h1>
            <p className="max-w-2xl text-lg text-white/70 sm:text-xl">
              Berit Cheema — Building intelligent systems, AI browser agents, and cloud-powered tools.
            </p>
          </div>
        </section>
        <section className="relative z-10 flex w-full flex-col items-center gap-6 pb-12 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.45em] text-accent/80">My Tech Stack</h2>
          <TechStackOrbit />
        </section>
        <section className="relative z-20 flex w-full justify-center pb-24">
          <Carousel experiences={experiences} />
        </section>
      </main>
      <div className="relative z-20 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
