import { motion } from 'framer-motion';

const ExperienceCard = ({ title, subtitle, year, index, isActive, logo, alt }) => {
  return (
    <motion.div
      className="pointer-events-auto relative flex h-56 w-80 flex-col justify-between rounded-3xl bg-[#1a1a1a] p-6 shadow-lg shadow-black/40"
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 191, 255, 0.45)' }}
      animate={{
        zIndex: isActive ? 2 : 1,
      }}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">#{index + 1}</p>
          {logo ? (
            <img
              src={logo}
              alt={alt ?? `${title} logo`}
              className="h-12 w-auto shrink-0 object-contain opacity-95"
            />
          ) : null}
        </div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/70">{subtitle}</p>
      </div>
      <div>
        <p className="text-right text-sm font-semibold text-accent">{year}</p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
