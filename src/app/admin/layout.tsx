
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AdminSidebar />
                <main className="flex-1 flex flex-col">
                     <div className="p-4">
                        <SidebarTrigger />
                    </div>
                    <div className="flex-1 p-8 pt-0 pb-24 bg-background">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
