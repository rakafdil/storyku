import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BreadcrumbWithCustomSeparator } from "./BreaadCrumb";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/story": "Stories",
  "/story/create": "Add Story",
  "/story/create/chapter": "Add Chapter",
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = titleMap[location.pathname] || "";

  const segments = location.pathname.split("/").filter(Boolean);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full text-gray-900 py-6 px-15">
        <div className="flex items-start p-4 gap-6 flex-col">
          <BreadcrumbWithCustomSeparator />
          <div className="flex gap-10 justify-center items-center">
            {segments.length > 1 && (
              <Button
                variant={"secondary"}
                onClick={() => navigate(`/${segments.slice(0, -1).join("/")}`)}
                className="cursor-pointer"
              >
                <ArrowLeft />
                Back
              </Button>
            )}
            {title && <h1 className="text-4xl font-bold">{title}</h1>}
          </div>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
