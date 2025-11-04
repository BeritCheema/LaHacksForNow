import { motion } from 'framer-motion';

const Sun = () => {
  return (
    <div className="relative z-20 flex items-center justify-center">
      <motion.div
        className="absolute h-72 w-72 rounded-full blur-3xl mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.18), transparent 65%)',
        }}
        animate={{ scale: [0.95, 1.1, 1], opacity: [0.45, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute h-56 w-56 rounded-full border border-white/10"
        style={{ boxShadow: '0 0 120px rgba(129, 140, 248, 0.25)' }}
        animate={{ rotate: [0, 160, 320, 360], scale: [0.98, 1.03, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute h-48 w-48 rounded-[40%] blur-[70px] mix-blend-screen"
        style={{
          background:
            'conic-gradient(from 90deg, rgba(14, 165, 233, 0.55), rgba(249, 115, 22, 0.3), rgba(190, 242, 100, 0.4), rgba(14, 165, 233, 0.55))',
        }}
        animate={{ rotate: [0, -120, -240, -360] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute h-44 w-44 rounded-[45%] blur-[60px] mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 40% 60%, rgba(96, 165, 250, 0.6), rgba(56, 189, 248, 0.2) 55%, transparent)',
        }}
        animate={{
          rotate: [0, 180, 360],
          scale: [1.05, 0.9, 1.05],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-200/30 bg-slate-900/70 backdrop-blur-xl"
        style={{
          boxShadow:
            '0 0 50px rgba(56, 189, 248, 0.5), inset 0 0 40px rgba(14, 165, 233, 0.35)',
        }}
        animate={{
          backgroundColor: ['rgba(15, 23, 42, 0.7)', 'rgba(2, 6, 23, 0.9)', 'rgba(15, 23, 42, 0.7)'],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.span
          className="text-xs uppercase tracking-[0.48em] text-cyan-100/70"
          animate={{ opacity: [0.35, 0.8, 0.35], letterSpacing: ['0.48em', '0.6em', '0.48em'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Cheema
        </motion.span>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute h-64 w-64 rounded-full"
        animate={{ rotate: [0, 45, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[...Array(18)].map((_, idx) => (
          <motion.span
            key={idx}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-100/60 mix-blend-screen"
            style={{
              top: `${25 + Math.sin((idx / 18) * Math.PI * 2) * 30}%`,
              left: `${25 + Math.cos((idx / 18) * Math.PI * 2) * 30}%`,
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.3,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Sun;

