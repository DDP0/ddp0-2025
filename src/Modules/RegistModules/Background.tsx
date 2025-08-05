import Image from "next/image";

const Background = () => {
  return (
    <>
      <div className="absolute -z-10 top-0 -right-[10%] aspect-[967/515] w-[967px] max-sm:w-[500px] animate-pulse">
        <Image
          src="/aurora.svg"
          alt="Background"
          layout="fill"
          className="object-contain"
        />
      </div>
      <div className="absolute -z-10 -left-[200px] -bottom-[100px] aspect-[967/515] w-[967px] max-sm:w-[500px] animate-pulse">
        <Image
          src="/aurora2.svg"
          alt="Background"
          layout="fill"
          className="object-contain"
        />
      </div>
      <svg
        className="absolute -z-100 animate-star-orbit top-24 right-1/3 w-48 h-36 opacity-70 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
        viewBox="0 0 192 144"
      >
        <defs>
          <filter id="glow1">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke="white" strokeWidth="0.75" fill="none" filter="url(#glow1)">
          <line x1="15" y1="30" x2="45" y2="15" />
          <line x1="45" y1="15" x2="75" y2="37.5" />
          <line x1="75" y1="37.5" x2="105" y2="22.5" />
          <line x1="105" y1="22.5" x2="127.5" y2="45" />
        </g>
        <g fill="white" filter="url(#glow1)">
          <circle cx="15" cy="30" r="1.5" />
          <circle cx="45" cy="15" r="2.25" />
          <circle cx="75" cy="37.5" r="1.5" />
          <circle cx="105" cy="22.5" r="1.5" />
          <circle cx="127.5" cy="45" r="2.25" />
        </g>
      </svg>

      <svg
        className="absolute -z-100 animate-constellation-move bottom-0 left-0 w-36 h-30 opacity-60 drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]"
        viewBox="0 0 144 120"
      >
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke="white" strokeWidth="0.75" fill="none" filter="url(#glow2)">
          <line x1="22.5" y1="45" x2="52.5" y2="30" />
          <line x1="52.5" y1="30" x2="37.5" y2="67.5" />
          <line x1="37.5" y1="67.5" x2="67.5" y2="75" />
        </g>
        <g fill="white" filter="url(#glow2)">
          <circle cx="22.5" cy="45" r="1.5" />
          <circle cx="52.5" cy="30" r="2.25" />
          <circle cx="37.5" cy="67.5" r="1.5" />
          <circle cx="67.5" cy="75" r="1.5" />
        </g>
      </svg>
      <svg
        className="absolute -z-100 animate-constellation-move bottom-1/3 rotate-90 left-0 w-36 h-30 opacity-60 drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]"
        viewBox="0 0 144 120"
      >
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke="white" strokeWidth="0.75" fill="none" filter="url(#glow2)">
          <line x1="22.5" y1="45" x2="52.5" y2="30" />
          <line x1="52.5" y1="30" x2="37.5" y2="67.5" />
          <line x1="37.5" y1="67.5" x2="67.5" y2="75" />
        </g>
        <g fill="white" filter="url(#glow2)">
          <circle cx="22.5" cy="45" r="1.5" />
          <circle cx="52.5" cy="30" r="2.25" />
          <circle cx="37.5" cy="67.5" r="1.5" />
          <circle cx="67.5" cy="75" r="1.5" />
        </g>
      </svg>
      <svg
        className="absolute -z-100 animate-constellation-move bottom-[20%] rotate-180 right-0 w-36 h-30 opacity-60 drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]"
        viewBox="0 0 144 120"
      >
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke="white" strokeWidth="0.75" fill="none" filter="url(#glow2)">
          <line x1="22.5" y1="45" x2="52.5" y2="30" />
          <line x1="52.5" y1="30" x2="37.5" y2="67.5" />
          <line x1="37.5" y1="67.5" x2="67.5" y2="75" />
        </g>
        <g fill="white" filter="url(#glow2)">
          <circle cx="22.5" cy="45" r="1.5" />
          <circle cx="52.5" cy="30" r="2.25" />
          <circle cx="37.5" cy="67.5" r="1.5" />
          <circle cx="67.5" cy="75" r="1.5" />
        </g>
      </svg>
    </>
  );
};
export default Background;
