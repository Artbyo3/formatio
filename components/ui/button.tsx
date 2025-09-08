import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "default", size = "default", className = "", ...props },
    ref
  ) => {
    const variantClass =
      variant === "outline"
        ? "border border-input bg-transparent"
        : "bg-primary text-white";
    const sizeClass =
      size === "sm"
        ? "h-8 px-3 text-sm"
        : size === "lg"
        ? "h-12 px-6 text-lg"
        : "h-10 px-4 py-2";
    return (
      <button
        ref={ref}
        className={`${variantClass} ${sizeClass} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
