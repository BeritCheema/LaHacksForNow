import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { FaAws, FaJava, FaJsSquare, FaPython, FaReact } from 'react-icons/fa';
import { SiDocker, SiOpenai, SiPytorch, SiTypescript } from 'react-icons/si';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Sun from '../components/Sun.jsx';
import planetGammaSatellite from '../assets/planet-gamma-satellite.svg';

const randomRange = (min, max) => Math.random() * (max - min) + min;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PlanetGammaSatelliteCard = ({ satellite, index }) => {
  const controls = useAnimationControls();
  const Component = satellite.href ? motion.a : motion.button;

  useEffect(() => {
    let isActive = true;

    const loop = async () => {
      await sleep(index * 200);
      while (isActive) {
        await controls.start({
          x: randomRange(-22, 22),
          y: randomRange(-18, 18),
          rotate: randomRange(-8, 8),
          transition: { duration: 3, ease: 'easeInOut' },
        });
      }
    };

    loop();

    return () => {
      isActive = false;
      controls.stop();
    };
  }, [controls, index]);

  return (
    <Component
      {...(satellite.href
        ? { href: satellite.href, target: '_blank', rel: 'noreferrer noopener' }
        : { type: 'button' })}
      className="group absolute flex w-40 flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-4 text-left text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050118]"
      style={satellite.style}
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={controls}
      whileHover={{ translateY: -6, scale: 1.05 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[0.6rem] uppercase tracking-[0.32em] text-white/60">{satellite.label}</span>
        <img src={planetGammaSatellite} alt="Satellite icon" className="h-6 w-6 opacity-70 transition group-hover:opacity-100" />
      </div>
      <span className="text-[0.55rem] uppercase tracking-[0.32em] text-white/40">{satellite.hint}</span>
      <span className="text-base font-semibold uppercase tracking-[0.25em]">{satellite.href ? 'View Mission' : 'Open Slot'}</span>
    </Component>
  );
};

const techStack = [
  { label: 'React', Icon: FaReact, color: '#61DAFB' },
  { label: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { label: 'JavaScript', Icon: FaJsSquare, color: '#F7DF1E' },
  { label: 'Python', Icon: FaPython, color: '#3776AB' },
  { label: 'Java', Icon: FaJava, color: '#EA2D2E' },
  { label: 'Docker', Icon: SiDocker, color: '#0db7ed' },
  { label: 'Pytorch', Icon: SiPytorch, color: '#4F46E5' },
  { label: 'OpenAI', Icon: SiOpenai, color: '#10A37F' },
  { label: 'AWS', Icon: FaAws, color: '#FF9900' },
];

const TechStackOrbit = () => {
  const radiusX = 260; // Wider horizontal spread
  const radiusY = 160; // Taller ellipse for varied paths
  const rotationSpeed = 12; // Faster rotation (was 28)
  const orbitConfigs = useMemo(
    () =>
      techStack.map(() => ({
        radiusXFactor: 0.6 + Math.random() * 1.1, // 0.6x – 1.7x for horizontal variance
        radiusYFactor: 0.6 + Math.random() * 1.0, // 0.6x – 1.6x for vertical variance
      })),
    []
  );

  return (
    <div className="relative flex h-72 w-72 items-center justify-center md:h-80 md:w-80">
      <div className="absolute inset-0">
        {techStack.map(({ label, Icon, color }, index) => {
          const baseAngle = (index / techStack.length) * 360;
          const { radiusXFactor, radiusYFactor } = orbitConfigs[index];
          const iconRadiusX = radiusX * radiusXFactor;
          const iconRadiusY = radiusY * radiusYFactor;

          // Generate keyframes for full elliptical orbit
          const keyframes = Array.from({ length: 37 }, (_, i) => {
            const angle = baseAngle + i * 10;
            const radian = (angle * Math.PI) / 180;
            return {
              x: iconRadiusX * Math.cos(radian),
              y: iconRadiusY * Math.sin(radian),
            };
          });

          const initialPosition = keyframes[0];
          const keyframeTimes = keyframes.map((_, i) => i / (keyframes.length - 1));

          return (
            <motion.div
              key={label}
              className="absolute left-1/2 top-1/2"
              style={{ zIndex: 10, x: initialPosition.x, y: initialPosition.y }}
              animate={{
                x: keyframes.map((frame) => frame.x),
                y: keyframes.map((frame) => frame.y),
              }}
              transition={{
                duration: rotationSpeed,
                repeat: Infinity,
                ease: 'linear',
                times: keyframeTimes,
              }}
            >
              {/* Comet trail - multiple trailing elements positioned along orbit */}
              {[...Array(8)].map((_, trailIndex) => {
                const trailOffset = (trailIndex + 1) * 4.5; // Degrees behind the icon
                const trailBaseAngle = baseAngle - trailOffset;

                // Generate keyframes for trail elliptical orbit
                const trailKeyframes = Array.from({ length: 37 }, (_, i) => {
                  const angle = trailBaseAngle + i * 10;
                  const radian = (angle * Math.PI) / 180;
                  return {
                    x: iconRadiusX * Math.cos(radian),
                    y: iconRadiusY * Math.sin(radian),
                  };
                });

                const trailInitial = trailKeyframes[0];

                return (
                  <motion.div
                    key={`trail-${label}-${trailIndex}`}
                    className="absolute left-0 top-0 pointer-events-none"
                    style={{
                      x: trailInitial.x,
                      y: trailInitial.y,
                      scale: Math.max(0.3, 0.85 - trailIndex * 0.1),
                      opacity: Math.max(0.05, 0.5 - trailIndex * 0.055),
                      zIndex: 1,
                    }}
                    animate={{
                      x: trailKeyframes.map((frame) => frame.x),
                      y: trailKeyframes.map((frame) => frame.y),
                    }}
                    transition={{
                      duration: rotationSpeed,
                      repeat: Infinity,
                      ease: 'linear',
                      times: trailKeyframes.map((_, i) => i / (trailKeyframes.length - 1)),
                    }}
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl"
                      style={{
                        color: color,
                        filter: `blur(${trailIndex * 2}px) brightness(${1.2 + trailIndex * 0.15})`,
                        boxShadow: `0 0 ${trailIndex * 4}px ${color}40`,
                      }}
                    >
                      <Icon />
                    </div>
                  </motion.div>
                );
              })}

              {/* Main icon */}
              
            </motion.div>
          );
        })}
      </div>
      <Sun />
    </div>
  );
};

const Home = () => {
  const planetGammaSatellites = useMemo(
    () => [
      {
        id: 'gamma-orbiter-alpha',
        label: 'Satellite Alpha',
        hint: 'Browser Extension',
        style: { top: '45%', left: '12%' },
        href: 'https://github.com/BeritCheema/BrowserExtension',
      },
      {
        id: 'gamma-orbiter-beta',
        label: 'Satellite Beta',
        hint: 'Mission Control Aka GitHub',
        style: { top: '1%', right: '12%' },
        href: 'https://github.com/BeritCheema',
      },
      {
        id: 'gamma-orbiter-gamma',
        label: 'Satellite Gamma',
        hint: 'Add project here',
        style: { top: '8%', left: '6%' },
      },
      {
        id: 'gamma-orbiter-delta',
        label: 'Satellite Delta',
        hint: 'Add project here',
        style: { top: '40%', right: '6%' },
      },
      {
        id: 'gamma-lunar-node',
        label: 'Satellite LinkedIn',
        hint: 'LinkedIn — Connect',
        style: { top: '10%', left: '50%', transform: 'translateX(-50%)' },
        href: 'https://www.linkedin.com/in/berit-cheema/',
      },
    ],
    []
  );

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <div className="relative z-20 w-full">
        <Navbar />
      </div>
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 pt-12">
        <section className="flex flex-col items-center gap-8 py-28 text-center">
        </section>
        <section className="relative z-10 flex w-full flex-col items-center gap-6 pb-60 text-center">
          <h2 className="text-sm font-semibold font-comic tracking-[0.45em] text-white text-accent/80">tech i like to use</h2>
          <TechStackOrbit />
        </section>

        <motion.section
          className="relative z-20 mt-52 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#05070d] via-[#07111f] to-[#05070d] px-6 py-16 text-left shadow-[0_40px_120px_-60px_rgba(59,130,246,0.45)] sm:px-10 sm:py-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-br from-[#0f172a] via-[#1f2937] to-[#0a0f1f] blur-3xl opacity-60"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
            animate={{ rotate: [0, 12, -10, 0], scale: [1.02, 1.05, 1] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <motion.span
                className="inline-flex w-fit items-center gap-3 rounded-full border border-orange-300/40 bg-orange-200/10 px-4 py-1 text-xs uppercase tracking-[0.45em] text-orange-200/90"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                Planet Amazon
              </motion.span>
              <motion.h3
                className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.75rem]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 1, ease: 'easeOut' }}
              >
                FinTech Atmosphere Engineer
              </motion.h3>
              <motion.p
                className="max-w-2xl text-base text-white/70 sm:text-lg"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
              >
                Docked on Planet Amazon to architect financial experiences for millions of listeners.
                Navigated orbital risk systems, stabilized payments nebulae, and boosted transaction
                velocity across cloud galaxies.
              </motion.p>
              <motion.div
                className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.35em] text-white/70"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: 'easeOut' }}
              >
                <span className="rounded-full border border-white/10 px-4 py-2 text-white/80">
                  SDE Intern · 2025
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2 text-white/70">
                  Music FinTech
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2 text-white/60">
                  DynamoDB · Step Functions · CDK
                </span>
              </motion.div>
            </div>

            <motion.div
              className="relative mx-auto flex h-[240px] w-[240px] items-center justify-center rounded-full border border-orange-200/30 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#030712]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <motion.div
                className="absolute inset-6 rounded-full border border-yellow-500/30"
                animate={{ rotate: [0, 160, 320, 360] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-12 rounded-full border border-orange-400/30"
                animate={{ rotate: [0, -180, -360] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-200/90 via-yellow-400/80 to-white/80 shadow-[0_0_40px_rgba(255,176,0,0.5)]"
                animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-lg font-semibold uppercase tracking-[0.28em] text-black/70">
                  AMZN
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="relative z-10 mt-44 w-full rounded-3xl border border-white/20 bg-transparent px-4 pb-28 pt-16 text-center shadow-[0_55px_180px_-90px_rgba(129,140,248,0.65)] sm:px-12"
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        >
          <div className="relative z-10 flex flex-col items-center gap-4 text-white">
            <motion.span
              className="inline-flex items-center gap-3 rounded-full border border-indigo-300/40 bg-indigo-200/10 px-4 py-1 text-xs uppercase tracking-[0.45em] text-indigo-200/80"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              Planet Gamma
            </motion.span>
            <motion.h3
              className="text-3xl font-bold tracking-[0.35em] text-white sm:text-4xl"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 1, ease: 'easeOut' }}
            >
              Orbital Hangar Deck
            </motion.h3>
            <motion.p
              className="max-w-2xl text-sm text-white/70 sm:text-base"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 1, ease: 'easeOut' }}
            >
              A full crescent planet rising from the cosmic horizon. Slot your flagship missions into the
              satellites patrolling Planet Gamma’s stratosphere.
            </motion.p>
          </div>

          <div className="relative z-10 mt-16 flex w-full max-w-5xl flex-col items-center">
            <div className="relative h-[520px] w-full max-w-4xl">
              <motion.div
                className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/30 bg-gradient-to-b from-[#4338ca] via-[#1f1d60] to-[#0f172a] shadow-[0_-70px_190px_rgba(129,140,248,0.35)]"
                animate={{
                  scale: [1, 1.04, 1],
                  rotate: [0, 2.5, -2.5, 0],
                  boxShadow: [
                    '0 -70px 190px rgba(129,140,248,0.35)',
                    '0 -90px 240px rgba(139,92,246,0.42)',
                    '0 -70px 190px rgba(129,140,248,0.35)',
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 border-dashed"
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />

              {planetGammaSatellites.map((sat, idx) => (
                <PlanetGammaSatelliteCard key={sat.id} satellite={sat} index={idx} />
              ))}

              <motion.div
                className="pointer-events-none absolute inset-x-4 bottom-28 h-20 rounded-full bg-gradient-to-b from-transparent via-[#1f1b5f]/35 to-transparent"
                animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.04, 1] }}
                transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.section>
      </main>
      <div className="relative z-20 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
