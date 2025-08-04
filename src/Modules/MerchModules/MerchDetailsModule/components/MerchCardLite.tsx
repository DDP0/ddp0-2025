import Link from "next/link";
import { MerchEntry } from "../../data/types";

export default function MerchCardLite({data}: {data: MerchEntry}) {
  return (
    <Link href={`/merch/${data.id}`}>
      <div key={data.name} className="bg-gradient-to-br from-[#C99BDB] to-[#416EB7] p-[0.5px] rounded-xl w-[170px] md:w-[200px] hover:cursor-pointer">
        <div className="bg-[#101010] rounded-xl p-6 text-white border border-gray-700 glass">
          <div className="h-34 md:h-40 bg-[#BEBEBE] mb-4 rounded-md overflow-hidden flex items-center justify-center">
            <img src={data.thumbImage} alt={`${data.name} image`} className="object-cover h-full w-full"></img>
          </div>
          <h3 className="md:text-lg font-semibold mb-2">{data.name}</h3>
          <p className="font-semibold md:font-bold text-white">{data.price}</p>
        </div>
      </div>
    </Link>
  )
}