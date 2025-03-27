
import { 
  LayoutDashboard,
  ParkingCircle,
  Cog,
  ClipboardList,
  Clock,
  Package,
  Users,
  Search,
  BarChart
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: "Car Parks",
      icon: ParkingCircle,
      path: "/car-parks",
    },
    {
      title: "Equipment",
      icon: Cog,
      path: "/equipment",
    },
    {
      title: "Fault Reports",
      icon: ClipboardList,
      path: "/faults",
    },
    {
      title: "Status Tracking",
      icon: Clock,
      path: "/status",
    },
    {
      title: "Parts Management",
      icon: Package,
      path: "/parts",
    },
    {
      title: "User Management",
      icon: Users,
      path: "/users",
    },
    {
      title: "Search & Filters",
      icon: Search,
      path: "/search",
    },
    {
      title: "Analytics",
      icon: BarChart,
      path: "/analytics",
    },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-5">
        <div className="flex items-center">
          <ParkingCircle className="h-6 w-6 text-primary mr-2" />
          <span className="font-medium text-xl">Park Sentry</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 transition-colors",
                    location.pathname === item.path
                      ? "text-primary font-medium"
                      : "text-sidebar-foreground hover:text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          Park Sentry Logs v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
