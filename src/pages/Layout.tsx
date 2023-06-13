import Buttons from "../components/Buttons";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { MessageProvider } from "../context/MessageProvider";

const Layout = () => {
  return (
    <MessageProvider>
      <div className="relative min-h-screen flex flex-col">
        <NavBar />
        <Buttons />
        <div className="p-2 flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </MessageProvider>
  );
};

export default Layout;
