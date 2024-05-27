import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "@/contexts/authContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [active, setActive] = useState(location.pathname)

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return (
    <div className="w-1/4 bg-white flex flex-col px-4 h-[100vh] justify-between">
      <div>
        <div className="font-semibold text-blue-600 text-2xl mt-5">Yatra</div>
        <div className="mt-5 flex flex-col items-start w-[100%] h-full">
          <div
            onClick={() => {
              navigate("/")
              setActive("/")
            }}
            className={`border-l-[5px] cursor-pointer border-blue-600 px-3 py-2 font-semibold hover:bg-blue-50 w-[100%] ${active === "/" ? "bg-blue-50" : ""}`}
          >
            Dashboard
          </div>
          <div className="font-semibold my-2 mt-4 justify-between flex">Vechicles</div>
          <div className="mt-2 w-[100%]  flex flex-col gap-2">
            <div
              onClick={() => {
                navigate("/package")
                setActive("/package")
              }}
              className={`border-l-[5px] cursor-pointer  border-blue-600 px-3 py-2 font-semibold hover:bg-blue-50 w-[100%] ${active === "/package" ? "bg-blue-50" : ""}`}
            >
              View vehicle
            </div>
            <div
              onClick={() => {
                navigate("/package/add")
                setActive("/package/add")
              }}
              className={`border-l-[5px] cursor-pointer  border-blue-600 px-3 py-2 font-semibold hover:bg-blue-50 w-[100%] ${active === "/package/add" ? "bg-blue-50" : ""}`}
            >
              Add vehicle
            </div>
          </div>
          <div className="flex justify-between font-semibold my-2">Renting</div>
          <div
            onClick={() => {
              navigate("/request")
              setActive("/request")
            }}
            className={`border-l-[5px] cursor-pointer  border-blue-600 px-3 py-2 font-semibold hover:bg-blue-50 w-[100%] ${active === "/request" ? "bg-blue-50" : ""}`}
          >
            Rent Requests
          </div>

        </div>
      </div>
      <div
        onClick={handleLogout}
        className="w-[100%] text-red-600 font-semibold cursor-pointer pl-4 flex items-center  h-10 rounded-md"
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
