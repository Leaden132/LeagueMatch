import type { ReactNode, HTMLAttributes } from "react";
import styles from "./card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "win" | "loss";
}

export function Card({ children, variant = "default", className, ...props }: CardProps) {
  const cls = [styles.card, styles[variant], className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      {children}
    </div>
  );
}
