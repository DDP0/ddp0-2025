import React from "react";
import type { IconProps } from "./interface";

export const Message: React.FC<IconProps> = ({ className, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className={`${className} ${size}`}
    >
      <path
        d="M14.341 21.668L33.6084 35.4335C37.432 38.1652 42.5684 38.1652 46.3919 35.4335L65.6593 21.668M9.61814 50.5042C7.90528 43.6062 7.90528 36.3938 9.61814 29.4958C11.8603 20.4661 19.0202 13.4845 28.102 11.4721L29.6149 11.1368C36.4555 9.62106 43.5448 9.62106 50.3854 11.1368L51.8983 11.4721C60.9801 13.4845 68.14 20.4661 70.3822 29.4959C72.095 36.3938 72.095 43.6062 70.3822 50.5042C68.14 59.5339 60.9801 66.5155 51.8983 68.5279L50.3854 68.8632C43.5448 70.3789 36.4555 70.3789 29.6149 68.8632L28.102 68.5279C19.0202 66.5155 11.8603 59.5339 9.61814 50.5042Z"
        stroke="url(#paint0_linear_524_189)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_524_189"
          x1="8.3335"
          y1="10"
          x2="80.1764"
          y2="23.0103"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEC888" />
          <stop offset="1" stopColor="#9AE7B8" />
        </linearGradient>
      </defs>
    </svg>
  );
};
