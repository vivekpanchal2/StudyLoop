import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import LoaderPage from "../components/common/Loader";

export default function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (authLoading || profileLoading) {
    return <LoaderPage />;
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <div
        className={`fixed mt-[3.5rem] pt-0 md:mt-0 md:pt-[3.5rem] md:relative inset-y-0 left-0 z-10 bg-richblack-800 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block h-[calc(100vh-3.5rem)] `}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto pt-16 px-4 md:px-6 lg:px-10">
        <button
          className="absolute top-4 left-4 md:hidden bg-richblack-800 p-1"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="text-2xl text-white">
            <GiHamburgerMenu />
          </span>
        </button>
        <div className="mx-auto max-w-[1000px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
