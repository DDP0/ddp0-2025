import { GeneralMerchData, MerchEntry } from "./types";

export const generalData: GeneralMerchData = {
  formLink: "https://ristek.link/MerchandiseDDP0",
  sizeGuideImage: "/merch/sizechart.png",
};

export const merchs: MerchEntry[] = [
  {
    id: "1",
    name: "Totebag",
    description:
      "Tas kanvas berkualitas tinggi dengan desain DDP-0 yang stylish dan fungsional. Sempurna untuk membawa laptop, buku, dan kebutuhan sehari-hari dengan gaya yang unik.",
    price: "Rp50.000",
    images: ["/merch/mockup.png", "/merch/totebag.webp"],
    sizes: [],
    thumbImage: "/merch/mockup.png",
    connectedMerchIds: "2 3 5 6".split(" "),
  },
  {
    id: "2",
    name: "Sticker",
    description:
      "Koleksi stiker eksklusif DDP-0 dengan berbagai desain lucu dan kreatif. Tahan air dan berkualitas tinggi, cocok untuk laptop, botol minum, atau apapun yang ingin kamu hias!",
    price: "Rp10.000/lembar",
    images: [
      "/merch/stickers/24_7 debugging.png",
      "/merch/stickers/code.png",
      "/merch/stickers/coffee right meow.png",
      "/merch/stickers/gedbar.png",
      "/merch/stickers/gedlam.png",
      "/merch/stickers/jakun.png",
      "/merch/stickers/kepala maskot.png",
      "/merch/stickers/kopi.png",
      "/merch/stickers/laptop kebakaran.png",
      "/merch/stickers/laptop.png",
      "/merch/stickers/logo ddp 0.png",
      "/merch/stickers/pacilian.png",
      "/merch/stickers/panda tepar.png",
      "/merch/stickers/purrogramming.png",
      "/merch/stickers/sate pacil.png",
      "/merch/stickers/sleep.png",
      "/merch/stickers/Sticker.png",
      "/merch/stickers/pc-back.webp",
      "/merch/stickers/pc-front.webp",
    ],
    sizes: [],
    thumbImage: "/merch/stickers/Sticker.png",
  },
  {
    id: "3",
    name: "Notebook",
    description:
      "Notebook premium dengan desain cover yang elegan dan kertas berkualitas tinggi. Ideal untuk mencatat kode, algoritma.",
    price: "Rp25.000",
    images: [
      "/merch/book/cover blkg.png",
      "/merch/book/cover depan.png",
      "/merch/book/cover keseluruhan.png",
      "/merch/book/spine.png",
    ],
    sizes: [],
    thumbImage: "/merch/book/cover keseluruhan.png",
  },
  {
    id: "4",
    name: "Kaos",
    description:
      "Kaos cotton combed berkualitas tinggi dengan desain DDP-0 yang keren dan nyaman dipakai. Tersedia dalam berbagai ukuran untuk style casual yang programming-friendly.",
    price: "Rpxxx.xxx",
    images: ["/merch/clothes/kaos1.png", "/merch/clothes/kaos2.png"],
    sizes: ["S", "M", "L", "XL"],
    thumbImage: "/merch/clothes/kaos1.png",
  },
  {
    id: "5",
    name: "Keychain",
    description:
      "Gantungan kunci lucu dengan karakter DDP-0 yang menggemaskan. Bahan akrilik berkualitas tinggi yang tahan lama, sempurna sebagai aksesoris atau hadiah untuk fellow programmers.",
    price: "Rp10.000/pcs",
    images: [
      "/merch/keychain/Balon.png",
      "/merch/keychain/Code.png",
      "/merch/keychain/Kucing tidur.png",
      "/merch/keychain/Menaiki ular.png",
      "/merch/keychain/Ular.png",
      "/merch/keychain/keychain-back.webp",
      "/merch/keychain/keychain-front.webp",
    ],
    sizes: [],
    thumbImage: "/merch/keychain/keychain-front.webp",
  },
];
