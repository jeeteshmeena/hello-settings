import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { type ReactNode } from "react";

import communityArt from "@/assets/arya-community-cast.png.asset.json";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community | Arya Premium" },
      { name: "description", content: "Join the Arya Premium community and connect with us." },
      { property: "og:title", content: "Community | Arya Premium" },
      { property: "og:description", content: "Join the Arya Premium community and connect with us." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

type SocialItem = {
  name: string;
  handle: string;
  icon: ReactNode;
  url?: string;
  bgClass: string;
};

const telegramCommunity: SocialItem = {
  name: "Telegram",
  handle: "@AryaPremiumTG",
  url: "https://t.me/AryaPremiumTG",
  icon: <TelegramIcon className="size-5 text-white" />,
  bgClass: "bg-[#229ED9]",
};

const telegramDeveloper: SocialItem = {
  name: "Developer",
  handle: "@MeJeetX",
  url: "https://t.me/MeJeetX",
  icon: <TelegramIcon className="size-5 text-white" />,
  bgClass: "bg-[#229ED9]",
};

const links = [
  { label: "Official Website", url: "https://aryapremium.store" },
  { label: "Parent Website", url: "https://sliceurl.app" },
];

function SocialButton({ item }: { item: SocialItem }) {
  const inner = (
    <>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          item.bgClass,
        )}
      >
        {item.icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block truncate text-[15px] font-medium text-foreground">{item.name}</span>
        <span className="block truncate text-[13px] text-muted-foreground">{item.handle}</span>
      </span>
    </>
  );

  const className =
    "flex h-[56px] w-full items-center gap-3 rounded-full bg-secondary px-3 text-left transition-colors hover:bg-accent";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {inner}
    </a>
  );
}

function CommunityPage() {
  return (
    <main className="min-h-dvh bg-canvas text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-[max(14px,env(safe-area-inset-top))]">
        <header className="relative mb-5 flex h-12 items-center justify-center">
          <Link
            to="/"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="size-6" strokeWidth={1.7} />
          </Link>
          <h1 className="text-[17px] font-semibold">Community</h1>
        </header>

        <section className="animate-page-forward">
          <div className="mb-5 overflow-hidden rounded-[24px] bg-secondary">
            <img
              src={communityArt.url}
              alt="Arya Premium Community"
              className="block h-auto w-full object-cover"
            />
            <h2 className="px-6 py-5 text-center text-[22px] font-semibold leading-tight text-secondary-foreground">
              Welcome to the Arya Premium community!
            </h2>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <SocialButton item={telegramCommunity} />
            <SocialButton item={telegramDeveloper} />
          </div>

          <div className="rounded-[16px] border border-border bg-secondary p-4">
            {links.map((link) => (
              <div key={link.label} className="flex flex-col gap-1 py-2 first:pt-0 last:pb-0">
                <span className="text-[13px] text-muted-foreground">{link.label}</span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[16px] font-medium text-foreground underline underline-offset-4"
                >
                  {link.url.replace(/^https:\/\//, "")}
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground" strokeWidth={2} />
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
