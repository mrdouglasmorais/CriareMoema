"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studioFieldClass } from "@/components/studio/field-styles";
import { studioCopy } from "@/data/studio";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  autoComplete: string;
  disabled?: boolean;
  required?: boolean;
}

export function PasswordField({
  id,
  name,
  label,
  autoComplete,
  disabled,
  required = true,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          className={cn(studioFieldClass, "pr-12")}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          disabled={disabled}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/40 transition-colors hover:text-amber-200 disabled:opacity-40"
          aria-pressed={visible}
          aria-label={visible ? studioCopy.loginHidePassword : studioCopy.loginShowPassword}
        >
          {visible ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
        </button>
      </div>
    </div>
  );
}
