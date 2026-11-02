import { SiGithub as GithubIcon } from "@icons-pack/react-simple-icons";
import { openCommandPalette } from "@omnidotdev/thornberry/command-palette";
import { Kbd } from "@omnidotdev/thornberry/kbd";
import {
  GLOBAL_HOTKEYS,
  hotkeyLabel,
} from "@omnidotdev/thornberry/use-hotkeys";
import { Menu, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ExternalLink, InternalLink } from "@/components/core";
import { ThemeToggle } from "@/components/layout";
import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

const navLinks = [
  { label: "How it works", href: "#showcase" },
  { label: "Features", href: "#features" },
];

/**
 * Layout header with anchor nav and mobile hamburger.
 */
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Resolve the shortcut label after mount: it depends on the platform
  // (⌘K on Apple, Ctrl+K elsewhere), so rendering it on the server would
  // risk a hydration mismatch
  const [shortcut, setShortcut] = useState("");

  useEffect(() => {
    setShortcut(hotkeyLabel(GLOBAL_HOTKEYS.commandPalette));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);

    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm",
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <InternalLink to="/" variant="unstyled" className="-ml-4 gap-2">
              <img
                src="/img/taproot-mark.svg"
                alt=""
                aria-hidden
                className="h-6 w-6"
              />
              <h1 className="font-bold text-xl">{app.name}</h1>
            </InternalLink>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}

              <a
                href={app.docsUrl}
                className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                Docs
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              className="hidden items-center gap-2 rounded-md border bg-muted/40 py-1.5 pr-1.5 pl-3 text-muted-foreground text-sm transition-colors hover:text-foreground sm:flex"
              aria-label="Open command palette"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
              {shortcut && <Kbd>{shortcut}</Kbd>}
            </button>

            <ExternalLink
              variant="ghost"
              href={app.repoUrl}
              aria-label="GitHub"
              className="hidden md:inline-flex"
            >
              <GithubIcon className="size-5" />
            </ExternalLink>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-muted-foreground hover:text-foreground md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t pt-2 pb-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}

              <a
                href={app.docsUrl}
                className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
              >
                Docs
              </a>

              <ExternalLink
                variant="ghost"
                href={app.repoUrl}
                className="justify-start gap-2"
              >
                <GithubIcon className="size-4" /> GitHub
              </ExternalLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
