import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-sage-100 text-moss border border-sage-200",
        pink: "bg-blush text-petal-600 border border-petal-200",
        sky: "bg-sky-100 text-sky-700 border border-sky-200",
        moss: "bg-moss/10 text-moss border border-moss/20",
        soil: "bg-soil/10 text-soil border border-soil/20",
        outline: "border border-sage-300 text-charcoal bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
