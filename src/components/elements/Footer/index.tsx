const Footer = () => {
  return (
    <footer className="flex relative z-50 max-md:gap-4 max-md:flex-col justify-between items-center px-16 py-8 bg-black">
      <div className="md:space-y-4">
        <div className="flex items-center gap-4 w-fit font-spectral text-3xl">
          <img src="/logo-footer.webp" alt="logo" className="w-8" />
          <span className="bg-gradient-retro-wave bg-clip-text text-transparent">
            DDP-0
          </span>
        </div>
        <div className="font-josefin-sans max-md:hidden text-footnote">
          © 2025 Cosmic24. All rights reserved.
        </div>
      </div>
      <div className="flex gap-8 font-josefin-sans text-bodyLarge-mobile md:text-bodyLarge">
        <a
          className="flex gap-1"
          target="_blank"
          href="https://www.instagram.com/lifeatddp0"
        >
          <img src="/instagram.svg" alt="instagram" />
          lifeatddp0
        </a>
        <a
          className="flex gap-1"
          target="_blank"
          href="https://www.instagram.com/anak_cosmic"
        >
          <img src="/instagram.svg" alt="instagram" />
          anak_cosmic
        </a>
      </div>
      <div className="font-josefin-sans md:hidden text-footnote-mobile">
        © 2025 Cosmic24. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
