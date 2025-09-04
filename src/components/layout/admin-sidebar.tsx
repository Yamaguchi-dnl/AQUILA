
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, FileText, LogOut, History } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/pages', label: 'Páginas', icon: FileText },
        { href: '/admin/history', label: 'Histórico', icon: History },
    ];
    
    const renderNavLinks = () => (
        <nav className="grid items-start gap-1 px-2 text-sm font-medium">
            {navLinks.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        (pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))) && "bg-muted text-primary"
                    )}
                >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden border-r bg-muted/40 md:block min-w-[250px]">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Logo />
                    </div>
                    <div className="flex-1 overflow-auto py-4">
                       {renderNavLinks()}
                    </div>
                    <div className="mt-auto p-4 border-t">
                        <form action="/auth/signout" method="post">
                            <Button variant="ghost" className="w-full justify-start">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sair
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Mobile Sidebar */}
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:hidden fixed top-0 w-full z-10 bg-background">
                <Sheet>
                    <SheetTrigger asChild>
                         <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col p-0">
                         <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Logo />
                        </div>
                        <div className="flex-1 overflow-auto py-4">
                           {renderNavLinks()}
                        </div>
                         <div className="mt-auto p-4 border-t">
                            <form action="/auth/signout" method="post">
                                <Button variant="ghost" className="w-full justify-start">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sair
                                </Button>
                            </form>
                        </div>
                    </SheetContent>
                </Sheet>
                 <Logo />
            </header>
        </>
    )
}
