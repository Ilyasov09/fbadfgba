import React from "react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] p-4 md:p-8">
      {/* Phone Case Simulation */}
      <div className="relative w-[390px] h-[844px] bg-[#0b0f1a] rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-[#1a1f2e] ring-1 ring-white/10 flex flex-col">
        {/* Notch / Dynamic Island area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-[#1a1f2e] rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-10 h-1 bg-white/5 rounded-full" />
        </div>
        
        {/* Status Bar */}
        <div className="pt-8 px-8 pb-2 flex justify-between items-center text-[11px] font-medium text-white/40 z-40">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
                <div className="w-3 h-3 rounded-full border border-white/20" />
                <div className="w-4 h-2 bg-white/40 rounded-sm" />
            </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
          {children}
        </main>
        
        {/* Home Indicator */}
        <div className="h-8 flex items-end justify-center pb-2">
            <div className="w-32 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
