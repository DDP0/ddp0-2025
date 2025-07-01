"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "inline-flex rounded-md bg-gray-200 dark:bg-gray-700 p-1",
        className
      )}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  children: React.ReactNode;
}) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 select-none",
        "radix-state-checked:bg-indigo-600 radix-state-checked:text-white",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
