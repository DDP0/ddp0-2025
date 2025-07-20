import React from "react";
import Image from "next/image";

interface EmptyStateToDoProps {
  message?: string;
  imageSrc?: string;
}

export const EmptyStateToDo: React.FC<EmptyStateToDoProps> = ({
  message = "Belum ada tugas untuk dikerjakan",
  imageSrc = "/kucing.svg",
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-white p-4">
      <div className="w-64 h-64 relative mb-3">
        <Image
          src={imageSrc}
          alt="Kucing Astronot"
          fill
          className="object-contain"
          priority
        />
      </div>
      <p className="text-lg font-josefin-sans font-[500]">{message}</p>
    </div>
  );
};
