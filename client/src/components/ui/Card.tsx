import React from "react";

type CardProps = {
  variant?: "default" | "soft" | "highlight";
  className?: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ variant = "default", className = "", children }) => {
  const base =
    variant === "highlight"
      ? "card-highlight"
      : variant === "soft"
      ? "card-soft"
      : "card";

  return <div className={`${base} ${className}`}>{children}</div>;
};

export default Card;
