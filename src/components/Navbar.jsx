const Navbar = () => {
  return (
    <header className="w-full py-6">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6">
        <span className="text-lg font-semibold tracking-widest text-accent text-white">
          B.C.Dev
        </span>
        <a
          href="mailto:beritcheema@gmail.com"
          className="rounded-full border border-accent/60 px-4 py-2 text-sm uppercase tracking-[0.2em] text-white transition duration-300 hover:border-accent hover:bg-accent/10"
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
