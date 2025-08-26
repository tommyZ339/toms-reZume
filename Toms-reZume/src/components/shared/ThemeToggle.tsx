"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const ThemeToggle = ({ children }: { children?: React.ReactNode }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const t = useTranslations("home.theme");
  const [mounted, setMounted] = React.useState(false);

  // 确保组件挂载后再渲染
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 在客户端渲染之前返回null
  if (!mounted) {
    return null;
  }

  // 获取当前实际主题
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!children ? (
          <Button
            variant="outline"
            size="icon"
            className="relative overflow-hidden hover:bg-accent/50"
          >
            <Sun
              className={cn(
                "h-[1.2rem] w-[1.2rem] transition-all duration-500",
                currentTheme === "dark"
                  ? "-rotate-90 scale-0"
                  : "rotate-0 scale-100",
                  "hover:bg-accent/50"
              )}
            />
            <Moon
              className={cn(
                "absolute h-[1.2rem] w-[1.2rem] transition-all duration-500",
                currentTheme === "dark"
                  ? "rotate-0 scale-100"
                  : "rotate-90 scale-0",
                  "hover:bg-accent/50"
              )}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        ) : (
          children
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t("light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t("dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {t("system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
