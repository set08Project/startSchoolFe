import { FC } from "react";
import MainHeader from "./MainHeader";
import Footer from "./Footer";

interface iProps {
  props?: any;
}

const SchoolPage: FC<iProps> = ({ props }) => {
  return (
    <div>
      <MainHeader props={props} />

      <Footer />
    </div>
  );
};

export default SchoolPage;
