import { buttonVariants } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

interface ServiceHeroProps {
  title: string;
  description: string;
  primaryCtaLabel: string;
  imageLabel: string;
}

export function ServiceHero({
  title,
  description,
  primaryCtaLabel,
  imageLabel,
}: ServiceHeroProps) {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold tracking-wide text-primary-accent uppercase">
          Licensed, Bonded, &amp; Insured in Washington &amp; Oregon
        </p>
        <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-body">{description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/contact"
            className={buttonVariants({
              variant: "outline",
              className: "rounded-full px-6",
            })}
          >
            Learn More
          </a>
          <a
            href="/contact"
            className={buttonVariants({ className: "rounded-full px-6" })}
          >
            {primaryCtaLabel}
          </a>
        </div>
      </div>
      <ImagePlaceholder
        label={imageLabel}
        className="h-72 w-full rounded-2xl lg:h-96"
      />
    </section>
  );
}
