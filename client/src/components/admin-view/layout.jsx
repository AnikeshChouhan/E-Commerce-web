import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader } from "./header";
import { AdminSidebar } from "./sidebar";

export const AdminLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <>
      <div className="flex min-h-screen w-full">
        {/* sidebar */}
        <AdminSidebar open={openSideBar} setOpen={setOpenSideBar} />
        <div className="flex flex-1 flex-col">
          {/* header */}
          <AdminHeader setOpen={setOpenSideBar} />
          <main className="flex-1 flex-col bg-muted/40 p-4 md:p-6 ">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
