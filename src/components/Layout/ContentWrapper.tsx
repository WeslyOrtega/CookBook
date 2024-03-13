import { RxHamburgerMenu, RxSun, RxMoon } from "react-icons/rx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from "@/components/theme-provider";

import { Outlet } from "react-router-dom";

const SideDrawerLinks: Array<{ href: string; text: string }> = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: ".",
    text: "Explore",
  },
  {
    href: ".",
    text: "My Recipes",
  },
  {
    href: ".",
    text: "Account",
  },
];

export default function ContentWrapper() {
  const { theme, setTheme } = useTheme();

  return (
    <Sheet>
      <nav className="flex flex-row align-middle min-h-fit h-10 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="h-full">
              <SheetTrigger asChild>
                <Button variant="ghost" className="h-full px-2">
                  <RxHamburgerMenu className="w-full h-full" />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="w-full flex flex-col items-center">
          <a href="/" className="btn no-animation btn-ghost text-xl">
            Your CookBook
          </a>
        </div>
        <div className="flex flex-row">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  {theme == "dark" && (
                    <RxSun
                      onClick={() => setTheme("light")}
                      className="size-6"
                    />
                  )}
                  {theme == "light" && (
                    <RxMoon
                      onClick={() => setTheme("dark")}
                      className="size-6"
                    />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {theme == "light" && <p>Switch to dark mode</p>}
                {theme == "dark" && <p>Switch to light mode</p>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
      <main className="p-5 flex flex-col items-center">
        <div className="max-w-screen-xl w-full">
          <Outlet />
          <Toaster />
        </div>
      </main>
      <SheetContent side="left">
        <ul className="menu p-4 w-80 bg-base-100">
          {SideDrawerLinks.map(({ href, text }, index) => (
            <li key={index}>
              <a href={href}>{text}</a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
