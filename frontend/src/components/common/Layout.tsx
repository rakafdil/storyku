import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { BreadcrumbWithCustomSeparator } from "./BreaadCrumb";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/story": "Stories",
  "/story/create": "Create Story",
};

export default function Layout() {
  const location = useLocation();
  const title = titleMap[location.pathname] || "";

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full text-gray-900 py-6 px-15">
        <div className="flex items-start p-4 gap-6 flex-col">
          <BreadcrumbWithCustomSeparator />
          {title && <h1 className="text-4xl font-bold">{title}</h1>}
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
