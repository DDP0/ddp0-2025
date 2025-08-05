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
    sizes: "M".split(" "),
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
      "/merch/stickers/ular stress.png",
    ],
    sizes: "".split(" "),
    thumbImage: "/merch/stickers/Sticker.png",
  },
  {
    id: "3",
    name: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: [
      "https://awsimages.detik.net.id/community/media/visual/2024/05/28/serial-anime-sakamoto-days-1.webp?w=700&q=90",
      "https://cdn.wallpapersafari.com/11/5/6l2KIf.jpg",
    ],
    sizes: "S M L XL".split(" "),
    thumbImage:
      "https://awsimages.detik.net.id/community/media/visual/2024/05/28/serial-anime-sakamoto-days-1.webp?w=700&q=90",
  },
  {
    id: "4",
    name: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: [],
    sizes: "S M L XL".split(" "),
    thumbImage: undefined,
  },
  {
    id: "5",
    name: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: [],
    sizes: "S M L XL".split(" "),
    thumbImage: undefined,
  },
  {
    id: "6",
    name: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: [],
    sizes: "S M L XL".split(" "),
    thumbImage: undefined,
  },
];
