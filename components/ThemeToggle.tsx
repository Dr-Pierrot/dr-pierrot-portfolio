"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { FOCUS_VISIBLE_CLASSES } from "@/lib/accessibility";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light mode" },
    { value: "dark" as const, icon: Moon, label: "Dark mode" },
    { value: "system" as const, icon: Monitor, label: "System preference" },
  ];

  return (
    <div className="flex items-center space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-label={label}
          className={`
            relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200
            ${
              theme === value
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }
            ${FOCUS_VISIBLE_CLASSES}
          `}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}
