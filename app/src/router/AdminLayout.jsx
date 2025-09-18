import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidemenu from "../layout/Sidemenu";

const AdminLayout = () => {
  const [toggle, setToggle] = useState("true");
  const [isFixed, setIsFixed] = useState(false);

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidemenu
        setToggle={setToggle}
        setIsFixed={setIsFixed}
        className={`fixed top-0 left-0 h-full bg-gray-900 text-gray-100 transition-width duration-300 ease-in-out ${
          toggle ? "w-64" : isFixed ? "w-16" : "w-20"
        }`}
      />

      <main className="flex-1 flex flex-col overflow-y-auto ">
        <div className="container mx-auto p-5 h-screen border border-gray-300 rounded-2xl shadow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
