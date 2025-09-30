import React, { useState } from "react";
import classNames from "classnames";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  showClearButton?: boolean;
  theme?: "light" | "dark";
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  type = "text",
  showClearButton = false,
  theme = "light",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isDark = theme === "dark";

  const baseClass = classNames(
    "border rounded px-3 py-2 focus:outline-none w-full",
    isDark
      ? "text-white placeholder-gray-400"
      : "text-gray-900 placeholder-gray-500"
  );

  const variantClass = {
    filled: isDark
      ? "bg-gray-700 border-gray-600 focus:border-blue-400"
      : "bg-gray-100 border-gray-300 focus:border-blue-500",
    outlined: isDark
      ? "border-gray-600 focus:border-blue-400 bg-gray-800"
      : "border-gray-300 focus:border-blue-500 bg-white",
    ghost: isDark
      ? "border-transparent bg-transparent focus:border-blue-400"
      : "border-transparent bg-transparent focus:border-blue-500",
  };
  const sizeClass = {
    sm: "text-sm py-1",
    md: "text-base py-2",
    lg: "text-lg py-3",
  };

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label
          className={classNames(
            "mb-1 font-medium",
            isDark ? "text-gray-200" : "text-gray-700"
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={classNames(
            baseClass,
            variantClass[variant],
            sizeClass[size],
            invalid && "border-red-500",
            disabled && "bg-gray-200 cursor-not-allowed",
            loading && "pr-10",
            type === "password" && showClearButton && value && "pr-20",
            type === "password" && !showClearButton && "pr-12",
            type !== "password" && showClearButton && value && "pr-10"
          )}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
        {type === "password" && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={classNames(
              "absolute top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs rounded hover:bg-gray-100 transition-colors",
              showClearButton && value ? "right-10" : "right-2",
              isDark
                ? "text-gray-400 hover:bg-gray-700"
                : "text-gray-500 hover:bg-gray-100"
            )}
          >
            {showPassword ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.222 8.222m1.656 1.656l4.242 4.242M8.222 8.222l6.364 6.364M8.222 8.222L7.05 7.05m11.314 11.314L12 12m6.364-6.364L12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
        {showClearButton && value && !loading && (
          <button
            type="button"
            onClick={() => {
              if (onChange) {
                onChange({
                  target: { value: "" },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }}
            className={classNames(
              "absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors",
              isDark
                ? "text-gray-400 hover:bg-gray-700"
                : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {helperText && !invalid && (
        <span
          className={classNames(
            "text-sm mt-1",
            isDark ? "text-gray-300" : "text-gray-500"
          )}
        >
          {helperText}
        </span>
      )}
      {invalid && errorMessage && (
        <span
          className={classNames(
            "text-sm mt-1",
            isDark ? "text-red-400" : "text-red-500"
          )}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputField;
