import { Button } from "@/components/ui/button";
import React from "react";
import CocoLineAdd from "./components/CocoLineAdd";
import Image from "next/image";
import { merchs } from "./data/const";
import MerchCard from "./components/MerchCard";

const carouselItems = [
  <Image src='/merch/clothes-front.webp' alt="hehe" width={'252'} height={'252'} sizes="auto"/>,
  <Image src='/merch/keychain-front.webp' alt="hehe" width={'252'} height={'252'} sizes="auto"/>,
  <Image src='/merch/pc-front.webp' alt="hehe" width={'252'} height={'252'} sizes="auto"/>,
];

const carouselItemsBack = [
  <Image src='/merch/pc-back.webp' alt="hehe" width={'252'} height={'252'} sizes="auto"/>,
  <Image src='/merch/keychain-back.webp' alt="hehe" width={'252'} height={'252'} sizes="auto"/>,
  <Image src='/merch/clothes-back.webp' alt="hehe" width={'252'} height={'252'} sizes="auto"/>,
];



export default function MerchandisePage() {
  return (
    <div className="min-h-screen text-white font-sans pt-[180px]">
      <h1 className="text-4xl font-bold text-center mb-4 font-josefin-sans">Merchandise DDP-0 2025</h1>
      <p className="text-center max-w-3xl mx-auto mb-12 font-josefin-sans">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
        vulputate eget, arcu.
      </p>

      {/* Enhanced Infinite Scrolling Carousel - Always Visible */}
      <div className="overflow-hidden w-full relative mb-[-15%]">
        <div className="relative z-10">
          <div className="absolute w-screen h-2 glass top-[20%]">
          </div>
          <div className="relative w-full">
            <div className="animate-marquee-nonstop flex space-x-6 py-4 px-2 w-max">
              {[...carouselItems, ...carouselItems, ...carouselItems].map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg flex items-center justify-center text-xl font-bold text-gray-300 flex-shrink-0"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative translate-y-[-50%]">
          <div className="absolute w-screen h-2 bg-gradient-to-t from-[#C99BDB] to-[#416EB7] top-[20%] opacity-30">
          </div>
          <div className="relative w-full">
            <div className="animate-marquee-reverse flex space-x-6 py-4 px-2 w-max">
              {[...carouselItemsBack, ...carouselItemsBack, ...carouselItemsBack].map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg flex items-center justify-center text-xl font-bold text-gray-300 flex-shrink-0"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-16">
        <Button variant={'kiwi'} className="gap-1">
          <CocoLineAdd size="size-6" className="text-white bg-transparent mr-0" fill="bg-[#00000000]"/> <p className="text-[16px]">Beli Sekarang</p>
        </Button>
      </div>

      {/* Product Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"> */}
      <div className="flex flex-row mx-auto gap-2 md:gap-8 flex-wrap justify-center">
        {merchs.map((e,i) => (
          <MerchCard data={e} key={i}/>
        ))}
      </div>
      <div className="relative h-96 w-full overflow-hidden flex flex-col justify-end scale-y-[-1]">
        <div
          className="absolute inset-0 mt-[-5%] mx-auto h-[100px] w-full rounded-full blur-[71px]"
          style={{
            background: 'linear-gradient(90deg, #000000 0%, #FEC888 5%, #9AE7B8 95%, #000000 100%)'
          }}
        />
      </div>
    </div>
  );
}
