import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  Bell,
  Check,
  ChevronRight,
  CircleDollarSign,
  Globe2,
  Info,
  Languages,
  MoonStar,
  Navigation,
  Search,
  SlidersHorizontal,
  Trash2,
  Users,
  Volume2,
} from "lucide-react";
import { useState, type ComponentType, type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Settings | Midnight" },
      { name: "description", content: "Manage your Midnight app settings and preferences." },
      { property: "og:title", content: "Settings | Midnight" },
      { property: "og:description", content: "Manage your Midnight app settings and preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

type SelectionSubpage = "currency" | "language" | "appearance" | "region" | "navigation";
type Subpage = SelectionSubpage | "preference" | "sound";
type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const selectOptions: Record<SelectionSubpage, { title: string; choices: string[] }> = {
  currency: { title: "Select currency", choices: ["INR", "USD"] },
  language: { title: "Language", choices: ["English", "Hindi"] },
  appearance: { title: "Appearance", choices: ["Mono", "Midnight", "Warm"] },
  region: { title: "Region", choices: ["India", "Outside India"] },
  navigation: { title: "Midnight Navigation", choices: ["Drift", "Limelight", "Floating"] },
};

const initialSelections: Record<SelectionSubpage, string> = {
  currency: "INR",
  language: "English",
  appearance: "Midnight",
  region: "India",
  navigation: "Drift",
};

const preferenceItems = ["Show Price", "Reduce Motion", "Ongoing Story Updates"];
const soundItems = [
  "Payment success sound",
  "Episode delivery sound",
  "Sound Effects",
  "Demo request sound",
];

function SettingRow({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: IconType;
  label: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="grid h-[54px] w-full grid-cols-[28px_minmax(0,1fr)_auto_18px] rounded-none border-b border-border px-1 text-left hover:bg-accent"
    >
      <Icon className="size-[21px] text-foreground" strokeWidth={1.8} />
      <span className="min-w-0 truncate text-[14px] font-normal">{label}</span>
      <span className="max-w-28 truncate text-[13px] font-normal text-muted-foreground">{value}</span>
      <ChevronRight className="size-[18px] text-foreground" strokeWidth={1.8} />
    </Button>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      role="switch"
      aria-checked={checked}
      aria-label={`Toggle ${label}`}
      onClick={onChange}
      className={cn(
        "h-7 w-12 rounded-full p-[3px] hover:bg-switch",
        checked ? "bg-primary" : "bg-switch",
      )}
    >
      <span
        className={cn(
          "block size-[22px] rounded-full bg-switch-knob transition-transform duration-200",
          checked ? "translate-x-[10px]" : "-translate-x-[10px]",
        )}
      />
    </Button>
  );
}

function ToggleSection({
  icon: Icon,
  title,
  items,
  values,
  onToggle,
}: {
  icon: IconType;
  title: string;
  items: string[];
  values: Record<string, boolean>;
  onToggle: (item: string) => void;
}) {
  return (
    <section>
      <div className="mb-2 flex items-center gap-3">
        <Icon className="size-[21px] text-foreground" strokeWidth={1.8} />
        <h2 className="text-[15px] font-semibold">{title}</h2>
      </div>
      {items.map((item) => (
        <div key={item} className="grid min-h-[62px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border">
          <span className="min-w-0 text-[15px] text-foreground">{item}</span>
          <Toggle checked={values[item] ?? false} onChange={() => onToggle(item)} label={item} />
        </div>
      ))}
    </section>
  );
}

function SelectionPage({
  page,
  selected,
  onBack,
  onSelect,
}: {
  page: SelectionSubpage;
  selected: string;
  onBack: () => void;
  onSelect: (choice: string) => void;
}) {
  const config = selectOptions[page];
  return (
    <div className="pt-0">
      <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back" className="-ml-3 mb-2">
        <ArrowLeft className="size-6" strokeWidth={1.7} />
      </Button>
      <h1 className="mb-4 text-[24px] font-semibold leading-tight">{config.title}</h1>
      {page === "currency" && (
        <>
          <label className="mb-4 grid h-[50px] grid-cols-[24px_minmax(0,1fr)] items-center gap-3 rounded-md bg-secondary px-4 text-muted-foreground">
            <Search className="size-5" strokeWidth={1.8} />
            <input aria-label="Currency" placeholder="Currency" className="min-w-0 bg-transparent text-[16px] outline-none placeholder:text-muted-foreground" />
          </label>
          <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center text-[14px] text-muted-foreground">
            <span>History</span>
            <Trash2 className="size-5 text-foreground" strokeWidth={1.8} />
          </div>
        </>
      )}
      {page === "language" && (
        <div className="mb-4 flex gap-4 rounded-md bg-secondary px-4 py-3.5 text-[14px] leading-relaxed text-secondary-foreground">
          <Languages className="mt-0.5 size-5 shrink-0 text-primary" />
          <p>Your selected language is used throughout the app and on all devices where you're signed in.</p>
        </div>
      )}
      <div>
        {config.choices.map((choice) => (
          <Button
            key={choice}
            variant="ghost"
            onClick={() => onSelect(choice)}
            className="grid h-[64px] w-full grid-cols-[minmax(0,1fr)_28px] rounded-none px-0 text-left hover:bg-accent"
          >
            <span className="text-[16px] font-normal">{choice}</span>
            <span
              className={cn(
                "grid size-5 place-items-center rounded-full border-2",
                selected === choice ? "border-primary bg-primary" : "border-input bg-canvas",
              )}
            >
              {selected === choice && <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function TogglePage({
  page,
  values,
  onToggle,
  onBack,
}: {
  page: "preference" | "sound";
  values: Record<string, boolean>;
  onToggle: (item: string) => void;
  onBack: () => void;
}) {
  const isPreference = page === "preference";
  return (
    <div className="pt-0">
      <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back" className="-ml-3 mb-2">
        <ArrowLeft className="size-6" strokeWidth={1.7} />
      </Button>
      <h1 className="mb-4 text-[24px] font-semibold leading-tight">{isPreference ? "Preference" : "Sound"}</h1>
      <ToggleSection
        icon={isPreference ? SlidersHorizontal : Volume2}
        title={isPreference ? "Preferences" : "Sound settings"}
        items={isPreference ? preferenceItems : soundItems}
        values={values}
        onToggle={onToggle}
      />
    </div>
  );
}

function SettingsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState<Subpage | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<"forward" | "back">("forward");
  const [selections, setSelections] = useState(initialSelections);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    "Show Price": true,
    "Reduce Motion": false,
    "Ongoing Story Updates": true,
  });
  const [sounds, setSounds] = useState<Record<string, boolean>>({
    "Payment success sound": true,
    "Episode delivery sound": true,
    "Sound Effects": true,
    "Demo request sound": false,
  });
  const [showReset, setShowReset] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const toggle = (
    setter: Dispatch<SetStateAction<Record<string, boolean>>>,
    item: string,
  ) => setter((current) => ({ ...current, [item]: !current[item] }));

  const openPage = (nextPage: Subpage) => {
    setNavigationDirection("forward");
    setPage(nextPage);
  };

  const closePage = () => {
    setNavigationDirection("back");
    setPage(null);
  };

  const reset = () => {
    setSelections(initialSelections);
    setPreferences({ "Show Price": true, "Reduce Motion": false, "Ongoing Story Updates": true });
    setSounds({
      "Payment success sound": true,
      "Episode delivery sound": true,
      "Sound Effects": true,
      "Demo request sound": false,
    });
    setShowReset(false);
    setResetDone(true);
    window.setTimeout(() => setResetDone(false), 2400);
  };

  return (
    <main data-appearance={selections.appearance.toLowerCase()} className="min-h-dvh bg-canvas text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-[max(14px,env(safe-area-inset-top))]">
        <div key={page ?? "settings"} className={navigationDirection === "back" ? "animate-page-back" : "animate-page-forward"}>
        {page === "preference" || page === "sound" ? (
          <TogglePage
            page={page}
            values={page === "preference" ? preferences : sounds}
            onToggle={(item) => toggle(page === "preference" ? setPreferences : setSounds, item)}
            onBack={closePage}
          />
        ) : page ? (
          <SelectionPage
            page={page}
            selected={selections[page]}
            onBack={closePage}
            onSelect={(choice) => {
              setSelections((current) => ({ ...current, [page]: choice }));
              window.setTimeout(closePage, 120);
            }}
          />
        ) : (
          <div className="flex min-h-[calc(100dvh-26px)] flex-col">
            <header>
              <Button variant="ghost" size="icon" aria-label="Back" onClick={() => window.history.back()} className="-ml-3 mb-3">
                <ArrowLeft className="size-6" strokeWidth={1.7} />
              </Button>
              <h1 className="mb-4 text-[24px] font-semibold leading-tight">Settings</h1>
            </header>

            <section className="border-t border-border">
              <SettingRow icon={CircleDollarSign} label="Currency" value={selections.currency} onClick={() => openPage("currency")} />
              <SettingRow icon={Globe2} label="Language" value={selections.language} onClick={() => openPage("language")} />
              <SettingRow icon={MoonStar} label="Appearance" value={selections.appearance} onClick={() => openPage("appearance")} />
              <SettingRow icon={Banknote} label="Region" value={selections.region} onClick={() => openPage("region")} />
              <SettingRow icon={Navigation} label="Midnight Navigation" value={selections.navigation} onClick={() => openPage("navigation")} />
              <SettingRow icon={Bell} label="Preference" value="" onClick={() => openPage("preference")} />
              <SettingRow icon={Volume2} label="Sound" value="" onClick={() => openPage("sound")} />
              <SettingRow icon={Users} label="Community" value="" onClick={() => navigate({ to: "/community" })} />
              <SettingRow icon={Info} label="About Us" value="" onClick={() => navigate({ to: "/about" })} />
            </section>

            <Button
              variant="secondary"
              onClick={() => setShowReset(true)}
              className="mt-auto h-[52px] w-full rounded-[10px] border-0 bg-secondary text-[15px] font-medium text-foreground shadow-none hover:bg-accent active:bg-accent"
            >
              Reset onboarding
            </Button>
          </div>
        )}
        </div>

        {resetDone && (
          <div role="status" className="fixed bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-border bg-popover px-4 py-3 text-xs shadow-dialog">
            <Check className="size-4 text-primary" /> Onboarding reset
          </div>
        )}

        {showReset && (
          <div
            className="fixed inset-0 z-20 flex animate-sheet-backdrop flex-col justify-end bg-overlay p-2 pb-[max(18px,env(safe-area-inset-bottom))] backdrop-blur-[4px]"
            role="presentation"
            onClick={() => setShowReset(false)}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="reset-title"
              aria-describedby="reset-description"
              className="mx-auto flex w-full max-w-[464px] animate-sheet-up flex-col gap-2"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="overflow-hidden rounded-[14px] border border-border bg-popover/90 shadow-dialog backdrop-blur-3xl">
                <div className="border-b border-border px-8 py-4 text-center">
                  <h2 id="reset-title" className="text-[15px] font-semibold leading-tight">Reset onboarding?</h2>
                  <p id="reset-description" className="mt-1.5 text-[13px] leading-snug text-muted-foreground">
                    This will clear your onboarding progress and return your choices to their defaults.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={reset}
                  className="h-[56px] w-full rounded-none text-[18px] font-normal text-destructive transition-colors duration-150 hover:bg-accent hover:text-destructive active:bg-accent"
                >
                  Reset onboarding
                </Button>
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowReset(false)}
                className="h-[56px] w-full rounded-[14px] border border-border bg-popover/95 text-[18px] font-semibold text-primary shadow-dialog backdrop-blur-3xl hover:bg-accent active:bg-accent"
              >
                Cancel
              </Button>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
