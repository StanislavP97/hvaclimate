"use client";

import { type ButtonHTMLAttributes } from "react";

type BookOnlineButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function BookOnlineButton({
  children,
  onClick,
  ...props
}: BookOnlineButtonProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        window.HCPWidget?.openModal();
      }}
      {...props}
    >
      {children}
    </button>
  );
}
