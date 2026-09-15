"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BlockTextareaProps {
  value: string;
  placeholder: string;
  className?: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export function BlockTextarea({
  value,
  placeholder,
  className,
  autoFocus,
  onChange,
  onKeyDown,
}: BlockTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.max(element.scrollHeight, 28)}px`;
  }, [value]);

  useEffect(() => {
    if (!autoFocus) return;
    const element = ref.current;
    if (!element) return;
    element.focus();
    const end = element.value.length;
    element.setSelectionRange(end, end);
  }, [autoFocus]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
      className={cn(
        "block w-full resize-none overflow-hidden bg-transparent",
        "border-0 p-0 text-white/88 shadow-none outline-none",
        "placeholder:text-white/25",
        "focus-visible:ring-0",
        className,
      )}
    />
  );
}
