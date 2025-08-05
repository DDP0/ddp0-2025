import { GeneralMerchData, MerchEntry } from "./types";

export const generalData: GeneralMerchData = {
  formLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  sizeGuideImage: "https://i.scdn.co/image/ab67616d0000b273e27ec71c111b88de91a51600"
}

export const merchs: MerchEntry[] = [
  {
    id: "1",
    name: "Produk 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rp123.567",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh4wXEj4Miielwf75FEXvD8BkDEPvasWDv3w&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPxixIA7vIugwQ1P9OFHyGd0kR4SstjyvQzA&s"],
    sizes: "S M L XL XXL 3XL".split(" "),
    thumbImage: "https://a.storyblok.com/f/178900/960x540/c27d89a269/sakamoto-days-hero.png/m/filters:quality(95)format(webp)",
    connectedMerchIds: "2 3 5 6".split(" ")
  },
  {
    id: "2",
    name: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tFyU39xOXUudrnPaYVomwRcF6aP0TdG7Uw&s"],
    sizes: "S M L XL".split(" "),
    thumbImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tFyU39xOXUudrnPaYVomwRcF6aP0TdG7Uw&s"
  },
  {
    id: "3",
    name: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: ["https://awsimages.detik.net.id/community/media/visual/2024/05/28/serial-anime-sakamoto-days-1.webp?w=700&q=90", "https://cdn.wallpapersafari.com/11/5/6l2KIf.jpg"],
    sizes: "S M L XL".split(" "),
    thumbImage: "https://awsimages.detik.net.id/community/media/visual/2024/05/28/serial-anime-sakamoto-days-1.webp?w=700&q=90"
  },
  {
    id: "4",
    name: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: [],
    sizes: "S M L XL".split(" "),
    thumbImage: ""
  },
  {
    id: "5",
    name: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: [],
    sizes: "S M L XL".split(" "),
    thumbImage: ""
  },
  {
    id: "6",
    name: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta et tortor id placerat. Etiam congue\nconsequat turpis, eget semper erat lobortis eleifend.",
    price: "Rpxxx.xxx",
    images: [],
    sizes: "S M L XL".split(" "),
    thumbImage: ""
  },
]
