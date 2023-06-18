import Buttons from "../components/Buttons";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
      <div className="relative min-h-screen flex flex-col">
        {isFetching + isMutating !== 0 && <Spinner />}
        <ToastContainer />
        <NavBar />
        <Buttons />
        <div className="p-2 flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
  );
};

export default Layout;
