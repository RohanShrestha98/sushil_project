import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return (
    <div className="w-1/4 bg-white flex flex-col px-4 h-[100vh]">
      <div className="font-bold text-3xl text-center mt-5">Yatra</div>
      <div className="mt-5 flex flex-col items-start w-[100%] h-full">
        <div
          onClick={() => navigate("/")}
          className="font-semibold text-white text-xs mt-2 w-[100%] hover:bg-blue-500 cursor-pointer pl-4 flex items-center bg-blue-600 h-10 rounded-md"
        >
          Dashboard
        </div>
        <div className="font-semibold my-2 justify-between flex">Vechicles</div>
        <div className="mt-2 w-[100%] text-xs text-white flex flex-col gap-2">
          <div
            onClick={() => navigate("/package/")}
            className="w-[100%] hover:bg-blue-500 cursor-pointer pl-4 flex items-center bg-blue-600 h-10 rounded-md"
          >
            View vehicle
          </div>
          <div
            onClick={() => navigate("/package/add")}
            className="w-[100%] hover:bg-blue-500 cursor-pointer pl-4 flex items-center bg-blue-600 h-10 rounded-md"
          >
            Add vehicle
          </div>
        </div>
        <div className="flex justify-between font-semibold my-2">Renting</div>
        <div
          onClick={() => navigate("/request")}
          className="w-[100%] text-xs text-white my-2 hover:bg-blue-500 cursor-pointer pl-4 flex items-center bg-blue-600 h-10 rounded-md"
        >
          Rent Requests
        </div>
        <div
          onClick={handleLogout}
          className="w-[100%] text-xs text-white hover:bg-red-500 cursor-pointer pl-4 flex items-center bg-red-600 h-10 rounded-md"
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
