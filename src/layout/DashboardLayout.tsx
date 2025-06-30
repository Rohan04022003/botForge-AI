import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import UserOnboardingModal from "@/components/UserOnboardingModal";

const DashboardLayout = () => {
  const { user } = useUser();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "17rem",
        } as React.CSSProperties
      }
    >
      {!user && <UserOnboardingModal />}

      {user && (
        <>
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col pt-0 px-4">
              <Header />
              <Outlet />
            </div>
          </SidebarInset>
        </>
      )}
    </SidebarProvider>
  );
};

export default DashboardLayout;
