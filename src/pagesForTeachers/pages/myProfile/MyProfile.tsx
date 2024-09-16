import pic from "../../../assets/pix.jpg";
import { MdEmail } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { BsPerson, BsPhone } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa6";
import IG from "../../../assets/socials/Ig.png";
import FB from "../../../assets/socials/fb.png";
import Linkden from "../../../assets/socials/linkden.png";
import X from "../../../assets/socials/twitt.png";

const MyProfile = () => {
  return (
    <div className="">
      <div>
        <div className="w-full mb-7 pb-5 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <div className="text-[22px] font-semibold text-blue-950">
              Rasheedat Daniels Eromosele
            </div>
          </div>
          <div>Edit Profile</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="min-h-[87vh] ">
          <div className="mb-5">
            <h1 className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Profile Image:
            </h1>
            <img
              src={pic}
              alt="profile-image"
              className="mb-2 h-[320px] md:h-[300px] w-[90%] md:w-[80%] object-cover rounded-lg"
            />
            <div className="ml-7 flex gap-2 text-blue-800 items-center cursor-pointer hover:scale-105 transition-all duration-300">
              <HiPhoto />
              <h3>Change Profile Image</h3>
            </div>
          </div>
          <div className="">
            <h1 className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
              Personal Information
            </h1>
            <div className="mb-2 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <BsPerson /> Full Name:
              </p>
              <h1 className="text-[18px] font-semibold">
                Rasheedat Eromosele Daniel
              </h1>
            </div>
            <div className="mb-2 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <MdEmail /> Email Address:
              </p>
              <h1 className="text-[18px] font-semibold lowercase">
                RasheedatEromosele@officialnextschools.com
              </h1>
            </div>
            <div className="mb-2 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <BsPhone />
                Phone Number:
              </p>
              <h1 className="text-[18px] font-semibold">+234 812-910-0830</h1>
            </div>
            <div className="mb-2 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <FaAddressBook /> Address:
              </p>
              <h1 className="text-[18px] font-semibold">
                12, Gregg Crescent, Victoria Island Lagos
              </h1>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="min-h-[65vh] transition-all duration-300 ">
          <div className="mb-4 md:mb-10">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Role:
            </div>
            <div className="p-3 bg-gray-100 font-medium rounded-lg text-[18px]">
              Teacher
            </div>
          </div>
          <div className="mb-10">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Onboard Date:
            </div>
            <div className="p-3 bg-gray-100 font-medium rounded-lg text-[18px]">
              22-Septmber-2024
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-5">
              <div className="mb-1 font-medium text-[17px] text-gray-600 uppercase">
                Socials:
              </div>
              <div className="border w-full" />
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={FB}
                  alt="facebook pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              <h3>Rasheedat Daniel</h3>
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={IG}
                  alt="instagram pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              <h3>@rasheedanielss</h3>
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={X}
                  alt="X pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              <h3>@rashdaniels</h3>
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={Linkden}
                  alt="LinkedIn pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              <h3>Rasheedat Daniel</h3>
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="min-h-[87vh]">
          <div className="flex items-center gap-5">
            <div className="mb-1 font-medium text-[17px] text-gray-600 uppercase">
              My Assigned Subjects:
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
