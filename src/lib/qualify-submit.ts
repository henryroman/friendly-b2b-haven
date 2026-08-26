import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Server-side submit handler for the "Sell your metal" qualifying form
// (/sell-your-metal, QualifyWizard.tsx). Sends a structured summary of the
// visitor's answers by email via Resend's HTTPS API -- no CRM write, no new
// database, matching the scope decision for this build (email only, no
// tvg-hub changes). Same provider tvg-hub already uses for its own OTP
// login codes, so this doesn't introduce a new vendor to the account.
//
// Rebuilt 2026-08-26 alongside QualifyWizard.tsx's redesign -- schema
// trimmed to match the new four-step flow (audience/intent/identify/email),
// dropping the old per-segment answers[], value, timeline, and the
// name/company/phone/location/notes contact fields.
//
// NOTE on filename: this is a createServerFn same as metals-price.ts, and
// deliberately does NOT use a ".server.ts" filename -- TanStack Start's
// import-protection Vite plugin bans importing any **/*.server.* file into
// client-bundled code purely by filename pattern, which broke the build
// the one time this repo used that suffix (see metals-price.ts's own
// comment for the confirmed error). The createServerFn() wrapping is what
// actually enforces server-only execution at runtime, not the filename.

const submissionSchema = z.object({
  audience: z.enum(["individual", "company"]),
  audienceLabel: z.string().min(1),
  intent: z.enum(["sell", "buy"]),
  intentLabel: z.string().min(1),
  identify: z.string().min(1),
  identifyLabel: z.string().min(1),
  email: z.string().email(),
  startedFrom: z.string(),
  // Honeypot -- a real visitor never sees or fills this field (visually
  // hidden in QualifyWizard.tsx). Non-empty almost certainly means a bot.
  honeypot: z.string(),
});

export type QualifySubmission = z.infer<typeof submissionSchema>;
export type QualifySubmitResult = { ok: true } | { ok: false; error: "not_configured" | "send_failed" };

// Sending address must be on a domain verified in the org's Resend
// account before this will actually deliver -- Resend rejects sends from
// an unverified domain. Using tvg.gold's own domain as the most likely
// already-configured candidate; confirm/adjust once RESEND_API_KEY is set.
const FROM_ADDRESS = "Sell Your Metal <noreply@tvg.gold>";
const RECIPIENT = "info@tessvanghert.com";
const FETCH_TIMEOUT_MS = 8000;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: QualifySubmission): string {
  const kind = data.intent === "buy" ? "buyer" : "seller";
  return `
    <div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;color:#111218;">
      <p style="text-transform:uppercase;letter-spacing:0.08em;font-size:12px;color:#c49a5c;margin:0 0 6px;">New ${kind} lead</p>
      <h2 style="margin:0 0 4px;font-size:22px;">${escapeHtml(data.identifyLabel)}</h2>
      <p style="color:#666;margin:0 0 20px;font-size:13px;">via Sell Your Metal — tvg.gold</p>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
        <tr><td style="padding:5px 16px 5px 0;color:#666;">Who</td><td style="padding:5px 0;font-weight:600;">${escapeHtml(data.audienceLabel)}</td></tr>
        <tr><td style="padding:5px 16px 5px 0;color:#666;">Looking to</td><td style="padding:5px 0;font-weight:600;">${escapeHtml(data.intentLabel)}</td></tr>
        <tr><td style="padding:5px 16px 5px 0;color:#666;">About</td><td style="padding:5px 0;font-weight:600;">${escapeHtml(data.identifyLabel)}</td></tr>
        <tr><td style="padding:5px 16px 5px 0;color:#666;">Email</td><td style="padding:5px 0;font-weight:600;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      </table>
      ${data.startedFrom ? `<p style="margin-top:16px;color:#666;font-size:13px;">${escapeHtml(data.startedFrom)}</p>` : ""}
    </div>
  `;
}

export const submitQualifyForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => submissionSchema.parse(data))
  .handler(async ({ data }): Promise<QualifySubmitResult> => {
    // Silently "succeed" on a filled honeypot rather than erroring -- a
    // bot that gets a clean success response has no signal to adapt to.
    if (data.honeypot) {
      return { ok: true };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "not_configured" };
    }

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_ADDRESS,
          to: [RECIPIENT],
          reply_to: data.email,
          subject: `New ${data.intent === "buy" ? "buyer" : "seller"} lead — ${data.identifyLabel} (${data.audienceLabel})`,
          html: buildEmailHtml(data),
        }),
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!res.ok) {
        return { ok: false, error: "send_failed" };
      }
      return { ok: true };
    } catch {
      // Network error, timeout, or Resend outage -- never throw into the
      // wizard. The client falls back to a mailto link so the lead is
      // never silently lost even when the API call itself fails.
      return { ok: false, error: "send_failed" };
    }
  });
