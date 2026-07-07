import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground",
        className
      )}
    >
      <ImageIcon className="size-8" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
