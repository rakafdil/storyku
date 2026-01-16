import { Book, LayoutDashboardIcon } from "lucide-react";

import { GiScrollQuill } from "react-icons/gi";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Story Management",
    url: "/story",
    icon: Book,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-center items-center text-3xl font-bold text-cyan-400 gap-2 mb-4 p-5">
            <GiScrollQuill />
            <h1>STORYKU</h1>
          </div>
          <SidebarGroupContent className="px-3">
            <SidebarMenu className="gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname.startsWith(item.url) &&
                      (item.url === "/dashboard"
                        ? location.pathname === "/dashboard"
                        : true)
                    }
                    className="py-7 px-4  data-[active=true]:bg-cyan-400 data-[active=true]:text-white data-[active=true]:ease-in-out data-[active=true]:transition-all"
                  >
                    <Link
                      to={item.url}
                      className="[&>svg]:size-6 [&>span]:text-base text-gray-800"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
