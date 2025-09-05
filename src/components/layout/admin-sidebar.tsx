
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, LogOut, History, PanelLeft } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export function AdminSidebar() {
    const pathname = usePathname();
    const { isMobile } = useSidebar();

    const navLinks = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/pages', label: 'Páginas', icon: FileText },
        { href: '/admin/history', label: 'Histórico', icon: History },
    ];
    
    return (
        <Sidebar 
            collapsible="icon" 
            className="bg-primary text-primary-foreground"
        >
            <SidebarHeader>
                 <div className="flex items-center justify-center">
                    <Logo variant="light" className="group-data-[collapsible=icon]:hidden"/>
                 </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navLinks.map(link => (
                        <SidebarMenuItem key={link.href}>
                             <SidebarMenuButton
                                asChild
                                isActive={pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))}
                                tooltip={{children: link.label}}
                                className="text-primary-foreground data-[active=true]:bg-white/10 data-[active=true]:text-white hover:bg-white/10 hover:text-white group-data-[collapsible=icon]:justify-center"
                            >
                                <Link href={link.href}>
                                    <link.icon />
                                    <span>{link.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <form action="/auth/signout" method="post" className="w-full">
                    <SidebarMenuButton asChild tooltip={{children: 'Sair'}} className="text-primary-foreground hover:bg-white/10 hover:text-white group-data-[collapsible=icon]:justify-center">
                        <button type="submit" className="w-full">
                            <LogOut />
                            <span>Sair</span>
                        </button>
                    </SidebarMenuButton>
                </form>
            </SidebarFooter>
        </Sidebar>
    )
}
