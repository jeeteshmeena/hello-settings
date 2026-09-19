import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";

import communityArt from "@/assets/arya-community.png.asset.json";
import { Button } from "@/components/ui/button";
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

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="50%" stopColor="#e6683c" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#igGradient)" />
      <path
        d="M12 6.96c2.15 0 2.4.01 3.25.05.78.04 1.2.17 1.48.28.37.15.64.32.92.6.28.28.45.55.6.92.11.28.24.7.28 1.48.04.85.05 1.1.05 3.25s-.01 2.4-.05 3.25c-.04.78-.17 1.2-.28 1.48-.15.37-.32.64-.6.92-.28.28-.55.45-.92.6-.28.11-.7.24-1.48.28-.85.04-1.1.05-3.25.05s-2.4-.01-3.25-.05c-.78-.04-1.2-.17-1.48-.28-.37-.15-.64-.32-.92-.6-.28-.28-.45-.55-.6-.92-.11-.28-.24-.7-.28-1.48-.04-.85-.05-1.1-.05-3.25s.01-2.4.05-3.25c.04-.78.17-1.2.28-1.48.15-.37.32-.64.6-.92.28-.28.55-.45.92-.6.28-.11.7-.24 1.48-.28.85-.04 1.1-.05 3.25-.05M12 5.08c-2.19 0-2.46.01-3.32.05-.86.04-1.45.18-1.96.39-.53.21-.98.49-1.43.94-.45.45-.73.9-.94 1.43-.21.51-.35 1.1-.39 1.96-.04.86-.05 1.13-.05 3.32s.01 2.46.05 3.32c.04.86.18 1.45.39 1.96.21.53.49.98.94 1.43.45.45.9.73 1.43.94.51.21 1.1.35 1.96.39.86.04 1.13.05 3.32.05s2.46-.01 3.32-.05c.86-.04 1.45-.18 1.96-.39.53-.21.98-.49 1.43-.94.45-.45.73-.9.94-1.43.21-.51.35-1.1.39-1.96.04-.86.05-1.13.05-3.32s-.01-2.46-.05-3.32c-.04-.86-.18-1.45-.39-1.96-.21-.53-.49-.98-.94-1.43-.45-.45-.9-.73-1.43-.94-.51-.21-1.1-.35-1.96-.39-.86-.04-1.13-.05-3.32-.05zM12 8.42a3.58 3.58 0 1 0 0 7.16 3.58 3.58 0 0 0 0-7.16zm0 5.9a2.32 2.32 0 1 1 0-4.64 2.32 2.32 0 0 1 0 4.64zm4.55-6.02a.84.84 0 1 0 0 1.68.84.84 0 0 0 0-1.68z"
        fill="white"
      />
    </svg>
  );
}

type SocialItem = {
  name: string;
  handle: string;
  icon: React.ReactNode;
  url?: string;
  bgClass: string;
};

const socials: SocialItem[] = [
  {
    name: "Telegram",
    handle: "@AryaPremiumTG",
    url: "https://t.me/AryaPremiumTG",
    icon: <TelegramIcon className="size-5 text-white" />,
    bgClass: "bg-[#229ED9]",
  },
  {
    name: "Twitter",
    handle: "@AryaPremium",
    icon: <TwitterIcon className="size-5 text-white" />,
    bgClass: "bg-foreground",
  },
  {
    name: "Facebook",
    handle: "@AryaPremium",
    icon: <FacebookIcon className="size-5 text-white" />,
    bgClass: "bg-[#1877F2]",
  },
  {
    name: "LinkedIn",
    handle: "@AryaPremium",
    icon: <LinkedInIcon className="size-5 text-white" />,
    bgClass: "bg-[#0A66C2]",
  },
  {
    name: "Instagram",
    handle: "@AryaPremium",
    icon: <InstagramIcon className="size-5" />,
    bgClass: "bg-transparent",
  },
];

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

  if (item.url) {
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

  return (
    <button type="button" className={className} onClick={(event) => event.preventDefault()}>
      {inner}
    </button>
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
          <div className="mb-5 overflow-hidden rounded-[24px] bg-card">
            <img
              src={communityArt.url}
              alt="Arya Premium Community"
              className="block h-auto w-full object-cover"
            />
            <h2 className="px-6 py-5 text-center text-[22px] font-semibold leading-tight text-card-foreground">
              Welcome to the Arya Premium community!
            </h2>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3">
            {socials.map((item, index) => (
              <div key={item.name} className={index === socials.length - 1 ? "col-span-1" : undefined}>
                <SocialButton item={item} />
              </div>
            ))}
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
