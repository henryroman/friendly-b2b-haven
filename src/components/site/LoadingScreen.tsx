import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * TVG loading screen — molten gold pouring from a crucible into an ingot mould.
 * Shows on initial load and during route transitions.
 */
export function LoadingScreen() {
  const status = useRouterState({ select: (s) => s.status });
  const isLoading = status === "pending";

  const [initial, setInitial] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Minimum loader time = one full pour cycle (3.6s) + small buffer so the
    // animation always plays fully before fading out.
    const fadeT = setTimeout(() => setFade(true), 3800);
    const hideT = setTimeout(() => setInitial(false), 4400);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(hideT);
    };
  }, []);

  const show = initial || isLoading;
  if (!show) return null;
  const fading = initial && fade && !isLoading;

  return (
    <div
      aria-hidden="true"
      role="status"
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 40%, #1a1c24 0%, #0c0d12 70%)",
      }}
    >
      <div className="flex flex-col items-center gap-8 px-6">
        <GoldPour />
        <div className="flex flex-col items-center gap-3">
          <p
            className="font-display text-[13px] uppercase"
            style={{
              letterSpacing: "0.32em",
              color: "var(--tvg-gold-400)",
            }}
          >
            Tess Van Ghert
          </p>
          <p
            className="font-display text-[11px] uppercase"
            style={{
              letterSpacing: "0.22em",
              color: "rgba(240,237,232,0.45)",
            }}
          >
            Assaying the page
          </p>
        </div>
      </div>

      <style>{`
        @keyframes tvgPourStream {
          0%   { transform: scaleY(0); opacity: 0; }
          15%  { transform: scaleY(1); opacity: 1; }
          85%  { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
        @keyframes tvgCrucibleTilt {
          0%, 12%   { transform: rotate(0deg); }
          22%, 78%  { transform: rotate(-32deg); }
          88%, 100% { transform: rotate(0deg); }
        }
        @keyframes tvgFill {
          0%, 12%  { transform: translateY(64px); }
          85%      { transform: translateY(0px); }
          100%     { transform: translateY(0px); }
        }
        @keyframes tvgShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes tvgSparkle {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0.6); }
          40%      { opacity: 1; transform: translateY(-8px) scale(1); }
          80%      { opacity: 0; transform: translateY(-18px) scale(0.4); }
        }
        @keyframes tvgGlow {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }

        .tvg-crucible   { transform-origin: 78% 60%; animation: tvgCrucibleTilt 3.6s ease-in-out infinite; }
        .tvg-stream     { transform-origin: top center; animation: tvgPourStream 3.6s ease-in-out infinite; }
        .tvg-fill       { animation: tvgFill 3.6s ease-in-out infinite; }
        .tvg-shimmer    { animation: tvgShimmer 2.2s linear infinite; }
        .tvg-glow       { animation: tvgGlow 2.2s ease-in-out infinite; }
        .tvg-spark      { animation: tvgSparkle 1.4s ease-in-out infinite; }
        .tvg-spark.s2   { animation-delay: 0.35s; }
        .tvg-spark.s3   { animation-delay: 0.7s;  }
        .tvg-spark.s4   { animation-delay: 1.05s; }
      `}</style>
    </div>
  );
}

function GoldPour() {
  return (
    <svg
      width="260"
      height="240"
      viewBox="0 0 260 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_40px_rgba(196,154,92,0.25)]"
    >
      <defs>
        <linearGradient id="tvg-gold-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f5d99a" />
          <stop offset="45%"  stopColor="#d4b27e" />
          <stop offset="100%" stopColor="#9a7740" />
        </linearGradient>
        <linearGradient id="tvg-stream-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f9e3a8" />
          <stop offset="100%" stopColor="#c49a5c" />
        </linearGradient>
        <linearGradient id="tvg-mould-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#262934" />
          <stop offset="100%" stopColor="#111218" />
        </linearGradient>
        <linearGradient id="tvg-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
          <stop offset="50%"  stopColor="rgba(255,245,210,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="tvg-heat" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%"   stopColor="rgba(255,200,120,0.55)" />
          <stop offset="100%" stopColor="rgba(255,200,120,0)" />
        </radialGradient>

        <clipPath id="tvg-mould-clip">
          {/* Trapezoid ingot mould (wider at top) */}
          <path d="M 56 168 L 204 168 L 188 226 L 72 226 Z" />
        </clipPath>
      </defs>

      {/* Heat halo behind crucible */}
      <circle cx="180" cy="60" r="60" fill="url(#tvg-heat)" className="tvg-glow" />

      {/* Crucible */}
      <g className="tvg-crucible">
        <path
          d="M 138 28 H 222 L 214 76 Q 180 92 146 76 Z"
          fill="url(#tvg-gold-grad)"
          stroke="#7a5d30"
          strokeWidth="1.2"
        />
        {/* Handle */}
        <path
          d="M 222 36 q 14 0 14 16 q 0 14 -12 18"
          stroke="#7a5d30"
          strokeWidth="3"
          fill="none"
        />
        {/* Rim highlight */}
        <path d="M 140 30 H 220" stroke="#fbe6b2" strokeWidth="1.4" />
        {/* Molten surface */}
        <ellipse cx="180" cy="30" rx="42" ry="5" fill="#fbe6b2" />
      </g>

      {/* Pouring stream — emerges from crucible spout */}
      <g className="tvg-stream">
        <path
          d="M 142 70 Q 138 110 132 168"
          stroke="url(#tvg-stream-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 142 70 Q 138 110 132 168"
          stroke="#fff4cf"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
      </g>

      {/* Sparks at impact point */}
      <g>
        <circle className="tvg-spark"    cx="124" cy="170" r="1.6" fill="#fbe6b2" />
        <circle className="tvg-spark s2" cx="138" cy="172" r="1.2" fill="#f5d99a" />
        <circle className="tvg-spark s3" cx="118" cy="174" r="1"   fill="#fff4cf" />
        <circle className="tvg-spark s4" cx="144" cy="170" r="1.4" fill="#f5d99a" />
      </g>

      {/* Mould (ingot form) */}
      <path
        d="M 56 168 L 204 168 L 188 226 L 72 226 Z"
        fill="url(#tvg-mould-grad)"
        stroke="#3a3e4c"
        strokeWidth="1.2"
      />

      {/* Filling gold inside mould — clipped to trapezoid, slides up over time */}
      <g clipPath="url(#tvg-mould-clip)">
        <g className="tvg-fill">
          <rect x="40" y="168" width="180" height="64" fill="url(#tvg-gold-grad)" />
          {/* Glossy meniscus highlight at top of fill */}
          <rect x="40" y="168" width="180" height="3" fill="#fbe6b2" opacity="0.9" />
          {/* Shimmer sweep */}
          <g style={{ overflow: "hidden" }}>
            <rect
              x="40"
              y="172"
              width="60"
              height="54"
              fill="url(#tvg-shine)"
              className="tvg-shimmer"
              opacity="0.6"
            />
          </g>
        </g>
      </g>

      {/* Mould top rim */}
      <path d="M 56 168 L 204 168" stroke="#5c6172" strokeWidth="1.4" />

      {/* Base shadow */}
      <ellipse cx="130" cy="230" rx="80" ry="4" fill="rgba(0,0,0,0.45)" />
    </svg>
  );
}
