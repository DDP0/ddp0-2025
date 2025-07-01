import Image from "next/image";

const Background = () => {
  return (
    <>
      <div className="absolute -z-10 top-0 -right-[10%] aspect-[967/515] w-[967px] max-sm:w-[500px] animate-pulse">
        <Image
          src="./aurora.svg"
          alt="Background"
          layout="fill"
          className="object-contain"
        />
      </div>
      <div className="absolute -z-10 -left-[200px] -bottom-[100px] aspect-[967/515] w-[967px] max-sm:w-[500px] animate-pulse">
        <Image
          src="./aurora2.svg"
          alt="Background"
          layout="fill"
          className="object-contain"
        />
      </div>
    </>
  );
};
export default Background;
