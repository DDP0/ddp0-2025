'use client'

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className={`w-full p-6 bg-white/10 backdrop-blur-sm border border-white/20 text-left flex justify-between items-center hover:bg-white/15 transition-all duration-300 font-josefin-sans ${
          isOpen ? 'rounded-t-2xl' : 'rounded-2xl'
        }`}
      >
        <div className="flex items-center gap-2">
          <ChevronDown className={`w-6 h-6 text-white flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          <span className="text-lg text-white font-medium font-josefin-sans">{question}</span>
        </div>
        <ChevronDown className="w-6 h-6 text-transparent" />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-6 rounded-b-2xl bg-white/5 backdrop-blur-sm border border-white/10 border-t-0">
          <p className="text-base text-white/90 leading-relaxed font-josefin-sans">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true });

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "Bahasa pemrograman apa yang digunakan dalam DDP-0?",
      answer: "DDP-0 akan menggunakan bahasa Python, bahasa yang mudah dipahami untuk pemula dan digunakan juga dalam mata kuliah DDP-1. Jadi, kamu bisa mulai belajar dari nol dengan nyaman!"
    },
    {
      question: "Sampai mana materi yang akan diajarkan di DDP-0?",
      answer: "Materi DDP-0 akan mencakup dasar-dasar pemrograman seperti variabel, tipe data, operasi dasar, kondisional (if-else), perulangan (loop), fungsi sederhana, dan pengenalan struktur data dasar. Semua dirancang sebagai fondasi yang kuat untuk DDP-1."
    },
    {
      question: "Berapa lama program DDP-0 akan berlangsung?",
      answer: "Program DDP-0 dirancang untuk berlangsung selama 4-6 minggu dengan sesi pembelajaran 2-3 kali per minggu. Durasi ini cukup untuk memberikan pemahaman dasar yang solid tanpa terlalu membebani peserta."
    },
    {
      question: "Siapa saja yang dapat mengikuti DDP-0?",
      answer: "DDP-0 terbuka untuk semua mahasiswa baru Fasilkom UI yang merasa perlu penguatan dasar pemrograman sebelum mengambil DDP-1. Tidak ada syarat khusus selain semangat untuk belajar!"
    },
    {
      question: "Apakah peserta harus memiliki kemampuan pemrograman terlebih dahulu?",
      answer: "Tidak sama sekali! DDP-0 dirancang khusus untuk pemula yang belum pernah belajar pemrograman sebelumnya. Kami akan mulai dari konsep paling dasar hingga membangun fondasi yang kuat."
    },
    {
      question: "Seberapa sering mentoring akan diadakan?",
      answer: "Mentoring akan diadakan 2-3 kali per minggu dengan durasi 1.5-2 jam per sesi. Selain itu, tersedia juga sesi konsultasi individual untuk peserta yang membutuhkan bantuan tambahan."
    },
    {
      question: "Apakah ada biaya yang harus dikeluarkan untuk mengikuti DDP-0?",
      answer: "Program DDP-0 sepenuhnya gratis untuk semua mahasiswa Fasilkom UI. Ini merupakan program pengabdian masyarakat yang didukung oleh kakak-kakak senior dan dosen Fasilkom."
    },
    {
      question: "Apakah kegiatan DDP-0 dilakukan secara online atau offline?",
      answer: "Kegiatan DDP-0 dapat dilakukan secara hybrid (online dan offline) tergantung situasi dan kebutuhan. Kami akan memberikan fleksibilitas maksimal untuk memastikan semua peserta dapat mengikuti dengan nyaman."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-josefin-sans">
      {/* Background moon image */}
      <div 
      className="fixed inset-0 opacity-100 pointer-events-none"
      style={{
        backgroundImage: "url('moon.png')",
        backgroundSize: 'clamp(200px, 40vw, 500px) auto',
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat'
      }}
      ></div>
      
      {/* Orange gradient on bottom right */}
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-orange-500/50 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 px-8 py-12 lg:px-20 lg:py-16">
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:gap-16 lg:items-start max-w-7xl mx-auto ">
        {/* Left side - Header */}
        <div className="lg:w-1/3 lg:sticky lg:top-16">
        <div className="relative">
          {/* Rounded gradient background for FAQs text */}
          <div className="absolute -inset-8 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30 rounded-full blur-2xl"></div>
          
          <div className="relative text-left">
          <h1 className="text-6xl xl:text-7xl mb-2 font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-blue-400 bg-clip-text text-transparent font-josefin-sans leading-tight ">
          FAQs
          </h1>
          <h2 className="text-6xl xl:text-7xl mb-2 font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-blue-400 bg-clip-text text-transparent font-josefin-sans leading-tight">
          About
          </h2>
          <h3 className="text-6xl xl:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-blue-400 bg-clip-text text-transparent font-josefin-sans leading-tight">
          DDP-0
          </h3>
          </div>
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
        <div className="absolute -inset-8 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30 rounded-full blur-2xl"></div>
        
        <div className="relative text-center">
          <h1 className="text-6xl sm:text-5xl mb-1 font-bold bg-gradient-to-r from-purple-400 via-blue-300 to-blue-400 bg-clip-text text-transparent font-josefin-sans">
          FAQs
          </h1>
          <h2 className="text-6xl sm:text-5xl mb-1 font-bold bg-gradient-to-r from-purple-400 via-blue-300 to-blue-400 bg-clip-text text-transparent font-josefin-sans">
          About
          </h2>
          <h3 className="text-6xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-300 to-blue-400 bg-clip-text text-transparent font-josefin-sans">
          DDP-0
          </h3>
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