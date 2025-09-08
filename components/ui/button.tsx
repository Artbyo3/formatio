import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "default", size = "default", className = "", ...props },
    ref
  ) => {
    const variantClass =
      variant === "outline"
        ? "border border-input bg-transparent"
        : variant === "ghost"
        ? "bg-transparent hover:bg-muted"
        : variant === "secondary"
        ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        : variant === "destructive"
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-primary text-white";
    const sizeClass =
      size === "sm"
        ? "h-8 px-3 text-sm"
        : size === "lg"
        ? "h-12 px-6 text-lg"
        : size === "icon"
        ? "h-10 w-10"
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

// Export button variants for use in other components
export const buttonVariants = (variant: string = "default", size: string = "default") => {
  const variantClass =
    variant === "outline"
      ? "border border-input bg-transparent"
      : variant === "ghost"
      ? "bg-transparent hover:bg-muted"
      : variant === "secondary"
      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      : variant === "destructive"
      ? "bg-red-500 text-white hover:bg-red-600"
      : "bg-primary text-white";
  
  const sizeClass =
    size === "sm"
      ? "h-8 px-3 text-sm"
      : size === "lg"
      ? "h-12 px-6 text-lg"
      : size === "icon"
      ? "h-10 w-10"
      : "h-10 px-4 py-2";
  
  return `${variantClass} ${sizeClass}`;
};

export { Button };
