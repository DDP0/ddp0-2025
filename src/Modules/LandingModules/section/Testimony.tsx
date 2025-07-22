import TestimonialCard from "@/components/elements/TestimonialsCard";
import Image from "next/image";
const testimonies = [
  {
    img: "/testimony/faiq.jpg",
    name: "Ahmad Faiq",
    desc: "Ilmu Komputer '24",
    testimony:
      "DDP-0 IS FUN!! apalagi ddp-0 ini sangat membantu bagi gw yang 0 besar dalam dunia perkodingan saat pertama kali masuk pacil dan gw juga bisa dapet insight dari mentor gw yang asik 😆",
  },
  {
    img: "/testimony/farrel.jpg",
    name: "Farrel Arrayyan",
    desc: "Sistem Informasi '24",
    testimony:
      "Sebagai orang yang belum punya basic programming sebelumnya, DDP-0 membantu banget untuk persiapan kuliah! Materinya dijelasin dari nol oleh mentor-mentor yang asik dan gampang untuk dipahami. Tugas-tugasnya juga seru banget jadi gak terasa membebani. Selain belajar programming, DDP-0 juga bisa jadi tempat kenalan sama temen-temen seangkatan maupun kating kalian lho guys!",
  },
  {
    img: "/testimony/azka.png",
    name: "Muhammad Azka",
    desc: "Ilmu Komputer '24",
    testimony:
      "Jujur klo semisal gw gaikut ddp0, ga kebayang seberapa keteterannya nanti gw pas ddp1. Buat maba2 fasilkom, ikut ddp0 ✨is a must ✨karena kalian bakal ngerasain gambaran medan tempur ddp, jadi di ddp0 tempat buat warm up tipis2 ajah. DDP itu bukan tentang cara bisa ngoding pake suatu bahasa, tp bagaimana kalian problem solving pake bahasa yg dipelajari. Tapi jangan takut, mentor2 siap bikin kalian lebih siap menghadapi DDP1.",
  },
  {
    img: "/testimony/anya.jpg",
    name: "Anya Aleena",
    desc: "Ilmu Komputer '24",
    testimony:
      "Buat orang yang belum pernah ngoding sebelumnya, DDP-0 ngebantu banget buat dapetin feel pas ngoding, jadi 'click' gitu. Terus juga relasinya oke banget, kating yang dulu jadi mentorku masih sering bantuin waktu DDP-1 dan bahkan jadi dekat sampai sekarang!!",
  },
  {
    img: "/testimony/rama.png",
    name: "Walyul'ahdi Maulana",
    desc: "Sistem Informasi '24",
    testimony:
      "Pengalaman yang sangat seru dan bermanfaat buat dapetin spoiler matkul DDP-1, alhasil ga begitu kaget dan kesusahan ke depannya. Btw aku dulu dapet mentor yg keren dan baik banget, seneng rasanya dapet apresiasi bahkan buat hal sekecil ini.",
  },
  {
    img: "/testimony/hanif.jpeg",
    name: "Hanif Awiyoso",
    desc: "Ilmu Komputer '24",
    testimony:
      "DDP0 ini ngebantu bangett sihh, karena materi yang diajarin mentor2 mostly cover materi DDP1! Jadi bagi kalian yang ikut DDP0, dijamin ga bakal kewalahan dgn DDP1!!",
  },
  {
    img: "/testimony/nathanael.jpg",
    name: "Nathanael Leander",
    desc: "Ilmu Komputer '24",
    testimony:
      "DDP-0 itu seru banget! Mentor-mentornya asik dan sabar ngajarin dari nol, jadi buat yang belum pernah ngoding sebelumnya, pasti bisa catch up. Selain itu, bisa kenalan sama temen-temen baru juga, jadi makin seru! DDP-0 bikin aku lebih siap buat DDP-1 dan kuliah di Fasilkom UI.",
  },
  {
    img: "/testimony/nadhif.jpeg",
    name: "Muhammad Nadhif",
    desc: "Ilmu Komputer '24",
    testimony:
      "Terima kasih banyak DDP0 sudah membantu saya dalam belajar programming dari 0, karena saya baru punya laptop dan belum belajar sama sekali saat itu. Seandainya saya tidak ikut DDP0, mungkin saya tidak akan lulus DDP1 dan DDP2 ❤️",
  },
  {
    img: "/testimony/raida.png",
    name: "Raida Khoyyara",
    desc: "Ilmu Komputer '24",
    testimony:
      "Buat orang yang sama sekali gapunya basic coding even gatau kenapa milih jurusan ini, DDP0 HELPS ME A LOT. Di DDP0 belajarnya juga lebih enjoy karena yang mentoring kating dan lebih enak nanya nanya nya, dapet temen baru, wawasan baru tentang fasilkom jugaa.",
  },
  {
    img: "/testimony/andrew.png",
    name: "Andrew Panjaitan",
    desc: "Sistem Informasi '24",
    testimony:
      "Seru banget, Selain DDP-0 menjadi pendorong pemahaman ku di python (izin pamer ddp-1 gw jadi A 😎), bisa bonding dengan kating dan teman-teman seangkatann, shoutout to kelompok 045 kecee 🔥",
  },
  {
    img: "/testimony/jessica.jpg",
    name: "Jessica Tandra",
    desc: "Ilmu Komputer '24",
    testimony:
      "Kalo ditanya nyesel ga ikut ddp-0?, jujur... NGGA SAMA SEKALIII. Sesuai namanya, DDP-0 ya tentunya kalian akan diajarin ngoding bnr2 dari 0. Selain itu, semua sistem tugas, quiz maupun lab-nya mirip banget sama DDP 1. So DDP-0 ini akan sangattt membantu kalian nantinyaa. Oh iya kalian juga bisa kenalan sama temen baru + kating jugaa. Tunggu apa lagi? yukk buruan joinnn! (jangan sampe fomo yaa :P)",
  },
];

const TestimonyPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center overflow-hidden py-16 pb-40 relative">
      <Image
        src="/aurora_full.svg"
        alt="aurora"
        width={1000}
        height={1000}
        className="absolute bottom-30 sm:bottom-0 md:-bottom-30 right-0 z-0 pointer-events-none animate-pulse opacity-80"
      />

      {/* Section Title */}
      <h1 className="text-h2 md:text-h1 z-10 font-josefin-sans pb-16 text-center">
        Testimony
      </h1>

      <div className="relative w-full z-10 pb-24">
        <div
          className="flex animate-marquee gap-8 sm:gap-16"
          style={{ width: "max-content" }}
        >
          {[...testimonies, ...testimonies, ...testimonies].map((item, idx) => (
            <div
              key={idx}
              className="w-[280px] hover:scale-110 sm:w-[300px] duration-1000 md:w-[320px] flex-shrink-0"
            >
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonyPage;
