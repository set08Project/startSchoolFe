import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSchoolAnnouncement, useSchoolEvent } from "../hook/useSchoolAuth";
import lodash from "lodash";
import moment from "moment";

const Announcement = () => {
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  const { schoolAnnouncement } = useSchoolAnnouncement();
  const { schoolEvent } = useSchoolEvent();

  const viewNotice = schoolAnnouncement?.announcements
    ?.slice(0, 5)
    ?.concat(schoolEvent?.events?.slice(0, 5));

  const data = lodash.shuffle(viewNotice).slice(0, 5);

  return (
    <div className="w-90% mx-7">
      <Slider {...settings}>
        {data?.map((props: any, i: number) => (
          <div className="px-5" key={i}>
            <h3 className="text-[30px] ">{props.title}</h3>
            <h3 className="text-[10px] mb-2 -mt-1 opacity-75 capitalize">
              {props.date} &middot; {props?.status} &middot; posted:{" "}
              {moment(props.createdAt).fromNow()}
            </h3>
            <h3 className="text-[13px] opacity-60 font-normal h-[60px] ">
              {props.details}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Announcement;
