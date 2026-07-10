"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AnimatedImage({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </motion.div>
  );
}
