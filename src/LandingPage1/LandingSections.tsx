import CoursesProps from "../Components/Props/CoursesProps";
import TeacherProps from "../Components/Props/TeacherProps";
import dumy from "../assets/dummy.jpg";
import avatar from "../assets/avatar.png";
import girll from "../assets/service2.png";
import help from "../assets/help.png";
import biology from "../assets/mainimgs/Biology.jpeg";
import agric from "../assets/mainimgs/Agric.png";
import physics from "../assets/mainimgs/Physics.jpeg";
import computer from "../assets/mainimgs/Computersci.png";
import gallery1 from "../assets/mainimgs/Labkids.jpg";
import gallery2 from "../assets/mainimgs/istockphoto-950614324-612x612.jpg";
import gallery3 from "../assets/mainimgs/Teacherandstudents.jpg";
import gallery4 from "../assets/mainimgs/Classkids.jpg";
import gallery5 from "../assets/mainimgs/Child1.jpg";
import gallery6 from "../assets/mainimgs/Child2.jpg";
import student1 from "../assets/mainimgs/Studygirl.jpeg";
import student2 from "../assets/mainimgs/Laptopgirl.jpg";
import student3 from "../assets/mainimgs/images (26).jpeg";
import teacher1 from "../assets/mainimgs/Techer1.jpg";
import teacher2 from "../assets/mainimgs/Teacher4.jpg";
import teacher3 from "../assets/mainimgs/Teacher3.jpeg";
import bg from "../assets/Layerbg-1.jpg";
import GalleryProps from "../Components/Props/GalleryProps";
import TestimonialProps from "../Components/Props/TestimonialProps";
import StudentProps from "../Components/Props/StudentProps";
import {
  AiFillDatabase,
  AiFillHome,
  AiFillPhone,
  AiOutlineAreaChart,
  AiOutlineMail,
  AiOutlinePicture,
} from "react-icons/ai";
import StatsProps from "../Components/Props/StatsProps";
import ContactProps from "../Components/Props/ContactProps";
import { FaFax, FaLocationArrow } from "react-icons/fa";
import aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LandingSections = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  const testimonials = [
    {
      name: "Prince John",
      job: "Entrepreneur",
      year: "2015-2024",
      img: avatar,
    },
    {
      name: "Joan Felixx",
      job: "Fireman",
      year: "2019-2024",
      img: girll,
    },
    {
      name: "Wizzy Rossel",
      job: "Entrepreneur",
      year: "2015-2024",
      img: dumy,
    },
    {
      name: "Justia Ada",
      job: "Fireman",
      year: "2019-2024",
      img: help,
    },
  ];

  useEffect(() => {
    aos.init({});
  }, []);
  return (
    <div>
      <div className="w-full bg-gray-100 flex justify-center items-center">
        <div className="w-[85%] py-[50px]  grid grid-cols-1 md:grid-cols-2 place-items-center">
          <div className="w-full py-5 flex justify-center items-center text-[20px] text-blue-900 ">
            Subscribe To Our Newsletter
          </div>
          <div className="w-full ">
            <div className="w-[90%] h-[40px] flex">
              <input
                type="text"
                className="h-full bg-white pl-3 flex-1 border"
                placeholder="Your Email Address"
              />
              <div className="w-[30%] rounded-tr-md rounded-br-md py-2 px-3 mdrgb(18, 9, 76):py-0 md:px-0 flex justify-center items-center bg-blue-800 text-white hover:">
                Subscribe
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-[50px] flex justify-center items-center flex-col">
        <div className="w-[85%] flex justify-center items-center flex-col">
          <div className="text-[25px] font-bold text-blue-950">OUR COURSES</div>
          <div className="font-medium text-blue-950">
            Our School program has six dedicated classes
          </div>
          <div className="w-full py-[50px] gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center ">
            <div className="w-full flex justify-center  items-center">
              <CoursesProps text="Computer Science" img={computer} />
            </div>
            <div className="w-full bg-yellow-400 flex justify-center items-center">
              <CoursesProps text="Physics" img={physics} />
            </div>
            <div className="w-full flex justify-center items-center">
              <CoursesProps text="Biology" img={biology} />
            </div>
            <div className="w-full flex justify-center items-center">
              <CoursesProps text="Agriultural Science" img={agric} />
            </div>
          </div>
        </div>
        <div className="w-[85%] flex justify-center items-center flex-col">
          <div className="text-[25px] font-bold text-blue-950">OUR TEACHER</div>
          <div className="font-medium text-center text-blue-950">
            Stay up to date with all our latest news and launches. Only the best
            quality makes it onto our blog!
          </div>
          <div className="w-full py-[50px] gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 place-items-center ">
            <div className="w-[100%] flex justify-center items-center">
              <TeacherProps
                text="Gabriel Marcotti"
                text2="Head Teacher, Biology"
                img={teacher2}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <TeacherProps
                text="Joy Elumelu"
                text2="Head Teacher, Arts and Culture"
                img={teacher1}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <TeacherProps
                text="Isaac Philips"
                text2="Head Teacher, Agricultural Studies"
                img={teacher3}
              />
            </div>
          </div>
        </div>
        <div className="w-[85%] flex justify-center items-center flex-col">
          <div className="text-[25px] font-bold text-blue-950">
            OUR PHOTO GALLERY
          </div>
          <div className="font-medium text-center text-blue-950">
            Stay up to date with all our latest news and launches. Only the best
            quality makes it onto our blog!
          </div>
          <div className="w-full  py-[50px] gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 place-items-center ">
            <div className="w-[100%] flex justify-center items-center">
              <GalleryProps img={gallery1} />
            </div>
            <div className="w-[100%] flex justify-center items-center">
              <GalleryProps img={gallery2} />
            </div>
            <div className="w-[100%] flex justify-center items-center">
              <GalleryProps img={gallery3} />
            </div>
            <div className="w-[100%] flex justify-center items-center">
              <GalleryProps img={gallery4} />
            </div>
            <div className="w-[100%] flex justify-center items-center">
              <GalleryProps img={gallery5} />
            </div>
            <div className="w-[100%] flex justify-center items-center">
              <GalleryProps img={gallery6} />
            </div>
          </div>
        </div>
        <div className="w-[85%] py-[50px] flex justify-center items-center flex-col">
          <div className="text-[25px] font-bold text-blue-950">
            OUR TESTIMONIALS
          </div>
          <div className="font-medium text-center text-blue-950">
            How real people said about Our School
          </div>
          <div className="w-full py-[50px]  gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center ">
            <Slider {...settings} className="w-full ">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full">
                  <TestimonialProps
                    name={testimonial.name}
                    job={testimonial.job}
                    year={testimonial.year}
                    img={testimonial.img}
                  />
                </div>
              ))}
            </Slider>
            <Slider {...settings} className="w-full ">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full">
                  <TestimonialProps
                    name={testimonial.name}
                    job={testimonial.job}
                    year={testimonial.year}
                    img={testimonial.img}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-[85%] py-[90px] flex justify-center items-center flex-col">
          <div className="text-[25px] font-bold text-blue-950">
            OUR STUDENTS
          </div>
          <div className="font-medium text-center text-blue-950">
            Latest news & event of our Student
          </div>
          <div className="w-full py-[50px]   gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 place-items-center ">
            <div className="w-[100%] bg-white flex justify-center items-center flex-col">
              <StudentProps img={student3} />
            </div>
            <div className="w-[100%] bg-white flex justify-center items-center flex-col">
              <StudentProps img={student1} />
            </div>
            <div className="w-[100%] bg-white flex justify-center items-center flex-col">
              <StudentProps img={student2} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-col relative">
          <img
            src={bg}
            alt=""
            className="h-[110vh] md:h-[40vh] w-[100%] object-cover"
          />
          <div className="w-[70%] absolute doublet top-[75%] md:top-[70%] lg:top-[70%] left-[50%]  gap-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 place-items-center text-white">
            <div className="py-[10px] w-full  flex justify-center items-center">
              <StatsProps text="Campus" number={20} icon={<AiFillHome />} />
            </div>
            <div className="py-[10px] w-full flex justify-center items-center">
              <StatsProps
                text="Teacher"
                number={35}
                icon={<AiOutlineAreaChart />}
              />
            </div>
            <div className="py-[10px] w-full flex justify-center items-center">
              <StatsProps
                text="Laboratories"
                number={8}
                icon={<AiFillDatabase />}
              />
            </div>
            <div className=" py-[10px] w-full flex justify-center items-center">
              <StatsProps
                text="Staffs"
                number={110}
                icon={<AiOutlinePicture />}
              />
            </div>
          </div>
        </div>
        <div className="w-[85%] py-[90px] flex justify-center items-center flex-col">
          <div className="text-[25px] font-bold text-blue-950">
            GET IN TOUCH
          </div>
          <div className="font-medium text-center text-blue-950 ">
            Uaerat litora, taciti quaerat dolor ligula laoreet omnis aut
            scelerisque ex fuga platea eveniet pulvinar praesent molestiae
            maiores, quidem cumque!
          </div>
          <div className="w-full py-[50px]   gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center ">
            <div className="w-[100%] bg-white flex justify-center items-center flex-col">
              <ContactProps
                maintext="Number Phone"
                sectext="Phone 1: 0(1234) 567 89012"
                trdtext="Phone 2: 0(987) 567 890"
                icon={<AiFillPhone />}
              />
            </div>
            <div className="w-[100%] bg-white flex justify-center items-center flex-col">
              <ContactProps
                maintext="AddressStreet"
                sectext="Address : No 40 Baria Sreet 133/2"
                trdtext="Lagos, LG, Nigeria."
                icon={<FaLocationArrow />}
              />
            </div>
            <div className="w-[100%] bg-white flex justify-center items-center flex-col">
              <ContactProps
                maintext="Email"
                sectext="brighterdayscolledge@gmail.com"
                trdtext="brighterdayscolledgeforyou@gmail.com"
                icon={<AiOutlineMail />}
              />
            </div>
            <div className="w-[100%] bg-white flex justify-center items-center flex-col">
              <ContactProps
                maintext="Fax"
                sectext="(1234) 567 89012"
                trdtext="(987) 567 890"
                icon={<FaFax />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSections;
