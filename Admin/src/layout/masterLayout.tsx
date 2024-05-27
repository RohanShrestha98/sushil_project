import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom/sidebar";

const MasterLayout = () => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <Sidebar />
      <div className="bg-slate-100 w-full h-full p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MasterLayout;
