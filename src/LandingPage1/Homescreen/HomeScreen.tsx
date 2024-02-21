import ABetter from "./ABetter";
import Everything from "./Everything";
import StartUsing from "./StartUsing";
import TrustedBy from "./TrustedBy";
import WorkWithUs from "./WorkWithUs";

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LandingScreen = () => {
  return (
    <div>
      <WorkWithUs />
      <ABetter />
      <TrustedBy />
      <Everything />
      <StartUsing />
    </div>
  );
};

export default LandingScreen;
