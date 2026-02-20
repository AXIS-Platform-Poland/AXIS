import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...rest }) => {
  const base = "btn";
  const variantClass =
    variant === "primary" ? "btn-primary" :
    variant === "ghost"   ? "btn-ghost" :
                            "btn-danger";

  return (
    <button className={`${base} ${variantClass}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
