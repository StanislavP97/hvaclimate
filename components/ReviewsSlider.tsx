"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GooglePlaceReview } from "@/types/reviews";

const MAX_QUOTE_LENGTH = 150;

function relativeTime(unixSeconds: number): string {
  const seconds = Math.max(0, Date.now() / 1000 - unixSeconds);
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = days / 365;

  if (years >= 1) {
    const n = Math.floor(years);
    return `${n} year${n > 1 ? "s" : ""} ago`;
  }
  if (months >= 1) {
    const n = Math.floor(months);
    return `${n} month${n > 1 ? "s" : ""} ago`;
  }
  if (days >= 1) {
    const n = Math.floor(days);
    return `${n} day${n > 1 ? "s" : ""} ago`;
  }
  if (hours >= 1) {
    const n = Math.floor(hours);
    return `${n} hour${n > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

function truncate(text: string): string {
  if (text.length <= MAX_QUOTE_LENGTH) return text;
  return `${text.slice(0, MAX_QUOTE_LENGTH).trimEnd()}...`;
}

function initialFor(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

function ReviewCard({ review }: { review: GooglePlaceReview }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-[0_2px_10px_rgba(13,27,42,0.04)]">
      <div className="flex items-center gap-3">
        {review.profile_photo_url ? (
          <Image
            src={review.profile_photo_url}
            alt={review.author_name}
            width={36}
            height={36}
            className="size-9 shrink-0 rounded-full"
          />
        ) : (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
            {initialFor(review.author_name)}
          </span>
        )}
        <div>
          <p className="text-sm font-bold text-foreground">{review.author_name}</p>
          <div className="flex items-center gap-1.5 text-xs text-body">
            <span className="text-primary-accent">
              {Array.from({ length: review.rating }, () => "★").join("")}
            </span>
            <span>&middot; {relativeTime(review.time)}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-body">
        {truncate(review.text)}
      </p>

      <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-body">
        <span className="text-[13px] font-bold text-[#4285F4]">G</span>
        Posted on Google
      </div>
    </div>
  );
}

export function ReviewsSlider({ reviews }: { reviews: GooglePlaceReview[] }) {
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updatePerView = () => setPerView(window.innerWidth >= 768 ? 3 : 1);
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const pageCount = Math.max(1, Math.ceil(reviews.length / perView));

  useEffect(() => {
    setIndex((prev) => Math.min(prev, pageCount - 1));
  }, [pageCount]);

  const isFirst = index === 0;
  const isLast = index >= pageCount - 1;

  const goPrev = () => setIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setIndex((prev) => Math.min(pageCount - 1, prev + 1));

  const visibleReviews = reviews.slice(index * perView, index * perView + perView);

  return (
    <div className="mx-auto mt-12 max-w-7xl px-6">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous reviews"
          className="rounded-lg border border-gray-300 p-2 text-gray-500 transition-all duration-200 hover:border-primary-accent hover:bg-blue-50 hover:text-primary-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={isLast}
          aria-label="Next reviews"
          className="rounded-lg border border-gray-300 p-2 text-gray-500 transition-all duration-200 hover:border-primary-accent hover:bg-blue-50 hover:text-primary-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-4 overflow-hidden">
        <div
          key={index}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          style={{
            animation: "reviews-slide-in 300ms ease-out",
          }}
        >
          {visibleReviews.map((review) => (
            <ReviewCard key={`${review.author_name}-${review.time}`} review={review} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes reviews-slide-in {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
