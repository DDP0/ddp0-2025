import Link from "next/link";
import { MerchEntry } from "../../data/types";

export default function MerchCard({ data }: { data: MerchEntry }) {
  return (
    <Link href={`/merch/${data.id}`}>
      <div
        key={data.name}
        className="bg-gradient-to-br h-full from-[#C99BDB] to-[#416EB7] p-[0.5px] rounded-xl max-w-[240px] md:max-w-[350px] hover:cursor-pointer"
      >
        <div className="bg-[#101010] h-full rounded-xl p-6 text-white border border-gray-700 glass">
          <div className="h-34 md:h-40 bg-[#BEBEBE] mb-4 rounded-md overflow-hidden flex items-center justify-center">
            <img
              src={data.thumbImage ?? "/image-not-found.png"}
              alt={`${data.name} image`}
              className="object-contain h-full w-full"
            ></img>
          </div>
          <h3 className="md:text-lg font-semibold mb-2">{data.name}</h3>
          <p className="text-sm text-white mb-4">{data.description}</p>
          <p className="font-semibold md:font-bold text-white">{data.price}</p>
        </div>
      </div>
    </Link>
  );
}
