import mainpic from "../assets/Dash.png";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BtnProps from "./Props/BtnProps";

const HeroScreen = () => {
  // let images = [mainpic, mainpic2];
  // const settings = {
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   pauseOnHover: true,
  // };

  return (
    <div className=" w-full overflow-hidden">
      <div className="h-full">
        <div>
          <img
            src={mainpic}
            alt=""
            className="w-full h-[90vh] object-cover darkk"
          />
        </div>
      </div>

      <div className="w-[80%] flex justify-center items-center flex-col absolute top-[50%] left-[50%] doublet mt-10">
        <h1 className="text-[35px] lg:text-[50px] text-white md:text-[60px] font-bold text-center ">
          Making Education Easier For Everyone
        </h1>
        <h3 className="text-center text-white lg:text-[22px] mb-5 ">
          Explore our range of services and features designed to support you. A
          goal to empower students and <b>YOUR</b> school with tools and
          resources to navigate the challenges of academic life more
          effectively. Learning how to leverage technology to enhance
          productivity, organization and learning outcomes.
        </h3>
        <BtnProps text="Get Started" />
      </div>

      <div className="w-full bg-white flex justify-center items-center">
        <div className="w-[85%]  ">
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">
                    Transactions every 24 hours
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    44 million
                  </dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">
                    Assets under holding
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    $119 trillion
                  </dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">
                    New users annually
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    46,000
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroScreen;
