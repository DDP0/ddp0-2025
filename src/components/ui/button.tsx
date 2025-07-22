import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex font-josefine-sans border border-[#ffffff59] items-center justify-center gap-3 max-md:gap-2 whitespace-nowrap rounded-xl transition-all disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-neutral-050 active:text-neutral-300 disabled:text-neutral-500",
  {
    variants: {
      variant: {
        default:
          "bg-card/10 hover:bg-card-hover/30 active:bg-card-pressed/50 disabled:bg-card-disabled/50",
        blue: "bg-[#81beff4d] hover:bg-[#b3dfff4d] active:bg-[#ccecff4d] disabled:bg-[#e5f6ff4d]",
        lilac:
          "bg-[#c99bdb4d] hover:bg-[#f6d5ff4d] active:bg-[#fde5ff4d] disabled:bg-[#ffeefe4d]",
        yellow:
          "bg-[#fec8884d] hover:bg-[#fee4b74d] active:bg-[#feefcf4d] disabled:bg-[#fef8e74d]",
        retro:
          "bg-gradient-retro-button hover:bg-gradient-retro-button-hover active:bg-gradient-retro-button-pressed disabled:bg-gradient-retro-button-disabled",
        kiwi: "bg-gradient-kiwi-button hover:bg-gradient-kiwi-button-hover active:bg-gradient-kiwi-button-pressed disabled:bg-gradient-retro-kiwi-disabled",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "py-2 px-4 has-[>svg]:px-3",
        sm: "py-1 px-2 has-[>svg]:px-3",
        lg: "py-3 px-6 has-[>svg]:px-3",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <div>
      <Comp
        data-slot="button"
        className={cn(
          "cursor-pointer glass text-[18px] max-sm:text-[16px] font-josefin-sans",
          buttonVariants({ variant, size, className })
        )}
        {...props}
      />
    </div>
  );
}

export { Button, buttonVariants };
