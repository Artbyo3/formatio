import * as React from "react";

// Simplified Badge without external utilities

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "destructive" | "secondary";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className, children, ...rest }, ref) => {
    const variantClass =
      variant === "outline"
        ? "border border-gray-300 bg-transparent"
        : variant === "destructive"
        ? "bg-red-500 text-white"
        : variant === "secondary"
        ? "bg-gray-100 text-gray-700"
        : "bg-gray-200 text-gray-800";
    return (
      <span
        ref={ref}
        className={`${variantClass} px-2 py-1 rounded ${className || ""}`}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
