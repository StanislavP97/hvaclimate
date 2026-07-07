import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-navy px-6 py-24 text-center text-footer-heading">
      <p className="text-8xl font-extrabold text-primary-accent sm:text-9xl">
        404
      </p>
      <h1 className="mt-8 text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-footer-foreground">
        We apologize for any inconvenience.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href="/"
          className={buttonVariants({ className: "rounded-full px-8" })}
        >
          Back to homepage
        </a>
        <a
          href="/contact"
          className={buttonVariants({
            className: "rounded-full bg-background px-8 text-foreground hover:bg-background/90",
          })}
        >
          Contact us
        </a>
      </div>
    </div>
  );
}
