import { useEffect, useState } from "react";
import iconmark from "@/assets/tvg-iconmark.png.asset.json";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeT = setTimeout(() => setFade(true), 900);
    const hideT = setTimeout(() => setShow(false), 1500);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(hideT);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "var(--tvg-ink-800)" }}
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src={iconmark.url}
          alt=""
          className="h-32 w-auto md:h-40 tvg-ingot-pulse"
        />
        <div className="h-[2px] w-16 overflow-hidden" style={{ background: "rgba(196,154,92,0.2)" }}>
          <div className="tvg-ingot-bar h-full w-full" style={{ background: "var(--accent)" }} />
        </div>
      </div>
      <style>{`
        @keyframes tvgIngotPulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes tvgIngotBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .tvg-ingot-pulse { animation: tvgIngotPulse 1.6s ease-in-out infinite; }
        .tvg-ingot-bar { animation: tvgIngotBar 1.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
