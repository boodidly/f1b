"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TerminalProps {
  output: string[];
  isFullscreen?: boolean;
}

export function Terminal({ output, isFullscreen = false }: TerminalProps) {
  const [darkGlow, setDarkGlow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isFullscreen) {
      timeout = setTimeout(() => {
        setDarkGlow(true);
      }, 7000);
    } else {
      setDarkGlow(false);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isFullscreen]);

  return (
    <div 
      className={cn(
        "h-full rounded-lg overflow-hidden transition-all duration-1000",
        "terminal",
        darkGlow && "dark-glow"
      )}
    >
      <ScrollArea className="h-full p-4">
        <div className="terminal-font text-sm text-[#D4D4D4] whitespace-pre-wrap terminal-content">
          {output.map((line, i) => (
            <div key={i} className="min-h-[20px]">
              {line}
            </div>
          ))}
          <span className="terminal-cursor">_</span>
        </div>
      </ScrollArea>
    </div>
  );
}