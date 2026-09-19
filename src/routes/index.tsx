import { createFileRoute } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  Banknote,
  Bell,
  Check,
  ChevronRight,
  CircleDollarSign,
  Globe2,
  Languages,
  MoonStar,
  Navigation,
  RefreshCcw,
  Search,
  Sparkles,
  SlidersHorizontal,
  Trash2,
  Volume2,
  WandSparkles,
  X,
} from "lucide-react";
import { useState, type ComponentType, type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { recommendSettings, type SettingsRecommendation } from "@/lib/settings-ai.functions";

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
type Subpage = SelectionSubpage | "preference" | "sound" | "ai";
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
      aria-label={value ? `${label}, current value ${value}` : `Open ${label} settings`}
      className="grid h-[60px] w-full grid-cols-[30px_minmax(0,1fr)_auto_18px] rounded-none border-b border-border px-1 text-left hover:bg-accent"
    >
      <Icon aria-hidden="true" className="size-[21px] text-foreground" strokeWidth={1.8} />
      <span className="min-w-0 truncate text-[15px] font-normal">{label}</span>
      <span className="max-w-28 truncate text-[14px] font-normal text-muted-foreground">{value}</span>
      <ChevronRight aria-hidden="true" className="size-[18px] text-foreground" strokeWidth={1.8} />
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
      aria-labelledby={`setting-${label.toLowerCase().replaceAll(" ", "-")}`}
      onClick={onChange}
      className={cn(
        "relative h-11 w-14 rounded-full p-[3px] after:absolute after:inset-0 hover:bg-switch",
        checked ? "bg-primary" : "bg-switch",
      )}
    >
      <span
        className={cn(
          "block size-[22px] rounded-full bg-switch-knob transition-transform duration-200",
          checked ? "translate-x-[13px]" : "-translate-x-[13px]",
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
      <div className="mb-4 flex items-center gap-3">
        <Icon aria-hidden="true" className="size-[21px] text-foreground" strokeWidth={1.8} />
        <h2 className="text-[15px] font-semibold">{title}</h2>
      </div>
      {items.map((item) => (
        <div key={item} className="grid min-h-[62px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border">
          <span id={`setting-${item.toLowerCase().replaceAll(" ", "-")}`} className="min-w-0 text-[15px] text-foreground">{item}</span>
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
    <div className="animate-page-in pt-2">
      <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back" className="-ml-3 mb-7">
        <ArrowLeft aria-hidden="true" className="size-6" strokeWidth={1.7} />
      </Button>
      <h1 className="mb-8 text-[27px] font-semibold leading-tight">{config.title}</h1>
      {page === "currency" && (
        <>
          <label className="mb-7 grid h-[52px] grid-cols-[24px_minmax(0,1fr)] items-center gap-3 rounded-md bg-secondary px-4 text-muted-foreground">
            <Search aria-hidden="true" className="size-5" strokeWidth={1.8} />
            <input aria-label="Search currency" placeholder="Currency" className="min-w-0 bg-transparent text-[16px] outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" />
          </label>
          <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center text-[14px] text-muted-foreground">
            <span>History</span>
            <Trash2 aria-hidden="true" className="size-5 text-foreground" strokeWidth={1.8} />
          </div>
        </>
      )}
      {page === "language" && (
        <div className="mb-7 flex gap-4 rounded-md bg-secondary px-4 py-4 text-[14px] leading-relaxed text-secondary-foreground">
          <Languages aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <p>Your selected language is used throughout the app and on all devices where you're signed in.</p>
        </div>
      )}
      <div role="radiogroup" aria-label={config.title}>
        {config.choices.map((choice) => (
          <Button
            key={choice}
            variant="ghost"
            onClick={() => onSelect(choice)}
            role="radio"
            aria-checked={selected === choice}
            className="grid h-[64px] w-full grid-cols-[minmax(0,1fr)_28px] rounded-none px-0 text-left hover:bg-accent"
          >
            <span className="text-[16px] font-normal">{choice}</span>
            <span
              className={cn(
                "grid size-5 place-items-center rounded-full border-2",
                selected === choice ? "border-primary bg-primary" : "border-input bg-canvas",
              )}
            >
              {selected === choice && <Check aria-hidden="true" className="size-3.5 text-primary-foreground" strokeWidth={3} />}
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
    <div className="animate-page-in pt-2">
      <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back" className="-ml-3 mb-7">
        <ArrowLeft aria-hidden="true" className="size-6" strokeWidth={1.7} />
      </Button>
      <h1 className="mb-8 text-[27px] font-semibold leading-tight">{isPreference ? "Preference" : "Sound"}</h1>
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

function AiSettingsPage({
  onBack,
  onApply,
}: {
  onBack: () => void;
  onApply: (recommendation: SettingsRecommendation) => void;
}) {
  const recommend = useServerFn(recommendSettings);
  const [description, setDescription] = useState("");
  const [recommendation, setRecommendation] = useState<SettingsRecommendation | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (description.trim().length < 3) {
      setError("Describe your preferences in a little more detail.");
      return;
    }
    setError("");
    setRecommendation(null);
    setIsLoading(true);
    try {
      const result = await recommend({ data: { description } });
      setRecommendation(result);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "AI recommendations are unavailable right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const recommendationRows = recommendation
    ? [
        ["Currency", recommendation.currency],
        ["Language", recommendation.language],
        ["Appearance", recommendation.appearance],
        ["Show Price", recommendation.preferences.showPrice ? "On" : "Off"],
        ["Reduce Motion", recommendation.preferences.reduceMotion ? "On" : "Off"],
        ["Story Updates", recommendation.preferences.ongoingStoryUpdates ? "On" : "Off"],
        ["Payment sound", recommendation.sounds.paymentSuccess ? "On" : "Off"],
        ["Episode sound", recommendation.sounds.episodeDelivery ? "On" : "Off"],
        ["Sound Effects", recommendation.sounds.soundEffects ? "On" : "Off"],
        ["Demo sound", recommendation.sounds.demoRequest ? "On" : "Off"],
      ]
    : [];

  return (
    <div className="animate-page-in pt-2">
      <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back to settings" className="-ml-3 mb-7">
        <ArrowLeft aria-hidden="true" className="size-6" strokeWidth={1.7} />
      </Button>
      <h1 className="text-[27px] font-semibold leading-tight">Set up with AI</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        Describe how you use the app, and AI will suggest settings you can review first.
      </p>
      <label htmlFor="ai-preferences" className="mt-7 block text-[15px] font-semibold">Your preferences</label>
      <textarea
        id="ai-preferences"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="For example: I live in India, prefer Hindi, a warm look, fewer animations, and only important sounds."
        maxLength={1000}
        rows={5}
        aria-describedby="ai-preferences-help"
        className="mt-3 min-h-32 w-full resize-y rounded-md border border-input bg-secondary px-4 py-3 text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
      <div id="ai-preferences-help" className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-xs text-muted-foreground">
        <span>Your text is used only to create this recommendation.</span>
        <span aria-label={`${description.length} of 1000 characters`}>{description.length}/1000</span>
      </div>
      <Button variant="secondary" size="wide" disabled={isLoading} onClick={generate} className="mt-5">
        <Sparkles aria-hidden="true" className="size-4" />
        {isLoading ? "Creating recommendations…" : "Create recommendations"}
      </Button>

      <div aria-live="polite" aria-atomic="true">
        {error && <p role="alert" className="mt-4 rounded-md border border-destructive bg-popover px-4 py-3 text-sm text-destructive-foreground">{error}</p>}
        {recommendation && (
          <section aria-labelledby="recommendation-title" className="mt-7 border-t border-border pt-6">
            <h2 id="recommendation-title" className="text-lg font-semibold">Recommended settings</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{recommendation.summary}</p>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              {recommendationRows.map(([label, value]) => (
                <div key={label} className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2 text-sm">
                  <dt className="min-w-0">{label}</dt>
                  <dd className="text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
            <Button variant="secondary" size="wide" onClick={() => onApply(recommendation)} className="mt-5">
              <Check aria-hidden="true" className="size-4" /> Apply recommendations
            </Button>
          </section>
        )}
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
  const [aiApplied, setAiApplied] = useState(false);

  const toggle = (
    setter: Dispatch<SetStateAction<Record<string, boolean>>>,
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
    <main id="main-content" tabIndex={-1} data-appearance={selections.appearance.toLowerCase()} data-reduce-motion={preferences["Reduce Motion"]} className="min-h-dvh bg-canvas text-foreground outline-none">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-[max(14px,env(safe-area-inset-top))]">
        {page === "ai" ? (
          <AiSettingsPage
            onBack={() => setPage(null)}
            onApply={(recommendation) => {
              setSelections((current) => ({
                ...current,
                currency: recommendation.currency,
                language: recommendation.language,
                appearance: recommendation.appearance,
              }));
              setPreferences({
                "Show Price": recommendation.preferences.showPrice,
                "Reduce Motion": recommendation.preferences.reduceMotion,
                "Ongoing Story Updates": recommendation.preferences.ongoingStoryUpdates,
              });
              setSounds({
                "Payment success sound": recommendation.sounds.paymentSuccess,
                "Episode delivery sound": recommendation.sounds.episodeDelivery,
                "Sound Effects": recommendation.sounds.soundEffects,
                "Demo request sound": recommendation.sounds.demoRequest,
              });
              setPage(null);
              setAiApplied(true);
              window.setTimeout(() => setAiApplied(false), 3000);
            }}
          />
        ) : page === "preference" || page === "sound" ? (
          <TogglePage
            page={page}
            values={page === "preference" ? preferences : sounds}
            onToggle={(item) => toggle(page === "preference" ? setPreferences : setSounds, item)}
            onBack={() => setPage(null)}
          />
        ) : page ? (
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
          <div className="flex min-h-[calc(100dvh-26px)] animate-page-in flex-col pt-2">
            <header>
              <Button variant="ghost" size="icon" aria-label="Back" onClick={() => window.history.back()} className="-ml-3 mb-7">
                <ArrowLeft aria-hidden="true" className="size-6" strokeWidth={1.7} />
              </Button>
              <h1 className="mb-6 text-[27px] font-semibold leading-tight">Settings</h1>
            </header>

            <section className="border-t border-border">
              <SettingRow icon={Sparkles} label="Set up with AI" value="" onClick={() => setPage("ai")} />
              <SettingRow icon={CircleDollarSign} label="Currency" value={selections.currency} onClick={() => setPage("currency")} />
              <SettingRow icon={Globe2} label="Language" value={selections.language} onClick={() => setPage("language")} />
              <SettingRow icon={MoonStar} label="Appearance" value={selections.appearance} onClick={() => setPage("appearance")} />
              <SettingRow icon={Banknote} label="Region" value={selections.region} onClick={() => setPage("region")} />
              <SettingRow icon={Navigation} label="Midnight Navigation" value={selections.navigation} onClick={() => setPage("navigation")} />
              <SettingRow icon={Bell} label="Preference" value="" onClick={() => setPage("preference")} />
              <SettingRow icon={Volume2} label="Sound" value="" onClick={() => setPage("sound")} />
            </section>

            <div className="mt-auto pt-10">
              <Button variant="secondary" size="wide" onClick={() => setShowReset(true)}>
                <RefreshCcw aria-hidden="true" className="size-4" />
                Reset onboarding
              </Button>
            </div>
          </div>
        )}

        {resetDone && (
          <div role="status" className="fixed bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-border bg-popover px-4 py-3 text-xs shadow-dialog">
            <Check aria-hidden="true" className="size-4 text-primary" /> Onboarding reset
          </div>
        )}

        {aiApplied && (
          <div role="status" className="fixed bottom-20 left-1/2 flex w-max max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-md border border-border bg-popover px-4 py-3 text-xs shadow-dialog">
            <Check aria-hidden="true" className="size-4 text-primary" /> AI recommendations applied
          </div>
        )}

        <Dialog.Root open={showReset} onOpenChange={setShowReset}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-20 bg-overlay" />
            <Dialog.Content aria-describedby="reset-description" className="fixed inset-x-4 bottom-4 z-30 mx-auto w-auto max-w-[448px] rounded-md border border-border bg-popover p-5 shadow-dialog outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <WandSparkles aria-hidden="true" className="mb-4 size-5 text-primary" />
                  <Dialog.Title className="text-base font-semibold">Reset onboarding?</Dialog.Title>
                  <Dialog.Description id="reset-description" className="mt-2 text-xs leading-relaxed text-muted-foreground">Your onboarding choices will return to their defaults.</Dialog.Description>
                </div>
                <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close reset dialog"><X aria-hidden="true" className="size-4" /></Button></Dialog.Close>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Dialog.Close asChild><Button variant="ghost">Cancel</Button></Dialog.Close>
                <Button variant="destructive" onClick={reset}>Reset</Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </main>
  );
}
