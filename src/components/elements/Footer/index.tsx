import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-16 py-8 bg-black text-bodyLarge">
      <div className="space-y-2">
        <div className="flex items-center gap-4 w-fit font-spectral text-3xl">
          <img src="/logo-footer.webp" alt="logo" className="w-8" />
          <span className="bg-gradient-retro-wave bg-clip-text text-transparent">
            DDP-0
          </span>
        </div>
        <div className="font-josefin-sans">
          © 2025 Cosmic24. All rights reserved.
        </div>
      </div>
      <div className="flex gap-8 font-josefin-sans">
        <div className="flex gap-1">
          <img src="/instagram.svg" alt="instagram" />
          lifeatddp0
        </div>
        <div className="flex gap-1">
          <img src="/instagram.svg" alt="instagram" />
          anak_cosmic
        </div>
      </div>
    </footer>
  );
};

export default Footer;
