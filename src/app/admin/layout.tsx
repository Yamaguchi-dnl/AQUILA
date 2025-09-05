
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <div className="flex-1 p-8 pt-24 pb-16 bg-muted/40">
                    {children}
                </div>
            </main>
        </div>
    );
}
