import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-b-lg overflow-hidden",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center [&>svg]:mr-2 h-full justify-center whitespace-nowrap px-20 max-md:px-8 max-sm:px-6 py-2 font-josefin-sans text-body-mobile md:text-bodyLarge ring-offset-white transition-all focus-visible:outline-hidden focus-visible:ring-6 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none border-t-[3px] border-transparent data-[state=active]:border-retro-wave data-[state=active]:shadow-xs data-[state=active]:bg-opacity-40  dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
      "data-[state=active]:before:absolute data-[state=active]:before:top-0 data-[state=active]:before:left-0 data-[state=active]:before:w-full data-[state=active]:before:h-full data-[state=active]:before:bg-tabs data-[state=active]:before:z-0",
      "data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-full data-[state=active]:after:bg-[linear-gradient(to_top,rgba(255,255,255,1),rgba(255,255,255,0.0))] dark:data-[state=active]:after:bg-[linear-gradient(to_top,rgba(21,21,21,21),rgba(21,21,21,0.0))] text-opacity-100 data-[state=active]:after:z-0",
      className
    )}
    {...props}
  >
    <div className="flex items-center justify-center gap-2 z-1">
      {props.children}
    </div>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
