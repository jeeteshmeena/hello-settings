import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { type ReactNode } from "react";

import communityArt from "@/assets/arya-community.png.asset.json";
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
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0c-.019 0-.038 0-.056 0zm4.962 7.224c.086-.008.18.012.261.063.08.05.132.13.164.216.06.16.092.332.084.504l-.004.092-1.146 7.32c-.054.3-.192.56-.406.74-.214.18-.49.27-.79.252-.248-.015-.5-.09-.742-.206l-.066-.032-2.13-1.106-1.12.812c-.21.152-.44.252-.68.288-.12.018-.24.018-.358 0-.176-.026-.346-.09-.492-.188-.146-.098-.268-.228-.356-.38l-.032-.058-.456-.94-1.672-.868c-.27-.14-.438-.352-.488-.608-.05-.256.01-.528.168-.754.1-.142.232-.258.386-.34.154-.082.328-.13.506-.138l.098.002 7.586.608.99-3.68c.024-.09.074-.174.144-.238.07-.064.158-.106.252-.118.052-.006.104-.002.154.012zm-5.652 4.45l.884 1.824.5-1.626-1.384-.198z" />
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

const telegram: SocialItem = {
  name: "Telegram",
  handle: "@AryaPremiumTG",
  url: "https://t.me/AryaPremiumTG",
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

          <div className="mb-5">
            <SocialButton item={telegram} />
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
