"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  dividerBefore?: boolean;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
}

export default function Dropdown({
  trigger,
  items,
  align = "left",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>

      <div
        className={`
          absolute 
          ${align === "right" ? "right-0" : "left-0"}
          bg-[#f9f9f9] border border-[#a0a0a0] dropdown-shadow
          min-w-[180px] py-1
          transition-all duration-[120ms] origin-top-left
          ${
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        {items.map((item, index) => (
          <div key={index}>
            {item.dividerBefore && (
              <div className="h-px bg-[#e0e5ec] my-1 mx-2" />
            )}
            <button
              disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick?.();
                  setOpen(false);
                }
              }}
              className="
                w-full flex items-center gap-2.5 py-1.5
                text-[12px] text-left whitespace-nowrap
                transition-colors duration-100
                disabled:opacity-40 disabled:cursor-not-allowed
                [&>svg]:text-[#5a7a9a]
                text-[#2c2c2c] hover:bg-[#95cdfb]
              "
            >
              <div className="w-6 flex items-center justify-center">
                {item.icon && <div className="ml-2">{item.icon}</div>}
              </div>
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
