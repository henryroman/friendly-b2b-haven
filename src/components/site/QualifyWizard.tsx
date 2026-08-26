import { useMemo, useState, type FormEvent } from "react";
import { Btn, Overline } from "./Section";
import {
  AUDIENCE_OPTIONS,
  INTENT_OPTIONS,
  identifyOptionsFor,
  type Audience,
  type Intent,
} from "@/lib/qualify-data";
import { submitQualifyForm } from "@/lib/qualify-submit";

// Rebuilt 2026-08-26 per H's direct redesign request. Was a 6-segment
// picker with 2-3 tailored follow-up questions per segment, a value-range
// question, a timeline question, and a 6-field contact form (name,
// company, email, phone, location, notes). Now four short steps --
// individual/company, sell/buy, self-identify, email -- deliberately
// trading away the richer segment-specific questions and the value/
// timeline qualifiers for speed. "lets make it easy" was explicit in the
// request; friction was cut everywhere, not just the contact step.

type Phase = "audience" | "intent" | "identify" | "email" | "submitting" | "done" | "error";

const STEP_ORDER: Phase[] = ["audience", "intent", "identify", "email"];

export function QualifyWizard({
  initialMetal,
  initialNote,
}: {
  initialMetal?: string;
  initialNote?: string;
}) {
  const [phase, setPhase] = useState<Phase>("audience");
  const [audience, setAudience] = useState<Audience | null>(null);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [identify, setIdentify] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const identifyOptions = useMemo(() => (audience ? identifyOptionsFor(audience) : []), [audience]);
  const audienceLabel = AUDIENCE_OPTIONS.find((a) => a.key === audience)?.label ?? "";
  const intentLabel = INTENT_OPTIONS.find((i) => i.key === intent)?.label ?? "";
  const identifyLabel = identifyOptions.find((o) => o.key === identify)?.label ?? "";

  // ?metal=/?note= carried through from the calculator's own CTA, same
  // mechanism as the original build -- shown as context, folded into the
  // emailed startedFrom field, never mapped onto a specific answer.
  const startedFrom = useMemo(() => {
    if (initialNote) return `From the melt calculator: ${initialNote}`;
    if (initialMetal) return `From the melt calculator — metal: ${initialMetal}`;
    return "";
  }, [initialMetal, initialNote]);

  const stepIndex = Math.max(STEP_ORDER.indexOf(phase), 0);
  const totalSteps = STEP_ORDER.length;
  const showChrome = phase !== "done";
  const canGoBack = stepIndex > 0 && phase !== "submitting" && phase !== "error";

  function goBack() {
    if (phase === "intent") setPhase("audience");
    else if (phase === "identify") setPhase("intent");
    else if (phase === "email" || phase === "error") setPhase("identify");
  }

  function pickAudience(key: Audience) {
    setAudience(key);
    setIdentify(null);
    setPhase("intent");
  }

  function pickIntent(key: Intent) {
    setIntent(key);
    setPhase("identify");
  }

  function pickIdentify(key: string) {
    setIdentify(key);
    setPhase("email");
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!audience || !intent || !identify || !emailValid) return;
    setPhase("submitting");
    setErrorMsg("");
    try {
      const result = await submitQualifyForm({
        data: {
          audience,
          audienceLabel,
          intent,
          intentLabel,
          identify,
          identifyLabel,
          email: email.trim(),
          startedFrom,
          honeypot,
        },
      });
      if (result.ok) {
        setPhase("done");
      } else {
        setErrorMsg(
          result.error === "not_configured"
            ? "Email delivery isn't fully set up yet."
            : "Something went wrong sending this.",
        );
        setPhase("error");
      }
    } catch {
      setErrorMsg("Something went wrong sending this.");
      setPhase("error");
    }
  }

  function mailtoFallback(): string {
    const lines = [`I am: ${audienceLabel}`, `Looking to: ${intentLabel}`, `About: ${identifyLabel}`, startedFrom].filter(
      Boolean,
    );
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent(`Enquiry — ${identifyLabel}`);
    return `mailto:info@tessvanghert.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="mx-auto max-w-[640px]">
      {showChrome && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Overline>
              Step {Math.min(stepIndex + 1, totalSteps)} of {totalSteps}
            </Overline>
            {canGoBack && (
              <button
                type="button"
                onClick={goBack}
                className="font-display text-[12px] uppercase tracking-[var(--tracking-overline)] text-[var(--text-muted)] underline transition-colors hover:text-[var(--accent-press)]"
              >
                Back
              </button>
            )}
          </div>
          <div className="mt-3 h-1 w-full bg-[var(--line-hairline)]">
            <div
              className="h-1 bg-[var(--accent)] transition-all"
              style={{ width: `${(Math.min(stepIndex + 1, totalSteps) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {startedFrom && phase === "audience" && (
        <p className="mb-6 border border-[var(--line-hairline)] bg-[var(--surface-card)] p-4 text-[14px] text-[var(--text-muted)]">
          {startedFrom}
        </p>
      )}

      {phase === "audience" && (
        <StepChoices
          title="Are you an individual or a company?"
          options={AUDIENCE_OPTIONS}
          onPick={(key) => pickAudience(key as Audience)}
        />
      )}

      {phase === "intent" && (
        <StepChoices
          title="Are you looking to sell or buy metal?"
          options={INTENT_OPTIONS}
          onPick={(key) => pickIntent(key as Intent)}
        />
      )}

      {phase === "identify" && (
        <StepChoices title="Which of these fits best?" options={identifyOptions} onPick={pickIdentify} />
      )}

      {(phase === "email" || phase === "submitting" || phase === "error") && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="font-display text-[26px] sm:text-[30px]">Last step — your email</h2>
          <p className="text-[15px] text-[var(--text-muted)]">
            {audienceLabel} · {intentLabel} · {identifyLabel}
          </p>
          {/* Honeypot -- real visitors never see this field. */}
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full rounded-sm border border-[var(--line-hairline)] bg-[var(--surface-page)] px-4 py-3 text-[17px] text-[var(--text-body)] outline-none transition-colors focus:border-[var(--accent)]"
          />
          <Btn type="submit" variant="primary" disabled={!emailValid || phase === "submitting"}>
            {phase === "submitting" ? "Sending…" : "Get my firm offer"}
          </Btn>
          {phase === "error" && (
            <p className="text-[14px] text-[var(--text-muted)]">
              {errorMsg}{" "}
              <a href={mailtoFallback()} className="text-[var(--accent-press)] underline">
                Email us directly instead
              </a>
              .
            </p>
          )}
          <p className="text-[12.5px] text-[var(--text-muted)]">
            Submitting does not create a contract. All enquiries handled in confidence.
          </p>
        </form>
      )}

      {phase === "done" && (
        <div className="border border-[var(--line-hairline)] bg-[var(--surface-card)] p-8 text-center">
          <Overline>Request received</Overline>
          <p className="mt-4 text-[18px] text-[var(--text-body)]">
            We'll come back to you with an indicative offer, usually the same working day.
          </p>
        </div>
      )}
    </div>
  );
}

function StepChoices({
  title,
  options,
  onPick,
}: {
  title: string;
  options: { key: string; label: string }[];
  onPick: (key: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-[26px] sm:text-[30px]">{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => onPick(o.key)}
            className="border border-[var(--line-hairline)] bg-[var(--surface-card)] p-5 text-left text-[16px] text-[var(--text-body)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-press)]"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
