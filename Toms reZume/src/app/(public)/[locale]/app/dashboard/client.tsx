"use client";
import { useEffect, useState } from "react";
import { Cog, FileText, SwatchBook, Settings, Bot } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import Logo from "@/components/shared/Logo";
import { useLocale, useTranslations } from "next-intl";

interface MenuItem {
  title: string;
  url?: string;
  href?: string;
  icon: any;
  items?: { title: string; href: string }[];
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const sidebarItems: MenuItem[] = [
    {
      title: t("sidebar.resumes"),
      url: `/${locale}/app/dashboard/resumes`,
      icon: FileText
    },
    {
      title: t("sidebar.templates"),
      url: `/${locale}/app/dashboard/templates`,
      icon: SwatchBook
    },
    {
      title: t("sidebar.settings"),
      url: `/${locale}/app/dashboard/settings`,
      icon: Settings
    },
    {
      title: t("sidebar.ai"),
      url: `/${locale}/app/dashboard/ai`,
      icon: Bot
    }
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [collapsible, setCollapsible] = useState<"offcanvas" | "icon" | "none">(
    "icon"
  );

  useEffect(() => {
    if (pathname.includes("/workbench")) {
      setOpen(false);
    }
  }, [pathname]);

  const handleItemClick = (item: MenuItem) => {
    if (item.items) {
      // 如果有子菜单，展开/折叠子菜单
      // 这里可以添加子菜单展开/折叠的逻辑
    } else {
      // 如果没有子菜单，直接导航
      router.push(item.url || item.href || "/");
    }
  };

  const isItemActive = (item: MenuItem) => {
    if (item.items) {
      return item.items.some((subItem) => pathname === subItem.href);
    }
    return item.url === pathname || item.href === pathname;
  };

  return (
    <div className="flex h-screen bg-background">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <Sidebar collapsible={collapsible}>
          <SidebarHeader>
            <div className="w-full justify-center flex">
              <Logo
                className="cursor-pointer"
                size={40}
                onClick={() => router.push("/")}
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <TooltipProvider delayDuration={300} key={item.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuItem key={item.title} title={item.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={isItemActive(item)}
                            >
                              <div
                                className="flex items-center gap-2 p-[8px]"
                                onClick={() => handleItemClick(item)}
                              >
                                <item.icon className="w-4 h-4 shrink-0" />
                                {open && (
                                  <span className="flex-1">{item.title}</span>
                                )}
                              </div>
                            </SidebarMenuButton>
                            {item.items && open && (
                              <div className="ml-6 mt-1 space-y-1">
                                {item.items.map((subItem) => (
                                  <div
                                    key={subItem.href}
                                    className={`cursor-pointer px-2 py-1 rounded-md text-sm ${
                                      pathname === subItem.href
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-accent/50"
                                    }`}
                                    onClick={() => router.push(subItem.href)}
                                  >
                                    {subItem.title}
                                  </div>
                                ))}
                              </div>
                            )}
                          </SidebarMenuItem>
                        </TooltipTrigger>
                        {!open && (
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <main className="flex-1 flex flex-col">
          <div className="flex flex-row gap-0" >
            <div className="pl-2 pt-2 pr-0 pb-2">
              <SidebarTrigger />
            </div>
            <AnimatePresence mode="wait">
                <motion.p
                  key={open ? "left" : "right"}
                  className="pl-0 pt-3 pb-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0.8, x: 2 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0.8, x: -2 }}
                  transition={{ duration: 0.1 }}
                >
                  {open ? t("leftOfTrigger") : t("rightOfTrigger")}
                </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex-1">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
