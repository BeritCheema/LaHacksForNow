const Footer = () => {
  return (
    <footer className="w-full py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-6 text-center text-sm text-white/50">
        <p>© {new Date().getFullYear()} Berit Cheema. Crafted for futuristic tech explorations.</p>
        <p className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-white/30">
          <span>React</span>
          <span className="text-accent">•</span>
          <span>Tailwind CSS</span>
          <span className="text-accent">•</span>
          <span>Framer Motion</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
