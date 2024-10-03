import { useState } from "react";
import IG from "../../assets/ig.png";
import FB from "../../assets/fb.png";
import Linkden from "../../assets/linkden.png";
import X from "../../assets/fb.png";
// import { useTeacherInfo } from "../../hooks/useTeacher";
import { CgClose } from "react-icons/cg";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
// import {
//   updateStaffFacebook,
//   updateStaffInstagramAcct,
//   updateStaffLinkinAcct,
//   updateStaffXAcct,
// } from "../../api/teachersAPI";
import toast, { Toaster } from "react-hot-toast";

const StudentSocialSettings = () => {
  return (
    <div>
      <div>
        {" "}
        <div className="relative">
          <Toaster />
          <div className="border rounded-[4px] shadow-sm">
            <div className="py-3 px-4 uppercase text-blue-950 font-medium text-[11px] md:text-[18px]">
              Socials
            </div>
            <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
              <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
                <h3 className="font-normal w-[120px] flex items-center gap-2 text-[9px] md:text-[18px]">
                  <img
                    src={FB}
                    alt=""
                    className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                  />
                  facebook
                </h3>
                {/* {teacherInfo?.facebookAcct ? ( */}
                <h1 className="text-[8px] md:text-[18px] font-[700] text-blue-500">
                  {/* {teacherInfo?.facebookAcct} */}
                </h1>
                {/* ) : ( */}
                <h1 className="text-[8px] md:text-[18px] font-[700] text-blue-500">
                  + add your facebook handle
                </h1>
                {/* )} */}
              </div>
              <div
                className="md:py-1 md:px-3 px-2 py-[2px] border border-blue-950 rounded-md text-[10px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
                //   onClick={() => {
                //     setToggle("facebook");
                //   }}
              >
                Edit
              </div>
            </div>
            <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
              <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
                <h3 className="font-normal w-[120px] flex items-center gap-2 text-[9px] md:text-[18px]">
                  <img
                    src={IG}
                    alt=""
                    className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                  />
                  instagram
                </h3>
                {/* {teacherInfo?.instagramAcct ? ( */}
                <h1 className="text-[8px] md:text-[18px] font-[700] text-blue-500 md:ml-[5px]">
                  {/* {teacherInfo?.instagramAcct} */}
                </h1>
                {/* ) : ( */}
                <h1 className="text-[8px] md:text-[18px] font-[700] text-blue-500 md:ml-[5px]">
                  + add your instagram handle
                </h1>
                {/* )} */}
              </div>
              <div
                className="md:py-1 md:px-3 px-2 py-[2px] border border-blue-950 rounded-md text-[10px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
                //   onClick={() => {
                //     setToggle("instagram");
                //   }}
              >
                Edit
              </div>
            </div>
            <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
              <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
                <h3 className="font-normal w-[120px] flex items-center gap-2 text-[9px] md:text-[18px]">
                  <img
                    src={X}
                    alt=""
                    className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                  />
                  X
                </h3>
                {/* {teacherInfo?.xAcct ? ( */}
                <h1 className="text-[9px] md:text-[18px] font-[700] text-blue-500">
                  {/* {teacherInfo?.xAcct} */}
                </h1>
                {/* ) : ( */}
                <h1 className="text-[8px] md:text-[18px] font-[700] text-blue-500">
                  + add your X handle
                </h1>
                {/* )} */}
              </div>
              <div
                className="md:py-1 md:px-3 px-2 py-[2px] border border-blue-950 rounded-md text-[10px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
                //   onClick={() => {
                //     setToggle("X");
                //   }}
              >
                Edit
              </div>
            </div>
            <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
              <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
                <h3 className="font-normal w-[120px] flex items-center gap-2 text-[9px] md:text-[18px]">
                  <img
                    src={Linkden}
                    alt=""
                    className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                  />
                  linkedIn
                </h3>
                {/* {teacherInfo?.linkedinAcct ? ( */}
                <h1 className="text-[8px] md:text-[18px] font-[700] text-blue-500">
                  {/* {teacherInfo?.linkedinAcct} */}
                </h1>
                {/* ) : ( */}
                <h1 className="text-[8px] md:text-[18px] font-[700] text-blue-500">
                  + add your linkedIn handle
                </h1>
                {/* )} */}
              </div>
              <div
                className="md:py-1 md:px-3 px-2 py-[2px] border border-blue-950 rounded-md text-[10px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
                //   onClick={() => {
                //     setToggle("linkedin");
                //   }}
              >
                Edit
              </div>
            </div>
          </div>
          {/* {toggle && (
          <div className="w-full h-full absolute top-0 backdrop-blur-sm flex justify-center items-center">
            <div className="p-4 min-h-[300px] min-w-[400px] bg-white border shadow-md rounded-lg flex justify-center items-center flex-col">
              <div className="mb-4 flex items- center justify-between">
                <h2 className="text-blue-950 font-semibold">
                  {toggle === "facebook" && "Enter Your Facebook Handle"}
                  {toggle === "linkedin" && "Enter Your Linkedln Handle"}
                  {toggle === "X" && "Enter Your X Handle"}
                  {toggle === "instagram" && "Enter Your Instagram Handle"}
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

              {toggle === "linkedin" && (
                <Input
                  placeholder="Enter Your Linkedin Handle"
                  value={linkedin}
                  className="mb-4"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLinkedin(e.target.value);
                  }}
                />
              )}

              {toggle === "instagram" && (
                <Input
                  placeholder="Enter Your Linkedin Handle"
                  value={instagram}
                  className="mb-4"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInstagram(e.target.value);
                  }}
                />
              )}
              {/* State Change For button */}
        </div>
      </div>
    </div>
  );
};

export default StudentSocialSettings;
