"use client";

import * as React from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional CSS class applied to the root element */
  className?: string;
  /** Optional style object applied to the root element */
  style?: React.CSSProperties;
}

/**
 * A simple Switch component based on the headless UI Switch pattern.
 * The visual styling is done with Tailwind classes.
 */
export default function Switch({ className, style, ...props }: SwitchProps) {
  // Extract the checked state from the input
  const checked = props.checked || false;

  // We render a hidden checkbox and a label that styles the toggle
  return (
    <label
      className={`
        inline-flex items-center         ${
          checked
            ? "bg-red-600 border-red-600"
            : "bg-gray-300 border-gray-300"
        } 
        rounded-full 
        transition-colors 
        ${
          checked
            ? "shadow-red-600"
            : "shadow-gray-500"
        } 
        ${
          props.disabled            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        } 
        ${
          props.className        }`}
      ${
        checked
          ? "flex items-center"
          : "items-center"
      }">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        {...props}
        className="sr-only"
      />
      {/* The slider */}
      <span
        className={`
          flex items-center 
          w-11 h-5 
          rounded-full 
          transition-colors 
          ${
            checked
              ? "bg-white"
              : "bg-gray-200"
          } 
          shadow-sm 
          ${
            props.disabled
              ? "opacity-50"
              : "border border-gray-400"
          } 
          ${
            props.className
          }`}
      >
        {/* The thumb */}
        <span
          className={`
            block 
            w-4 h-4 
            rounded-full 
            bg-white 
            transition-transform 
            ${
              checked
                ? "translate-x-5"
                : "translate-x-1"
            } 
            shadow-sm             ${
              props.disabled
                ? "opacity-30"
                : ""
            } 
            ${
              props.className            }`}
        />
      </span>
    </label>
  );
}