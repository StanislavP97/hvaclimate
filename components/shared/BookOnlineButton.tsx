"use client";

import { type ComponentProps } from "react";
import { type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { type buttonVariants } from "@/components/ui/button-variants";

type BookOnlineButtonProps = Omit<ComponentProps<typeof Button>, "render"> &
  VariantProps<typeof buttonVariants>;

export function BookOnlineButton({
  children,
  onClick,
  ...props
}: BookOnlineButtonProps) {
  return (
    <Button
      onClick={(event) => {
        onClick?.(event);
        window.HCPWidget?.openModal();
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
