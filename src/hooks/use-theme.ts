import { useEffect, useState } from "react";

export type Theme = "claro" | "escuro";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "escuro");
  document.documentElement.style.colorScheme = theme === "escuro" ? "dark" : "light";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("claro");

  useEffect(() => {
    const saved = window.localStorage.getItem("marsvision-tema");
    const initial: Theme = saved === "escuro" || saved === "claro"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    window.localStorage.setItem("marsvision-tema", next);
    applyTheme(next);
  }

  return { theme, setTheme, toggleTheme: () => setTheme(theme === "escuro" ? "claro" : "escuro") };
}