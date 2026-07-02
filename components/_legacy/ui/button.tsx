"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-moss text-white hover:bg-moss-light shadow-soft-md hover:shadow-glow-leaf hover:-translate-y-0.5 active:translate-y-0",
        primary:
          "bg-moss text-white hover:bg-moss-light shadow-soft-md hover:shadow-glow-leaf hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-petal-400 text-white hover:bg-petal-500 shadow-soft-md hover:shadow-glow-petal hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-moss/30 text-moss bg-transparent hover:bg-sage-100 hover:border-moss/50 hover:-translate-y-0.5",
        ghost:
          "text-charcoal hover:bg-sage-100 hover:text-moss",
        link: "text-moss underline-offset-4 hover:underline",
        subtle:
          "bg-sage-100 text-moss hover:bg-sage-200",
      },
      size: {
        default: "h-11 px-7 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
