import { Button } from "@/components/ui/button";
import React from "react";
import CocoLineArrow from "./components/CocoLineArrowRight";
import MerchCardLite from "./components/MerchCardLite";
import { generalData, merchs } from "../data/const";
import Link from "next/link";
import { MerchEntry } from "../data/types";
import SizeGuideDialog from "./components/SizeGuideDialog";
import ImageCarousel from "./components/ImageCarousel";

export default function MerchDetailsPage({ data }: { data: MerchEntry }) {
  return (
    <div className="min-h-screen bg-[#0E0E17] text-white px-8 py-12 font-sans pt-[140px]">
      {/* Breadcrumb */}
      <div className="text-sm mb-8">
        <Link href={"/merch"} className="flex flex-row items-center w-fit">
          <CocoLineArrow className="rotate-180" size="w-8 h-8" />{" "}
          <span className="text-gray-400">Merchandise</span> /{" "}
          <span>{data.name}</span>
        </Link>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image and Thumbnails */}
        <ImageCarousel images={data.images} />

        {/* Product Info */}
        <div>
          <div className="w-full flex flex-col max-md:items-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 font-josefin-sans">
              {data.name}
            </h1>
            <p className="text-xl md:text-4xl font-bold mb-4 font-josefin-sans">
              {data.price}
            </p>
          </div>

          <div className="mb-4">
            <p className="mb-2 font-josefin-sans font-semibold text-lg md:text-2xl">
              Ukuran
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {data.sizes.map((size, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-[#FEC888] to-[#9AE7B8] p-[0.5px] rounded-sm w-[36px] md:w-[45px] flex justify-center items-center"
                >
                  <div className="bg-[#0E0E17] rounded-sm p-2 md:p-4 text-white w-full text-center font-josefin-sans font-medium flex flex-col justify-center items-center">
                    <p className="mb-[-25%]">{size}</p>
                  </div>
                </div>
              ))}

              <SizeGuideDialog />
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-300 mb-6 text-center">
            {data.description}
          </p>

          <div className="w-full text-center pt-8">
            <Button disabled={true} variant={"kiwi"}>
              {/* <Link href={generalData.formLink} target="_blank"> */}
              Beli Sekarang
              {/* </Link> */}
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-4">Produk Terkait</h2>
        <div className="flex flex-row flex-wrap gap-4">
          {merchs
            .filter((e) => (data.connectedMerchIds ?? []).includes(e.id))
            .map((e, i) => (
              <MerchCardLite data={e} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}
