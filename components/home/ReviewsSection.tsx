"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import googleReviews from "@/data/google-reviews.json";
import type { GoogleReview } from "@/types/reviews";

const REVIEWS = googleReviews as GoogleReview[];
const AUTO_ADVANCE_MS = 4000;

function initialsFor(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-[0_2px_10px_rgba(13,27,42,0.04)]">
      <div className="flex gap-0.5 text-primary-accent">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
          {initialsFor(review.name)}
        </span>
        <p className="text-sm font-bold text-foreground">{review.name}</p>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const updatePerView = () => setPerView(window.innerWidth >= 640 ? 3 : 1);
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const pageCount = Math.max(1, REVIEWS.length - perView + 1);

  useEffect(() => {
    if (isPaused || pageCount <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % pageCount);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [isPaused, pageCount]);

  const goTo = (next: number) => {
    setIndex(((next % pageCount) + pageCount) % pageCount);
  };

  const visibleReviews = REVIEWS.slice(index, index + perView);
  if (visibleReviews.length < perView) {
    visibleReviews.push(...REVIEWS.slice(0, perView - visibleReviews.length));
  }

  return (
    <section className="bg-background py-19">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-[13px] font-bold tracking-[0.14em] text-primary-accent uppercase">
          Reviews
        </p>
        <h2 className="mt-3 text-4xl font-extrabold text-foreground">
          What our clients say
        </h2>
        <p className="mt-4 text-body">
          We treat every project with the care that deserves a 5 star rating,
          we hope to serve you with the same service quality.
        </p>
      </div>

      <div
        className="mx-auto mt-12 max-w-7xl px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative flex items-center gap-4">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous review"
            className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted sm:flex"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="grid flex-1 grid-cols-1 gap-6.5 overflow-hidden sm:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleReviews.map((review, i) => (
                <motion.div
                  key={`${index}-${review.name}-${i}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={i > 0 ? "hidden sm:block" : undefined}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next review"
            className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted sm:flex"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {pageCount > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                onClick={() => goTo(i)}
                className={`size-2 rounded-full transition-colors ${
                  i === index ? "bg-primary-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Button render={<Link href="/contact" />} nativeButton={false} variant="cta-orange">
          Get Your Home Serviced
        </Button>
      </div>
    </section>
  );
}
