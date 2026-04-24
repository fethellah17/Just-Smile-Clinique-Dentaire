import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MapPin } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-card px-4 gap-4">
            <SidebarTrigger />
            <div className="flex-1" />
            <span className="text-xs text-muted-foreground hidden sm:block">
              Dr. Souidi H. Ep Belmekki
            </span>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
          <footer className="border-t bg-card px-4 py-3 text-xs text-muted-foreground flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            Souk El Tenine, Oulhaca El Gherraba, Ain Temouchent
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
