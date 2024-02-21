import { Outlet } from "react-router-dom";
import Header from "./Static/Header";
import Footer from "../mainPage/Footer";

const LandingLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingLayout;
