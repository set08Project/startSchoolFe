import { FC } from "react";
import MainHeader from "./MainHeader";
import Footer from "./Footer";
import HeroScreen from "./HeroScreen";

interface iProps {
  props?: any;
}

const SchoolPage: FC<iProps> = ({ props }) => {
  return (
    <div>
      <MainHeader props={props} />
      <HeroScreen />
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default SchoolPage;
