import React from "react";

type Props = { children: React.ReactNode };

export function AuthLayout({ children }: Props) {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-[#080809] px-4 py-12 overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(circle, #1f1f23 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Ambient amber glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 50% 50%, rgba(245,158,11,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-[400px] bg-[#0d0d0f]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(245,158,11,0.12), 0 0 80px -20px rgba(245,158,11,0.07), 0 32px 64px -16px rgba(0,0,0,0.95)",
        }}
      >
        {/* Top amber accent line */}
        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #f59e0b 30%, #fbbf24 50%, #f59e0b 70%, transparent 100%)",
          }}
        />

        {/* Logo */}
        <div className="px-8 pt-7 pb-5 border-b border-zinc-800/60">
          <div className="flex items-center gap-2.5">
            <NodeLogo />
            <span
              className="text-[11px] font-semibold tracking-[0.25em] text-zinc-100 uppercase select-none"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Nodebase
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-7">{children}</div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-zinc-800/60">
          <p
            className="text-[10px] text-zinc-600 tracking-wider uppercase"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Workflow Automation Platform
          </p>
        </div>
      </div>
    </div>
  );
}

function NodeLogo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Center node */}
      <circle cx="11" cy="11" r="3.5" fill="#f59e0b" />
      {/* Satellite nodes */}
      <circle cx="3" cy="11" r="1.75" fill="#f59e0b" opacity="0.45" />
      <circle cx="19" cy="11" r="1.75" fill="#f59e0b" opacity="0.45" />
      <circle cx="11" cy="3" r="1.75" fill="#f59e0b" opacity="0.45" />
      <circle cx="11" cy="19" r="1.75" fill="#f59e0b" opacity="0.45" />
      {/* Connectors */}
      <line x1="4.75" y1="11" x2="7.5" y2="11" stroke="#f59e0b" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="14.5" y1="11" x2="17.25" y2="11" stroke="#f59e0b" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="11" y1="4.75" x2="11" y2="7.5" stroke="#f59e0b" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="11" y1="14.5" x2="11" y2="17.25" stroke="#f59e0b" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}
