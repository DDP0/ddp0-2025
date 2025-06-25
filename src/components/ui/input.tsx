import { TriangleAlert } from "lucide-react";
import * as React from "react";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  error?: string;
  prefix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, label, prefix, ...props }, ref) => {
    const clonedIcon = icon
      ? React.cloneElement(
          icon as React.ReactElement,
          {
            className:
              "absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4",
          } as React.SVGProps<SVGSVGElement>
        )
      : null;

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="relative">
          {icon && (
            <div className="absolute z-10 left-1 md:mt-0 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {clonedIcon}
            </div>
          )}
          {prefix && (
            <div className="absolute z-10 left-3 md:mt-0 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <span className="text-neutral-100 font-sans text-sm">
                {prefix}
              </span>
              <div className="h-4 w-[1px] bg-neutral-900 dark:bg-neutral-100"></div>
            </div>
          )}
          <input
            type={type}
            className={cn(
              "disabled:opacity-40 glass relative px-3 py-2 flex h-10 w-full font-sans rounded-xl border-2 font-normal bg-[#ffffff33] text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-300 focus-visible:outline-none disabled:cursor-not-allowed transition-all duration-500",
              icon ? "pl-10" : prefix ? "pl-12" : "pl-3",
              error
                ? "border-[#C15B5C]"
                : "border-neutral-100 enabled:hover:border-neutral-300 focus:border-neutral-050 hover:dark:border-white focus:dark:border-white",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <div className="flex gap-2 items-center text-component-error">
            <TriangleAlert className="w-4" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
