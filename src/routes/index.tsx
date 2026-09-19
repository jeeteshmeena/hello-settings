import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  Check,
  ChevronRight,
  CircleDollarSign,
  Globe2,
  Languages,
  MoonStar,
  Navigation,
  RefreshCcw,
  SlidersHorizontal,
  Volume2,
  WandSparkles,
  X,
} from "lucide-react";
import { useState, type ComponentType } from "react";

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

type Subpage = "currency" | "language" | "appearance" | "region" | "navigation";
type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const selectOptions: Record<Subpage, { title: string; choices: string[] }> = {
  currency: { title: "Select currency", choices: ["INR", "USD"] },
  language: { title: "Language", choices: ["English", "Hindi"] },
  appearance: { title: "Appearance", choices: ["Mono", "Midnight", "Warm"] },
  region: { title: "Region", choices: ["India", "Outside India"] },
  navigation: { title: "Midnight Navigation", choices: ["Drift", "Limelight", "Floating"] },
};

const initialSelections: Record<Subpage, string> = {
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
      className="grid h-[52px] w-full grid-cols-[20px_minmax(0,1fr)_auto_16px] rounded-none border-b border-border px-1 text-left hover:bg-accent"
    >
      <Icon className="size-[17px] text-icon" strokeWidth={1.8} />
      <span className="min-w-0 truncate text-[13px] font-normal">{label}</span>
      <span className="max-w-28 truncate text-[11px] font-normal text-muted-foreground">{value}</span>
      <ChevronRight className="size-4 text-muted-foreground" strokeWidth={1.8} />
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
        "h-6 w-11 rounded-full p-[3px] hover:bg-switch",
        checked ? "bg-primary" : "bg-switch",
      )}
    >
      <span
        className={cn(
          "block size-[18px] rounded-full bg-switch-knob transition-transform duration-200",
          checked ? "translate-x-[9px]" : "-translate-x-[9px]",
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
    <section className="border-b border-border py-4">
      <div className="mb-1 flex items-center gap-2 px-1">
        <Icon className="size-[17px] text-icon" strokeWidth={1.8} />
        <h2 className="text-[13px] font-semibold">{title}</h2>
      </div>
      {items.map((item) => (
        <div key={item} className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pl-7 pr-1">
          <span className="min-w-0 text-[12px] text-muted-foreground">{item}</span>
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
  page: Subpage;
  selected: string;
  onBack: () => void;
  onSelect: (choice: string) => void;
}) {
  const config = selectOptions[page];
  return (
    <div className="animate-page-in">
      <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back" className="-ml-3 mb-1">
        <ArrowLeft className="size-5" strokeWidth={1.8} />
      </Button>
      <h1 className="mb-5 text-[22px] font-semibold leading-tight">{config.title}</h1>
      {page === "language" && (
        <div className="mb-4 flex gap-3 rounded-md bg-secondary p-3 text-[11px] leading-relaxed text-secondary-foreground">
          <Languages className="mt-0.5 size-4 shrink-0 text-primary" />
          <p>Your selected language is used throughout the app and on all devices where you're signed in.</p>
        </div>
      )}
      <div className="border-t border-border">
        {config.choices.map((choice) => (
          <Button
            key={choice}
            variant="ghost"
            onClick={() => onSelect(choice)}
            className="grid h-[54px] w-full grid-cols-[minmax(0,1fr)_24px] rounded-none border-b border-border px-1 text-left"
          >
            <span className="text-[13px] font-normal">{choice}</span>
            <span
              className={cn(
                "grid size-4 place-items-center rounded-full border",
                selected === choice ? "border-primary bg-primary" : "border-input",
              )}
            >
              {selected === choice && <Check className="size-3 text-primary-foreground" strokeWidth={3} />}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  const [page, setPage] = useState<Subpage | null>(null);
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
    setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    item: string,
  ) => setter((current) => ({ ...current, [item]: !current[item] }));

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
        {page ? (
          <SelectionPage
            page={page}
            selected={selections[page]}
            onBack={() => setPage(null)}
            onSelect={(choice) => {
              setSelections((current) => ({ ...current, [page]: choice }));
              window.setTimeout(() => setPage(null), 120);
            }}
          />
        ) : (
          <div className="flex min-h-[calc(100dvh-26px)] animate-page-in flex-col">
            <header>
              <Button variant="ghost" size="icon" aria-label="Back" className="-ml-3 mb-1">
                <ArrowLeft className="size-5" strokeWidth={1.8} />
              </Button>
              <h1 className="mb-2 text-[22px] font-semibold leading-tight">Settings</h1>
            </header>

            <section className="border-t border-border">
              <SettingRow icon={CircleDollarSign} label="Currency" value={selections.currency} onClick={() => setPage("currency")} />
              <SettingRow icon={Globe2} label="Language" value={selections.language} onClick={() => setPage("language")} />
              <SettingRow icon={MoonStar} label="Appearance" value={selections.appearance} onClick={() => setPage("appearance")} />
              <SettingRow icon={Banknote} label="Region" value={selections.region} onClick={() => setPage("region")} />
              <SettingRow icon={Navigation} label="Midnight Navigation" value={selections.navigation} onClick={() => setPage("navigation")} />
            </section>

            <ToggleSection
              icon={SlidersHorizontal}
              title="Preference"
              items={preferenceItems}
              values={preferences}
              onToggle={(item) => toggle(setPreferences, item)}
            />
            <ToggleSection
              icon={Volume2}
              title="Sound"
              items={soundItems}
              values={sounds}
              onToggle={(item) => toggle(setSounds, item)}
            />

            <div className="mt-auto pt-7">
              <Button variant="secondary" size="wide" onClick={() => setShowReset(true)}>
                <RefreshCcw className="size-4" />
                Reset onboarding
              </Button>
            </div>
          </div>
        )}

        {resetDone && (
          <div role="status" className="fixed bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-border bg-popover px-4 py-3 text-xs shadow-dialog">
            <Check className="size-4 text-primary" /> Onboarding reset
          </div>
        )}

        {showReset && (
          <div className="fixed inset-0 z-20 grid place-items-end bg-overlay p-4 sm:place-items-center" role="presentation">
            <section role="dialog" aria-modal="true" aria-labelledby="reset-title" className="w-full max-w-[448px] rounded-md border border-border bg-popover p-5 shadow-dialog">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <WandSparkles className="mb-4 size-5 text-primary" />
                  <h2 id="reset-title" className="text-base font-semibold">Reset onboarding?</h2>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Your onboarding choices will return to their defaults.</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowReset(false)} aria-label="Close">
                  <X className="size-4" />
                </Button>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button variant="ghost" onClick={() => setShowReset(false)}>Cancel</Button>
                <Button variant="destructive" onClick={reset}>Reset</Button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
