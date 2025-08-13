import { GeneralMerchData, MerchEntry } from "./types";

export const generalData: GeneralMerchData = {
  formLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  sizeGuideImage:
    "https://i.scdn.co/image/ab67616d0000b273e27ec71c111b88de91a51600",
};

export const merchs: MerchEntry[] = [
  {
    id: "1",
    name: "Totebag",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: ["/merch/mockup.png", "/merch/totebag.webp"],
    sizes: [],
    thumbImage: "/merch/mockup.png",
    connectedMerchIds: "2 3 5 6".split(" "),
  },
  {
    id: "2",
    name: "Sticker",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: ["/merch/clothes/kaos1.png", "/merch/clothes/kaos2.png"],
    sizes: ["S", "M", "L", "XL"],
    thumbImage: "/merch/clothes/kaos1.png",
  },
  {
    id: "5",
    name: "Keychain",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
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
