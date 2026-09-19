import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main className="min-h-dvh bg-canvas text-foreground">
      <article className="mx-auto min-h-dvh w-full max-w-[480px] px-5 pb-[max(32px,env(safe-area-inset-bottom))] pt-[max(14px,env(safe-area-inset-top))]">
        <Button variant="ghost" size="icon" asChild className="-ml-3 mb-2">
          <Link to="/about" aria-label="Back to About Us">
            <ArrowLeft className="size-6" strokeWidth={1.7} />
          </Link>
        </Button>

        <div className="animate-page-forward">
          <h1 className="text-[24px] font-semibold leading-tight">{title}</h1>
          <p className="mt-3 text-[14px] leading-6 text-muted-foreground">{intro}</p>

          <div className="mt-7 space-y-7">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-[16px] font-semibold text-foreground">{section.title}</h2>
                <div className="mt-2 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[14px] leading-6 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}