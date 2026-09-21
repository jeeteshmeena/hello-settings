import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  Headset,
  Heart,
  HelpCircle,
  ImagePlus,
  Lightbulb,
  MessagesSquare,
  Pencil,
  Settings,
  Ticket,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { useRef, useState, type ChangeEvent, type ComponentType, type ReactNode } from "react";

import avatarUrl from "@/assets/profile-avatar.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile | Arya Premium" },
      { name: "description", content: "View your Arya Premium profile, referrals and support options." },
      { property: "og:title", content: "Profile | Arya Premium" },
      { property: "og:description", content: "View your Arya Premium profile, referrals and support options." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

type Subpage = "detail" | "how" | "coupons" | "support" | "feedback" | "faq";
type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const profileUid = "1602208751";
const joinedDate = "September 2026";
const supportUrl = "https://t.me/MeJeetX";

const faqItems = [
  {
    q: "What is Arya Premium?",
    a: "Arya Premium is a membership that unlocks premium stories, early episode access and an ad-free reading experience.",
  },
  {
    q: "How do I change my currency or language?",
    a: "Open Settings from the top-right gear icon and pick your preferred currency, language, appearance and region.",
  },
  {
    q: "How do referrals work?",
    a: "Invite friends with your referral link and earn commission on their purchases. The referral program is launching soon.",
  },
  {
    q: "How do I contact support?",
    a: "Use Help & Support to reach our team on Telegram. We usually reply within a day.",
  },
];

function ProfileRow({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: IconType;
  label: string;
  value?: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="grid h-[58px] w-full grid-cols-[28px_minmax(0,1fr)_auto_18px] rounded-none border-b border-border px-1 text-left hover:bg-accent"
    >
      <Icon className="size-[21px] text-foreground" strokeWidth={1.8} />
      <span className="min-w-0 truncate text-[14px] font-normal">{label}</span>
      <span className="max-w-28 truncate text-[13px] font-normal text-muted-foreground">{value}</span>
      <ChevronRight className="size-[18px] text-foreground" strokeWidth={1.8} />
    </Button>
  );
}

function SubpageShell({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <div className="pt-0">
      <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back" className="-ml-3 mb-2">
        <ArrowLeft className="size-6" strokeWidth={1.7} />
      </Button>
      <h1 className="mb-4 text-[24px] font-semibold leading-tight">{title}</h1>
      {children}
    </div>
  );
}

function TelegramCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary p-5">
      <h2 className="text-[16px] font-semibold">{title}</h2>
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{description}</p>
      <a
        href={supportUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 grid h-[48px] w-full place-items-center rounded-[10px] bg-primary text-[15px] font-medium text-primary-foreground transition-colors hover:opacity-90"
      >
        Chat on Telegram
      </a>
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const [page, setPage] = useState<Subpage | null>(null);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [profileName, setProfileName] = useState("Jeetesh Meena");
  const [draftName, setDraftName] = useState("Jeetesh Meena");
  const [avatarSrc, setAvatarSrc] = useState(avatarUrl);
  const [draftAvatar, setDraftAvatar] = useState(avatarUrl);
  const [editSheet, setEditSheet] = useState<"name" | "avatar" | null>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const openPage = (next: Subpage) => {
    setDirection("forward");
    setPage(next);
  };

  const closePage = () => {
    setDirection("back");
    setPage(null);
  };

  const copyUid = async () => {
    try {
      await navigator.clipboard.writeText(profileUid);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast("Unable to copy");
    }
  };

  const openNameEditor = () => {
    setDraftName(profileName);
    setEditSheet("name");
  };

  const openAvatarEditor = () => {
    setDraftAvatar(avatarSrc);
    setEditSheet("avatar");
  };

  const chooseAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    setDraftAvatar(nextUrl);
  };

  const saveName = () => {
    const nextName = draftName.trim();
    if (!nextName) return;
    setProfileName(nextName);
    setEditSheet(null);
    showToast("Name updated");
  };

  const saveAvatar = () => {
    setAvatarSrc(draftAvatar);
    setEditSheet(null);
    showToast("Profile photo updated");
  };

  return (
    <main className="min-h-dvh bg-canvas text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-[max(14px,env(safe-area-inset-top))]">
        <div key={page ?? "profile"} className={direction === "back" ? "animate-page-back" : "animate-page-forward"}>
          {page === "detail" ? (
            <SubpageShell title="" onBack={closePage}>
              <div className="-mt-6 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={avatarSrc}
                    alt="Profile avatar"
                    width={816}
                    height={816}
                    className="size-24 rounded-full bg-[#b9a8d9] object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Change avatar"
                    onClick={openAvatarEditor}
                    className="absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full border border-border bg-popover text-foreground shadow-dialog"
                  >
                    <Pencil className="size-4" strokeWidth={1.8} />
                  </Button>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <h2 className="text-[21px] font-semibold">{profileName}</h2>
                  <Button variant="ghost" size="icon" onClick={openNameEditor} aria-label="Edit name" className="size-8">
                    <Pencil className="size-4 text-muted-foreground" strokeWidth={1.8} />
                  </Button>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-secondary px-5">
                <div className="grid min-h-[58px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border">
                  <span className="text-[14px] text-muted-foreground">UID</span>
                  <span className="flex items-center gap-2 text-[15px]">
                    {profileUid}
                    <Button variant="ghost" size="icon" aria-label="Copy UID" onClick={copyUid} className="size-7">
                      {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" strokeWidth={1.8} />}
                    </Button>
                  </span>
                </div>
                <div className="grid min-h-[58px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border">
                  <span className="text-[14px] text-muted-foreground">Username</span>
                  <Button
                    variant="ghost"
                    onClick={openNameEditor}
                    className="h-9 gap-2 px-1 text-[15px] font-normal"
                  >
                    {profileName}
                    <Pencil className="size-4" strokeWidth={1.8} />
                  </Button>
                </div>
                <div className="grid min-h-[58px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <span className="text-[14px] text-muted-foreground">Joined Date</span>
                  <span className="text-[15px]">{joinedDate}</span>
                </div>
              </div>
            </SubpageShell>
          ) : page === "how" ? (
            <SubpageShell title="How it Works" onBack={closePage}>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Browse stories", text: "Explore the library and pick a story you love." },
                  { step: "2", title: "Go premium", text: "Unlock full episodes, early access and an ad-free experience." },
                  { step: "3", title: "Enjoy anywhere", text: "Your picks and settings sync across all your devices." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 rounded-2xl border border-border bg-secondary p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-[15px] font-semibold text-primary-foreground">
                      {item.step}
                    </span>
                    <div>
                      <h2 className="text-[15px] font-semibold">{item.title}</h2>
                      <p className="mt-0.5 text-[14px] leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SubpageShell>
          ) : page === "coupons" ? (
            <SubpageShell title="Coupon & Offers" onBack={closePage}>
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-secondary px-6 py-12 text-center">
                <Ticket className="size-10 text-muted-foreground" strokeWidth={1.5} />
                <h2 className="mt-3 text-[16px] font-semibold">No coupons right now</h2>
                <p className="mt-1 text-[14px] text-muted-foreground">New offers and coupons will appear here soon.</p>
              </div>
            </SubpageShell>
          ) : page === "support" ? (
            <SubpageShell title="Help & Support" onBack={closePage}>
              <TelegramCard
                title="Need help?"
                description="Chat with our support team on Telegram for account, payment or app issues."
              />
            </SubpageShell>
          ) : page === "feedback" ? (
            <SubpageShell title="Feedback & Suggestions" onBack={closePage}>
              <TelegramCard
                title="Share your ideas"
                description="Tell us what you love and what we should improve. Your feedback shapes Arya Premium."
              />
            </SubpageShell>
          ) : page === "faq" ? (
            <SubpageShell title="FAQ" onBack={closePage}>
              <div className="divide-y divide-border rounded-2xl border border-border bg-secondary">
                {faqItems.map((item) => (
                  <details key={item.q} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{item.a}</p>
                  </details>
                ))}
              </div>
            </SubpageShell>
          ) : (
            <div className="flex min-h-[calc(100dvh-26px)] flex-col">
              <header className="flex items-center justify-between">
                <Button variant="ghost" size="icon" aria-label="Back" onClick={() => navigate({ to: "/" })} className="-ml-3">
                  <ArrowLeft className="size-6" strokeWidth={1.7} />
                </Button>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" aria-label="Support" onClick={() => openPage("support")} className="-mr-1">
                    <Headset className="size-6" strokeWidth={1.7} />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Settings" onClick={() => navigate({ to: "/" })} className="-mr-3">
                    <Settings className="size-6" strokeWidth={1.7} />
                  </Button>
                </div>
              </header>

              <Button
                variant="ghost"
                onClick={() => openPage("detail")}
                className="mt-3 grid h-auto w-full grid-cols-[56px_minmax(0,1fr)_18px] items-center gap-3 rounded-none px-0 py-2 text-left hover:bg-transparent"
              >
                <img
                  src={avatarSrc}
                  alt="Profile avatar"
                  width={816}
                  height={816}
                  className="size-14 rounded-full bg-avatar object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-[18px] font-semibold leading-snug">{profileName}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                    UID: {profileUid}
                    <Copy className="size-3.5" strokeWidth={1.8} />
                  </span>
                  <span className="mt-1.5 flex gap-2">
                    <span className="rounded-md bg-success-muted px-2.5 py-1 text-[11px] font-medium text-success">New</span>
                    <span className="rounded-md bg-success-muted px-2.5 py-1 text-[11px] font-medium text-success">Premium</span>
                  </span>
                </span>
                <ChevronRight className="size-[18px] self-start justify-self-end text-muted-foreground" strokeWidth={1.8} />
              </Button>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="secondary" onClick={() => showToast("My Stories: 0")} className="h-[66px] justify-start gap-3 rounded-lg px-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted">
                    <BookOpen className="size-[19px]" strokeWidth={1.7} />
                  </span>
                  <span className="text-left">
                    <span className="block text-[14px] font-medium">My Stories</span>
                    <span className="mt-0.5 block text-[13px] font-semibold text-muted-foreground">0</span>
                  </span>
                </Button>
                <Button variant="secondary" onClick={() => showToast("Wishlist: 0")} className="h-[66px] justify-start gap-3 rounded-lg px-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted">
                    <Heart className="size-[19px]" strokeWidth={1.7} />
                  </span>
                  <span className="text-left">
                    <span className="block text-[14px] font-medium">Wishlist</span>
                    <span className="mt-0.5 block text-[13px] font-semibold text-muted-foreground">0</span>
                  </span>
                </Button>
              </div>

              <Button
                variant="secondary"
                onClick={() => showToast("Coming Soon")}
                className="mt-3 flex h-[78px] w-full items-center gap-3 rounded-lg border border-border px-3.5 text-left"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-referral text-referral-foreground">
                  <Users className="size-[21px]" strokeWidth={1.9} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold">Referral</span>
                  <span className="mt-0.5 block text-[12px] font-normal leading-snug text-muted-foreground">
                    Earn up to 40% commission by inviting friends
                  </span>
                </span>
                <span className="grid h-9 shrink-0 place-items-center rounded-full bg-canvas px-3.5 text-[12px] font-medium">
                  Invite now
                </span>
              </Button>

              <section className="mt-4 border-t border-border">
                <ProfileRow icon={Workflow} label="How it Works" onClick={() => openPage("how")} />
                <ProfileRow icon={Ticket} label="Coupon & Offers" onClick={() => openPage("coupons")} />
                <ProfileRow icon={Headset} label="Help & Support" onClick={() => openPage("support")} />
                <ProfileRow icon={Lightbulb} label="Feedback & Suggestions" onClick={() => openPage("feedback")} />
                <ProfileRow icon={HelpCircle} label="FAQ" onClick={() => openPage("faq")} />
                <ProfileRow icon={MessagesSquare} label="Community" onClick={() => navigate({ to: "/community" })} />
              </section>
            </div>
          )}
        </div>

        {toast && (
          <div
            role="status"
            className="fixed bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-border bg-popover px-4 py-3 text-xs shadow-dialog"
          >
            {toast}
          </div>
        )}

        {editSheet && (
          <div className="fixed inset-0 z-50 flex items-end bg-overlay animate-sheet-backdrop" onClick={() => setEditSheet(null)}>
            <div
              role="dialog"
              aria-modal="true"
              aria-label={editSheet === "avatar" ? "Edit profile photo" : "Edit name"}
              className="mx-auto w-full max-w-[480px] rounded-t-[18px] border border-border bg-popover px-4 pb-[max(18px,env(safe-area-inset-bottom))] pt-2 shadow-dialog animate-sheet-up"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-muted" />
              <div className="grid h-12 grid-cols-[40px_minmax(0,1fr)_40px] items-center">
                <span />
                <h2 className="text-center text-[19px] font-semibold">
                  {editSheet === "avatar" ? "Edit profile photo" : "Name"}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setEditSheet(null)} aria-label="Close" className="size-10">
                  <X className="size-6" strokeWidth={1.7} />
                </Button>
              </div>

              {editSheet === "avatar" ? (
                <div className="pt-3">
                  <img src={draftAvatar} alt="Selected profile avatar" className="mx-auto size-24 rounded-full bg-avatar object-cover" />
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={chooseAvatar} className="hidden" />
                  <Button variant="secondary" onClick={() => fileInputRef.current?.click()} className="mt-6 h-[54px] w-full justify-between rounded-lg px-4 text-[15px]">
                    <span className="flex items-center gap-3"><ImagePlus className="size-5" strokeWidth={1.7} />Choose a photo</span>
                    <ChevronRight className="size-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" onClick={saveAvatar} className="mt-5 h-[52px] w-full rounded-lg bg-primary text-[15px] text-primary-foreground hover:bg-primary/90">
                    Save
                  </Button>
                </div>
              ) : (
                <div className="pt-4">
                  <input
                    value={draftName}
                    onChange={(event) => setDraftName(event.target.value.slice(0, 20))}
                    maxLength={20}
                    autoFocus
                    aria-label="Profile name"
                    className="h-[58px] w-full rounded-lg border border-input bg-background px-4 text-[16px] outline-none focus:border-ring"
                  />
                  <p className="mt-2 text-right text-[13px] text-muted-foreground">{draftName.length}/20</p>
                  <Button
                    variant="ghost"
                    onClick={saveName}
                    disabled={!draftName.trim()}
                    className="mt-5 h-[52px] w-full rounded-lg bg-primary text-[15px] text-primary-foreground hover:bg-primary/90"
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
