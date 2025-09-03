"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, FileText, LogOut, Loader2 } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type Page = {
    slug: string;
    title: string | null;
}

async function fetchPages(): Promise<Page[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('pages')
        .select('slug, title')
        .order('title', { ascending: true });

    if (error) {
        console.error("Error fetching pages:", error);
        return [];
    }
    return data;
}

export function AdminSidebar() {
    const pathname = usePathname();
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPages = async () => {
            setLoading(true);
            const pagesData = await fetchPages();
            setPages(pagesData);
            setLoading(false);
        };
        getPages();
    }, []);

    const navLinks = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    ];
    
    const renderNavLinks = () => (
        <nav className="grid items-start gap-1 px-2 text-sm font-medium">
            {navLinks.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname === link.href && "bg-muted text-primary"
                    )}
                >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                </Link>
            ))}
            
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Páginas</div>

            {loading ? (
                <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            ) : (
                pages.map(page => (
                     <Link
                        key={page.slug}
                        href={`/admin/pages/${page.slug}`}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === `/admin/pages/${page.slug}` && "bg-muted text-primary"
                        )}
                    >
                        <FileText className="h-4 w-4" />
                        {page.title || page.slug}
                    </Link>
                ))
            )}
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
