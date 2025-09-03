import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Header } from "@/components/layout/header";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <div className="flex-1 p-8 pt-24 bg-muted/40">
                    {children}
                </div>
            </main>
        </div>
    );
}
