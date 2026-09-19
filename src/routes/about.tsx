import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { useState } from "react";

import logoAsset from "@/assets/arya-premium-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Arya Premium" },
      { name: "description", content: "Learn about Arya Premium and read our policies." },
      { property: "og:title", content: "About Us | Arya Premium" },
      { property: "og:description", content: "Learn about Arya Premium and read our policies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" as const },
  { label: "Terms & Conditions", to: "/terms-and-conditions" as const },
  { label: "Delivery and Refund Policy", to: "/delivery-and-refund-policy" as const },
  { label: "Read Me", to: "/read-me" as const },
];

function AboutPage() {
  const [rating, setRating] = useState<number | null>(null);

  return (
    <main className="min-h-dvh bg-canvas text-foreground">
      <div className="mx-auto min-h-dvh w-full max-w-[480px] px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(14px,env(safe-area-inset-top))]">
        <Button variant="ghost" size="icon" asChild className="-ml-3 mb-2">
          <Link to="/" aria-label="Back">
            <ArrowLeft className="size-6" strokeWidth={1.7} />
          </Link>
        </Button>

        <div className="animate-page-forward">
          <h1 className="text-[24px] font-semibold leading-tight">About Us</h1>

          <div className="flex flex-col items-center pb-7 pt-8">
            <img src={logoAsset.url} alt="Arya Premium" className="size-[116px] rounded-[24px] object-cover" />
            <p className="mt-3 text-[14px] text-muted-foreground">Version 1.0</p>
          </div>

          <section className="rounded-[16px] bg-secondary p-4">
            <h2 className="text-[17px] font-medium leading-snug">Would you recommend Arya Premium to friends?</h2>
            <div className="mt-4 grid grid-cols-10 overflow-hidden rounded-md border border-input">
              {Array.from({ length: 10 }, (_, index) => index + 1).map((score) => (
                <Button
                  key={score}
                  variant="ghost"
                  size="icon"
                  aria-label={`Rate ${score} out of 10`}
                  aria-pressed={rating === score}
                  onClick={() => setRating(score)}
                  className={cn(
                    "relative h-10 w-full rounded-none border-r border-input text-[14px] font-normal last:border-r-0 hover:bg-accent",
                    rating === score && "bg-primary text-primary-foreground hover:bg-primary",
                  )}
                >
                  {rating === score ? <Check className="size-4" strokeWidth={2.5} /> : score}
                </Button>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[13px] text-muted-foreground">
              <span>Not now</span>
              <span>Of course!</span>
            </div>
          </section>

          <nav className="mt-6 border-t border-border" aria-label="Legal information">
            {legalLinks.map((item) => (
              <Button key={item.to} variant="ghost" asChild className="h-[58px] w-full justify-between rounded-none border-b border-border px-1 text-[15px] font-normal hover:bg-accent">
                <Link to={item.to}>
                  <span>{item.label}</span>
                  <ChevronRight className="size-[18px] text-muted-foreground" strokeWidth={1.8} />
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}