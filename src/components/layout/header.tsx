
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { navItems } from "@/lib/data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent mismatch by delaying client-specific rendering
  if (!isMounted) {
    // Render a default state on the server and initial client render
    return (
        <header className="fixed top-0 z-50 w-full transition-colors duration-300 bg-card/80 backdrop-blur-sm border-b">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
                <Logo />
                 <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2" />
                 <div className="flex items-center justify-end gap-2">
                    <Button asChild className="hidden sm:flex" variant={'default'}>
                        <Link href="/contato">Fale com um especialista</Link>
                    </Button>
                     <Sheet>
                        <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                        </SheetTrigger>
                     </Sheet>
                 </div>
            </div>
        </header>
    );
  }

  return (
    <header className="fixed top-0 z-50 w-full transition-colors duration-300 bg-card/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) =>
            item.subItems ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-sm font-medium transition-colors px-3 py-2 gap-1 hover:underline underline-offset-4 text-foreground/80 hover:text-primary",
                      item.subItems.some((sub) => pathname.startsWith(sub.href)) && "text-primary"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.subItems.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href} passHref>
                      <DropdownMenuItem>
                        <div>
                            <div className="font-medium">{subItem.label}</div>
                            <p className="text-xs text-muted-foreground">{subItem.description}</p>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  "text-sm font-medium transition-colors px-3 py-2 hover:underline underline-offset-4 text-foreground/80 hover:text-primary",
                  pathname === item.href && "text-primary"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <Button asChild className="hidden sm:flex" variant={'default'}>
            <Link href="/contato">Fale com um especialista</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="p-4">
                <Logo />
                <div className="mt-8 flex flex-col gap-4">
                  {navItems.map((item) => (
                     item.href ? (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          {item.label}
                        </Link>
                     ) : (
                        <div key={item.label}>
                            <h4 className="font-semibold mb-2">{item.label}</h4>
                            <div className="flex flex-col gap-2 pl-4">
                            {item.subItems?.map(subItem => (
                                 <Link
                                 key={subItem.href}
                                 href={subItem.href}
                                 className={cn(
                                   "text-base font-medium transition-colors hover:text-primary",
                                   pathname === subItem.href ? "text-primary" : "text-muted-foreground"
                                 )}
                               >
                                 {subItem.label}
                               </Link>
                            ))}
                            </div>
                        </div>
                     )
                  ))}
                </div>
                 <Button asChild className="mt-8 w-full">
                    <Link href="/contato">Fale com um especialista</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
