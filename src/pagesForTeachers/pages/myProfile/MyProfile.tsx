import pic from "../../../assets/pix.jpg";
import { MdEmail } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { BsPerson, BsPhone } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa6";

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
            <h1 className="mb-2 font-medium text-[17px] text-gray-600">
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
              Profile Details
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
        <div className="min-h-[87vh] bg-red-50">
          <div className="w-[70%]">
            <div className="mb-2 font-medium text-[17px] text-gray-600">
              Role:
            </div>
            <div className="p-3 bg-gray-200 font-medium rounded-lg text-[18px]">
              Teacher
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="min-h-[87vh] bg-blue-50">
          <div className="">
            <div className="mb-2 font-medium text-[17px] text-gray-600">
              Onboard Date:
            </div>
            <div className="w-[70%] p-3 bg-gray-100 font-medium rounded-lg text-[18px]">
              22-Septmber-2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
