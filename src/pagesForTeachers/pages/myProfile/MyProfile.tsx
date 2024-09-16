import pic from "../../../assets/pix.jpg";
import { MdEmail } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { BsPerson, BsPhone } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa6";
import IG from "../../../assets/socials/Ig.png";
import FB from "../../../assets/socials/fb.png";
import Linkden from "../../../assets/socials/linkden.png";
import X from "../../../assets/socials/twitt.png";
import { useTeacherInfo } from "../../hooks/useTeacher";
import moment from "moment";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const teacher = useTeacherInfo().teacherInfo;
  const initials =
    teacher?.staffName?.charAt(0) +
    teacher?.staffName?.charAt(teacher?.staffName.indexOf(" ") + 1);

  return (
    <div className="freshh">
      <div>
        <div className="w-full mb-7 pb-5 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <div className="rounded-full border py-2 px-2 font-semibold bg-gray-50">
              {initials}
            </div>
            <div className="text-[24px] font-semibold text-blue-950">
              {teacher?.staffName}
            </div>
          </div>
          <Link to="/settings">
            <div className="font-normal flex items-center gap-2 cursor-pointer hover:scale-105">
              <FaUserEdit /> Edit Profile
            </div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="min-h-[87vh] ">
          <div className="mb-8">
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
                {teacher?.staffName}
              </h1>
            </div>
            <div className="mb-2 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <BsPerson /> Gender:
              </p>
              {teacher?.gender === "" ? (
                <h1 className="text-[18px] font-normal">+ add your gender</h1>
              ) : (
                <h1 className="text-[18px] font-semibold">{teacher?.gender}</h1>
              )}
            </div>
            <div className="mb-2 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <MdEmail /> Email Address:
              </p>
              <h1 className="text-[18px] font-semibold lowercase">
                {teacher?.email}
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
                <FaAddressBook /> Home Address:
              </p>
              <h1 className="text-[18px] font-semibold">
                {teacher?.staffAddress}
              </h1>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="min-h-[65vh] transition-all duration-300 ">
          <div className="mb-3 md:mb-5">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Status:
            </div>
            <div className="font-medium rounded-lg flex justify-start items-center">
              <div
                className={`py-1 px-3 rounded-xl  text-[16px] ${
                  teacher?.activeStatus === true
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {String(teacher?.activeStatus)}
              </div>
            </div>
          </div>
          <div className="mb-3 md:mb-5">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Role:
            </div>
            <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
              Teacher
            </div>
          </div>
          <div className="mb-3 md:mb-5">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              School Employment ID:
            </div>
            <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
              {teacher?.enrollmentID}
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Onboard Date:
            </div>
            <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
              {moment(teacher?.createdAt).format("ll")}
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
              <h3>+ add your facebook handle</h3>
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={IG}
                  alt="instagram pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              <h3>+ add your instagram handle</h3>
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={X}
                  alt="X pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              <h3>+ add your X handle</h3>
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={Linkden}
                  alt="LinkedIn pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              <h3>+ add your linkedIn handle</h3>
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="min-h-[87vh] transition-all duration-300 lg:col-span-2 xl:col-auto lg:flex justify-between items-start xl:block">
          <div className="mb-10 lg:w-[47%] xl:w-auto">
            <div className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
              My Assigned Classes:
            </div>
            {teacher?.classesAssigned?.length > 0 ? (
              teacher?.classesAssigned?.map((props) => (
                <div className="border-b mb-1 py-2 flex items-center gap-5 justify-start font-medium">
                  <h1>Class Teacher :</h1>
                  <h1 className="font-semibold text-[18px] uppercase">
                    {props?.className}
                  </h1>
                </div>
              ))
            ) : (
              <div>No class assigned yet</div>
            )}
          </div>
          <div className="lg:w-[47%] xl:w-auto">
            <div className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
              My Assigned Subjects:
            </div>
            {teacher?.subjectAssigned?.length > 0 ? (
              teacher?.subjectAssigned?.map((props: any) => (
                <div className="border-b mb-1 py-2 flex items-center justify-between font-medium">
                  <h1>{props?.subjectTitle}</h1>
                  <h1>{props?.designated}</h1>
                </div>
              ))
            ) : (
              <div>No Subject assigned yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
