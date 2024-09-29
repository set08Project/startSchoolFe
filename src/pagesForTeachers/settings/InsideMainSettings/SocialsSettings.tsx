import { useState } from "react";
import IG from "../../../assets/socials/Ig.png";
import FB from "../../../assets/socials/fb.png";
import Linkden from "../../../assets/socials/linkden.png";
import X from "../../../assets/socials/x-social-media-round-icon.svg";
import { useTeacherInfo } from "../../hooks/useTeacher";
import { CgClose } from "react-icons/cg";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
import { updateStaffFacebook, updateStaffXAcct } from "../../api/teachersAPI";
import toast, { Toaster } from "react-hot-toast";

const SocialsSettings = () => {
  const [toggle, setToggle] = useState<string | null>(null);
  const [facebook, setFacebook] = useState<string>("");
  const [x, setX] = useState<string>("");

  const { teacherInfo } = useTeacherInfo();
  // console.log("This is Teacher Info", teacherInfo);
  const schoolID = teacherInfo?.schoolIDs;
  const staffID = teacherInfo?._id;

  const changeStaffFacebookAcct = () => {
    try {
      updateStaffFacebook(schoolID, staffID, facebook).then((res) => {
        toast.success("Staff Facebook Handle Updated");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error updating Staff Facebook Handle");
      console.error();
      return error;
    }
  };

  const changeStaffXAcct = () => {
    try {
      updateStaffXAcct(schoolID, staffID, x).then((res) => {
        toast.success("Staff X Handle Updated");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error updating X Handle");
      return error;
    }
  };

  return (
    <div>
      {" "}
      <div className="relative">
        <Toaster />
        <div className="border rounded-[4px] shadow-sm">
          <div className="py-3 px-4 uppercase text-blue-950 font-medium">
            Socials
          </div>
          <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
            <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
              <h3 className="font-normal w-[120px] flex items-center gap-2">
                <img
                  src={FB}
                  alt=""
                  className="w-[20px] h-[20px] object-contain"
                />
                facebook
              </h3>
              {teacherInfo?.facebookAcct ? (
                <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-normal text-blue-500">
                  {teacherInfo?.facebookAcct}
                </h1>
              ) : (
                <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-normal text-blue-500">
                  + add your facebook handle
                </h1>
              )}
            </div>
            <div
              className="py-1 px-3 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => {
                setToggle("facebook");
              }}
            >
              Edit
            </div>
          </div>
          <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
            <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
              <h3 className="font-normal w-[120px] flex items-center gap-2">
                <img
                  src={IG}
                  alt=""
                  className="w-[20px] h-[20px] object-contain"
                />
                instagram
              </h3>
              <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-normal text-blue-500">
                + add your instagram handle
              </h1>
            </div>
            <div className="py-1 px-3 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
              Edit
            </div>
          </div>
          <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
            <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
              <h3 className="font-normal w-[120px] flex items-center gap-2">
                <img
                  src={X}
                  alt=""
                  className="w-[20px] h-[17px] object-contain"
                />
                X
              </h3>
              {teacherInfo?.xAcct ? (
                <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-normal text-blue-500">
                  {teacherInfo?.xAcct}
                </h1>
              ) : (
                <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-normal text-blue-500">
                  + add your X handle
                </h1>
              )}
            </div>
            <div
              className="py-1 px-3 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => {
                setToggle("X");
              }}
            >
              Edit
            </div>
          </div>
          <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
            <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
              <h3 className="font-normal w-[120px] flex items-center gap-2">
                <img
                  src={Linkden}
                  alt=""
                  className="w-[20px] h-[20px] object-contain"
                />
                linkedIn
              </h3>
              <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-normal text-blue-500">
                + add your linkedIn handle
              </h1>
            </div>
            <div className="py-1 px-3 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
              Edit
            </div>
          </div>
        </div>
        {toggle && (
          <div className="w-full h-full absolute top-0 backdrop-blur-sm flex justify-center items-center">
            <div className="p-4 min-h-[300px] min-w-[400px] bg-white border shadow-md rounded-lg flex justify-center items-center flex-col">
              <div className="mb-4 flex items- center justify-between">
                <h2 className="text-blue-950 font-semibold">
                  {toggle === "facebook" && "Enter Your Facebook Handle"}
                  {toggle === "linkdln" && "Enter Your Linkdln handle"}
                  {toggle === "X" && "Enter Your X Handle"}
                  {toggle === "Instagram" && "Enter Your Instagram Handle"}
                </h2>
                <CgClose
                  className="text-blue-950 text-[20px] font-bold cursor-pointer hover:scale-110 ml-[50px]"
                  onClick={() => {
                    setToggle(null);
                  }}
                />
              </div>
              {toggle === "facebook" && (
                <Input
                  placeholder="Enter Your Facebook Handle"
                  value={facebook}
                  className="mb-4"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFacebook(e.target.value);
                  }}
                />
              )}

              {toggle === "X" && (
                <Input
                  placeholder="Enter Your X Handle"
                  value={x}
                  className="mb-4"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setX(e.target.value);
                  }}
                />
              )}
              {/* State Change For button */}
              {toggle === "facebook" && (
                <Button
                  name="Update"
                  className="bg-blue-950 hover:scale-105"
                  onClick={() => {
                    changeStaffFacebookAcct();
                    setToggle(null);
                  }}
                />
              )}

              {toggle === "X" && (
                <Button
                  name="Update"
                  className="bg-blue-950 hover:scale-105"
                  onClick={() => {
                    changeStaffXAcct();
                    setToggle(null);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialsSettings;
