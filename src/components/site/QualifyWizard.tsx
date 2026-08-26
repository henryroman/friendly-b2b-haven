import { useMemo, useState, type FormEvent } from "react";
import { Overline, Btn } from "./Section";
import {
  SEGMENTS,
  VALUE_QUESTION,
  TIMELINE_QUESTION,
  segmentByKey,
  type SegmentKey,
  type ChoiceQuestion,
} from "@/lib/qualify-data";
import { submitQualifyForm, type QualifySubmission } from "@/lib/qualify-submit";

// Multi-step, multiple-choice self-qualifying form for /sell-your-metal.
// Replaces routing the calculator's "Get a firm offer" straight into the
// general enquiry form -- H asked for something stronger: a real
// qualifying flow, branched by which of TVG's five ideal-customer types
// (see qualify-data.ts) the visitor actually is, ending in a single email
// to the desk rather than a bare contact form. No CRM write, no account,
// no new backend beyond the one server function (qualify-submit.ts).

type Phase = "segment" | "questions" | "value" | "timeline" | "contact" | "submitting" | "done" | "error";

const inputCls =
  "w-full rounded-sm border border-[var(--line-hairline)] bg-[var(--surface-page)] px-4 py-3 text-[15px] text-[var(--text-body)] outline-none transition-colors focus:border-[var(--accent)]";
const labelCls =
  "font-display block text-[12px] uppercase tracking-[var(--tracking-overline)] text-[var(--text-muted)] mb-2";

