"use client";

import { type Dispatch, type FC, type SetStateAction, useState } from "react";
import { useTranslations } from "next-intl";

import { type IconType } from "react-icons/lib";
import { FaSun } from "react-icons/fa";
import { IoDesktop } from "react-icons/io5";
import { MdNightsStay } from "react-icons/md";

import { cn } from "~/utils/cn";

type themeTypes = "default" | "light" | "dark";

export const ThemeSwitcher: FC = () => {
  const storedTheme = localStorage.getItem("theme") || "default";

  const themes: themeTypes[] = ["default", "light", "dark"];
  const validTheme = themes.includes(storedTheme as themeTypes)
    ? (storedTheme as themeTypes)
    : "default";

  const [currentTheme, setCurrentTheme] = useState<themeTypes>(validTheme);

  return (
    <div className="flex flex-col gap-2">
      {themes.map((theme) => (
        <ThemeButton
          key={theme}
          setCurrentTheme={setCurrentTheme}
          active={currentTheme === theme}
          theme={theme}
        />
      ))}
    </div>
  );
};

interface ThemeButtonProps {
  theme: themeTypes;
  setCurrentTheme: Dispatch<SetStateAction<themeTypes>>;
  active: boolean;
}

const ThemeButton: FC<ThemeButtonProps> = ({
  theme,
  setCurrentTheme,
  active,
}) => {
  const t = useTranslations("Nav.Theme");

  let Icon: IconType;
  switch (theme) {
    case "dark":
      Icon = MdNightsStay;
      break;

    case "light":
      Icon = FaSun;
      break;

    default:
      Icon = IoDesktop;
      break;
  }

  const handleToggleTheme = (theme: themeTypes) => {
    if (theme === "default") {
      localStorage.removeItem("theme");
      setCurrentTheme("default");
    }

    if (theme === "light") {
      localStorage.theme = "light";
      setCurrentTheme("light");
    }

    if (theme === "dark") {
      localStorage.theme = "dark";
      setCurrentTheme("dark");
    }

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      className="text-md flex items-center gap-1.5 py-0.5 transition-transform hover:translate-x-1"
      onClick={() => handleToggleTheme(theme)}
    >
      <Icon
        className={cn(
          "text-lg",
          active ? "fill-colors-primary" : "fill-colors-text",
        )}
      />

      <p className={cn(active && "text-colors-primary")}>{t(theme)}</p>
    </button>
  );
};
