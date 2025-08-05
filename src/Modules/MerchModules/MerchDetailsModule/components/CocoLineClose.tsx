export default function CocoLineClose({
  stroke = "#FFFFFF",
  className = "",
  size = "w-6 h-6",
}: {
  size?: string;
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${size}`}
    >
      <g transform="scale(1.5) translate(-4 -4)">
        <path
          d="M13.7678 10.2322L10.2322 13.7677M13.7678 13.7677L10.2322 10.2322"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
