import Image from "next/image";
import React from "react";

type Props = { children: React.ReactNode };

export function AuthLayout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background px-6 overflow-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-5">
        <Image src="/logos/logo.svg" alt="Nodebase" width={20} height={20} />
        <span className="text-[11px] font-semibold tracking-[0.25em] text-foreground uppercase select-none font-mono">
          Nodebase
        </span>
      </div>

      {/* Content */}
      <div className="w-full max-w-sm rounded-lg border border-border shadow-sm p-6">
        {children}
      </div>

      {/* Footer */}
      <p className="mt-5 text-[10px] text-muted-foreground tracking-wider uppercase font-mono">
        Workflow Automation Platform
      </p>
    </div>
  );
}
