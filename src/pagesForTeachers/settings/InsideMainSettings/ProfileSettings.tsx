import { useTeacherInfo } from "../../hooks/useTeacher";

const ProfileSettings = () => {
  const { teacherInfo } = useTeacherInfo();

  return (
    <div>
      <div className="border mb-4 rounded-[4px] shadow-sm">
        <div className="py-3 px-4 uppercase text-blue-950 font-medium">
          General
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[15px] md:text-[18px] text-blue-950">
              Full Name
            </h3>
            <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-medium">
              {teacherInfo?.staffName}
            </h1>
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] flex items-center gap-1 text-[13px] sm:text-[15px] md:text-[18px]">
              Email
            </h3>
            <div className="w-[60%] sm:w-[67%] xl:w-auto text-[13px] sm:text-[18px] md:text-[18px] font-medium lowercase break-words">
              {teacherInfo?.email}
            </div>
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Role
            </h3>
            <h1 className=" font-medium text-[13px] sm:text-[18px] md:text-[18px] ">
              {teacherInfo?.staffRole}
            </h1>
          </div>
          <div></div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Gender
            </h3>

            {teacherInfo?.gender ? (
              <h1 className="font-medium text-[13px] sm:text-[18px] md:text-[18px] ">
                {teacherInfo?.gender}
              </h1>
            ) : (
              <div className="font-medium text-blue-500 text-[13px] sm:text-[18px] md:text-[18px]">
                + add your gender
              </div>
            )}
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
      </div>
      <div className="border rounded-[4px] shadow-sm">
        <div className="py-3 px-4 uppercase text-blue-950 font-medium">
          Contact
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Phone No:
            </h3>
            <h1 className="text-[13px] sm:text-[17px] font-medium">
              +234 812-910-0830
            </h1>
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Address
            </h3>
            <h1 className="w-[60%] sm:w-[70%] xl:w-auto break-words text-[13px] sm:text-[17px] font-medium">
              {teacherInfo?.staffAddress}
            </h1>
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
