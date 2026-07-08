"use client";

import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function AnimatedImage({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <ImagePlaceholder label={label} className={className} />
    </motion.div>
  );
}
