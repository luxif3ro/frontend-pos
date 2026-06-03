"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff, Search } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  leftIcon,
  type = "text",
  className = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isSearch = type === "search";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const icon = leftIcon ?? (isSearch ? <Search size={18} /> : null);

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        <input
          {...props}
          type={inputType}
          className={`
            w-full
            rounded-2xl
            border
            border-[#2B3145]
            bg-[#0F1320]
            py-3
            text-white
            placeholder:text-gray-500
            outline-none
            transition-all
            duration-200

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20

            ${icon ? "pl-12" : "px-4"}
            ${isPassword ? "pr-12" : "pr-4"}

            ${error ? "border-red-500" : ""}
            ${className}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
              transition-colors
              hover:text-blue-400
            "
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
