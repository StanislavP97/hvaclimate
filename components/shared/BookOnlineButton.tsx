"use client";

import { type ComponentProps, useEffect } from "react";
import { type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { type buttonVariants } from "@/components/ui/button-variants";

const HOUSECALL_PRO_TOKEN = "aa7451d2b83d45b0b709ab0328e1ca23";
const HOUSECALL_PRO_ORG_NAME = "HVA-Climate-Control-LLC";
const HOUSECALL_PRO_SCRIPT_SRC = `https://online-booking.housecallpro.com/script.js?token=${HOUSECALL_PRO_TOKEN}&orgName=${HOUSECALL_PRO_ORG_NAME}`;

// Fallback href in case the widget script hasn't attached window.HCPWidget yet (slow load, blocked, etc.)
const BOOKING_URL =
  "https://app.housecallpro.com/book/HVA-Climate-Control/7fc7493a283e44b6b849ff7d354b6ca2?v2=true";

type BookOnlineButtonProps = Omit<ComponentProps<typeof Button>, "render"> &
  VariantProps<typeof buttonVariants>;

export function BookOnlineButton({
  children,
  className,
  onClick,
  ...props
}: BookOnlineButtonProps) {
  useEffect(() => {
    if (document.querySelector(`script[src="${HOUSECALL_PRO_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = HOUSECALL_PRO_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Button
      render={
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-token={HOUSECALL_PRO_TOKEN}
          data-orgname={HOUSECALL_PRO_ORG_NAME}
        />
      }
      nativeButton={false}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (window.HCPWidget) {
          event.preventDefault();
          window.HCPWidget.openModal();
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