export function QualifyWizard({
  initialMetal = "",
  initialNote = "",
}: {
  initialMetal?: string;
  initialNote?: string;
}) {
  const [phase, setPhase] = useState<Phase>("segment");
  const [segment, setSegment] = useState<SegmentKey | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [value, setValue] = useState("");
  const [timeline, setTimeline] = useState("");
  const [contact, setContact] = useState({ name: "", company: "", email: "", phone: "", location: "", notes: "" });
  const [honeypot, setHoneypot] = useState("");

  const segmentData = segment ? segmentByKey(segment) : null;

  // A visitor arriving from the calculator (either the single "Get a firm
  // offer" button or the saved-lots list one) already gave us useful
  // context -- surfaced as a small banner rather than re-asked, and folded
  // into the email so the desk sees exactly what the visitor was looking
  // at when they clicked through.
  const startedFrom = useMemo(() => {
    if (initialNote) return initialNote;
    if (initialMetal) return `Started from the melt calculator — ${initialMetal}.`;
    return "";
  }, [initialMetal, initialNote]);

  const totalSteps = (segmentData ? segmentData.questions.length : 1) + 4;

  function currentStepNumber(): number {
    if (phase === "segment") return 1;
    if (!segmentData) return 1;
    if (phase === "questions") return 2 + questionIndex;
    if (phase === "value") return 2 + segmentData.questions.length;
    if (phase === "timeline") return 3 + segmentData.questions.length;
    return 4 + segmentData.questions.length;
  }

  function pickSegment(key: SegmentKey) {
    setSegment(key);
    setQuestionIndex(0);
    setAnswers({});
    setPhase("questions");
  }

  function answerQuestion(q: ChoiceQuestion, option: string) {
    setAnswers((a) => ({ ...a, [q.id]: option }));
    if (segmentData && questionIndex < segmentData.questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setPhase("value");
    }
  }

  function goBack() {
    if (phase === "questions") {
      if (questionIndex > 0) {
        setQuestionIndex((i) => i - 1);
      } else {
        setPhase("segment");
      }
      return;
    }
    if (phase === "value") {
      if (segmentData && segmentData.questions.length > 0) {
        setQuestionIndex(segmentData.questions.length - 1);
        setPhase("questions");
      } else {
        setPhase("segment");
      }
      return;
    }
    if (phase === "timeline") {
      setPhase("value");
      return;
    }
    if (phase === "contact" || phase === "error") {
      setPhase("timeline");
      return;
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim() || !segmentData) return;
    setPhase("submitting");

    const payload: QualifySubmission = {
      segment: segmentData.key,
      segmentLabel: segmentData.label,
      answers: segmentData.questions.map((q) => ({ question: q.question, answer: answers[q.id] ?? "" })),
      value,
      timeline,
      name: contact.name,
      company: contact.company,
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      notes: contact.notes,
      startedFrom,
      honeypot,
    };

    try {
      const result = await submitQualifyForm({ data: payload });
      setPhase(result.ok ? "done" : "error");
    } catch {
      setPhase("error");
    }
  }

  function mailtoFallback(): string {
    if (!segmentData) return "mailto:info@tessvanghert.com";
    const lines = [
      `Segment: ${segmentData.label}`,
      ...segmentData.questions.map((q) => `${q.question} ${answers[q.id] ?? "—"}`),
      `Value range: ${value || "—"}`,
      `Timeline: ${timeline || "—"}`,
      `Company: ${contact.company || "—"}`,
      `Location: ${contact.location || "—"}`,
      "",
      contact.notes || "",
    ].join("\n");
    const subject = `Sell your metal — ${segmentData.label} — ${contact.company || contact.name}`;
    return `mailto:info@tessvanghert.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
  }

  return (
    <div>
      {phase !== "done" && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Overline>
              Step {currentStepNumber()} of {totalSteps}
            </Overline>
            {phase !== "segment" && (
              <button
                type="button"
                onClick={goBack}
                className="font-display text-[12px] uppercase tracking-[var(--tracking-overline)] text-[var(--text-muted)] underline transition-colors hover:text-[var(--accent-press)]"
              >
                Back
              </button>
            )}
          </div>
          <div className="mt-3 h-[3px] w-full bg-[var(--line-hairline)]">
            <div
              className="h-full bg-[var(--accent)] transition-all"
              style={{ width: `${Math.min(100, (currentStepNumber() / totalSteps) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {startedFrom && phase === "segment" && (
        <p className="mb-6 border-l-2 border-[var(--accent)] pl-4 text-[14.5px] leading-[1.6] text-[var(--text-muted)]">
          {startedFrom}
        </p>
      )}

      {phase === "segment" && (
        <div>
          <h2 className="font-display text-[26px] sm:text-[28px]">Which of these best describes you?</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SEGMENTS.map((s) => (
              <ChoiceCard key={s.key} label={s.label} description={s.description} onClick={() => pickSegment(s.key)} />
            ))}
          </div>
        </div>
      )}

      {phase === "questions" && segmentData && (
        <QuestionStep question={segmentData.questions[questionIndex]} onAnswer={(opt) => answerQuestion(segmentData.questions[questionIndex], opt)} />
      )}

      {phase === "value" && (
        <QuestionStep
          question={VALUE_QUESTION}
          onAnswer={(opt) => {
            setValue(opt);
            setPhase("timeline");
          }}
        />
      )}

      {phase === "timeline" && (
        <QuestionStep
          question={TIMELINE_QUESTION}
          onAnswer={(opt) => {
            setTimeline(opt);
            setPhase("contact");
          }}
        />
      )}

      {(phase === "contact" || phase === "submitting" || phase === "error") && (
        <div>
          <h2 className="font-display text-[26px] sm:text-[28px]">Last step — how should we reach you?</h2>
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-5">
            {/* Honeypot -- visually hidden, real visitors never see or fill this */}
            <div style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
              <label htmlFor="qw-website">Leave this field empty</label>
              <input
                id="qw-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="qw-name">Full name</label>
                <input id="qw-name" required type="text" className={inputCls} value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls} htmlFor="qw-company">Company</label>
                <input id="qw-company" type="text" className={inputCls} value={contact.company} onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="qw-email">Email</label>
                <input id="qw-email" required type="email" className={inputCls} value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls} htmlFor="qw-phone">Phone</label>
                <input id="qw-phone" type="tel" className={inputCls} value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className={labelCls} htmlFor="qw-location">Location of the metal</label>
              <input id="qw-location" type="text" placeholder="City, country" className={inputCls} value={contact.location} onChange={(e) => setContact((c) => ({ ...c, location: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls} htmlFor="qw-notes">Anything else</label>
              <textarea id="qw-notes" rows={4} className={inputCls} value={contact.notes} onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))} />
            </div>

            {phase === "error" && (
              <div className="border-l-2 border-[var(--accent)] pl-4">
                <p className="text-[14.5px] leading-[1.6] text-[var(--text-body)]">
                  Something went wrong sending this through automatically. Please email us directly and we&apos;ll pick it up from there —
                  {" "}
                  <a href={mailtoFallback()} className="text-[var(--accent-press)] underline">
                    email info@tessvanghert.com
                  </a>
                  , or try again below.
                </p>
              </div>
            )}

            <Btn type="submit" variant="primary" className="self-start" disabled={phase === "submitting"}>
              {phase === "submitting" ? "Sending…" : "Get my firm offer"}
            </Btn>
            <p className="text-[12.5px] text-[var(--text-muted)]">
              Submitting does not create a contract. All enquiries handled in confidence.
            </p>
          </form>
        </div>
      )}

      {phase === "done" && (
        <div
          className="border-t-2 border-[var(--accent)] bg-[var(--surface-card)] p-8 text-center shadow-sm md:p-12"
          style={{ border: "1px solid var(--line-hairline)", borderTopWidth: "2px", borderTopColor: "var(--accent)" }}
        >
          <Overline>Confirmation</Overline>
          <p className="font-display mt-4 text-[22px] text-[var(--text-strong)] md:text-[26px]">
            Request received. We come back with an indicative valuation, usually within one working day.
          </p>
        </div>
      )}
    </div>
  );
}

function QuestionStep({ question, onAnswer }: { question: ChoiceQuestion; onAnswer: (option: string) => void }) {
  return (
    <div>
      <h2 className="font-display text-[26px] sm:text-[28px]">{question.question}</h2>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((opt) => (
          <ChoiceCard key={opt} label={opt} onClick={() => onAnswer(opt)} />
        ))}
      </div>
    </div>
  );
}

function ChoiceCard({ label, description, onClick }: { label: string; description?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-sm border border-[var(--line-hairline)] bg-[var(--surface-card)] px-5 py-4 text-left shadow-sm transition-colors hover:border-[var(--accent)]"
    >
      <span className="font-display block text-[16px] text-[var(--text-strong)]">{label}</span>
      {description && <span className="mt-1 block text-[14px] leading-[1.5] text-[var(--text-muted)]">{description}</span>}
    </button>
  );
}
