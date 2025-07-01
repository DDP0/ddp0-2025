"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className={`w-full p-4 bg-[#ffffff1a] glass border border-neutral-050/20 text-left flex justify-between items-center hover:bg-white/15 transition-all duration-500 font-josefin-sans ${
          isOpen ? "rounded-t-xl" : "rounded-xl"
        }`}
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={`w-6 h-6 text-white flex-shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          <span className="text-lg text-white font-medium font-josefin-sans">
            {question}
          </span>
        </div>
        <ChevronDown className="w-6 h-6 text-transparent" />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 rounded-b-2xl bg-card/10 glass border border-neutral-050/20 border-t-0">
          <p className="text-base text-white/90 leading-relaxed font-josefin-sans">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "Bahasa pemrograman apa yang digunakan dalam DDP-0?",
      answer:
        "DDP-0 akan menggunakan bahasa Python, bahasa yang mudah dipahami untuk pemula dan digunakan juga dalam mata kuliah DDP-1. Jadi, kamu bisa mulai belajar dari nol dengan nyaman!",
    },
    {
      question: "Sampai mana materi yang akan diajarkan di DDP-0?",
      answer:
        "Materi DDP-0 akan mencakup dasar-dasar pemrograman seperti variabel, tipe data, operasi dasar, kondisional (if-else), perulangan (loop), fungsi sederhana, dan pengenalan struktur data dasar. Semua dirancang sebagai fondasi yang kuat untuk DDP-1.",
    },
    {
      question: "Berapa lama program DDP-0 akan berlangsung?",
      answer:
        "Program DDP-0 dirancang untuk berlangsung selama 4-6 minggu dengan sesi pembelajaran 2-3 kali per minggu. Durasi ini cukup untuk memberikan pemahaman dasar yang solid tanpa terlalu membebani peserta.",
    },
    {
      question: "Siapa saja yang dapat mengikuti DDP-0?",
      answer:
        "DDP-0 terbuka untuk semua mahasiswa baru Fasilkom UI yang merasa perlu penguatan dasar pemrograman sebelum mengambil DDP-1. Tidak ada syarat khusus selain semangat untuk belajar!",
    },
    {
      question:
        "Apakah peserta harus memiliki kemampuan pemrograman terlebih dahulu?",
      answer:
        "Tidak sama sekali! DDP-0 dirancang khusus untuk pemula yang belum pernah belajar pemrograman sebelumnya. Kami akan mulai dari konsep paling dasar hingga membangun fondasi yang kuat.",
    },
    {
      question: "Seberapa sering mentoring akan diadakan?",
      answer:
        "Mentoring akan diadakan 2-3 kali per minggu dengan durasi 1.5-2 jam per sesi. Selain itu, tersedia juga sesi konsultasi individual untuk peserta yang membutuhkan bantuan tambahan.",
    },
    {
      question:
        "Apakah ada biaya yang harus dikeluarkan untuk mengikuti DDP-0?",
      answer:
        "Program DDP-0 sepenuhnya gratis untuk semua mahasiswa Fasilkom UI. Ini merupakan program pengabdian masyarakat yang didukung oleh kakak-kakak senior dan dosen Fasilkom.",
    },
    {
      question: "Apakah kegiatan DDP-0 dilakukan secara online atau offline?",
      answer:
        "Kegiatan DDP-0 dapat dilakukan secara hybrid (online dan offline) tergantung situasi dan kebutuhan. Kami akan memberikan fleksibilitas maksimal untuk memastikan semua peserta dapat mengikuti dengan nyaman.",
    },
  ];

  return (
    <div className="min-h-screen text-white relative font-josefin-sans">
      {/* Background moon image */}
      <div className="absolute aspect-square w-[38rem] max-lg:w-[25rem] max-sm:w-[15rem] bottom-0 left-0">
        <Image
          src="/moon.png"
          alt="Moon Background"
          fill
          className="object-contain"
        />
      </div>

      {/* Orange gradient on bottom right */}
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-islan-milde-500 rounded-full blur-3xl pointer-events-none z-0 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 px-8 py-12 lg:px-20 lg:py-16">
        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:gap-16 lg:items-start max-w-7xl mx-auto ">
          {/* Left side - Header */}
          <div className="lg:w-1/3">
            <div className="relative">
              {/* Rounded gradient background for FAQs text */}
              <div className="absolute -inset-8 bg-gradient-retro-wave rounded-full blur-[150px] animate-pulse"></div>

              <h1 className="bg-clip-text text-end text-transparent bg-gradient-retro-wave text-h1 max-lg:text-h2 max-sm:text-h1-mobile">
                FAQs
                <br /> About
                <br /> DDP-0
              </h1>
            </div>
          </div>

          {/* Right side - FAQ Items */}
          <div className="lg:w-2/3">
            <div className="space-y-0">
              {faqData.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems[index]}
                  onToggle={() => toggleItem(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden max-w-4xl mx-auto">
          {/* Header with gradient background - centered on mobile */}
          <div className="mb-12 relative">
            {/* Rounded gradient background for FAQs text */}
            <div className="absolute -inset-8 bg-gradient-retro-wave rounded-full blur-[150px] animate-pulse"></div>

            <div className="relative text-center">
              <h1 className="bg-clip-text text-transparent bg-gradient-retro-wave text-h1 max-lg:text-h2 max-sm:text-h1-mobile">
                FAQs
                <br /> About
                <br /> DDP-0
              </h1>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-0">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openItems[index]}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
