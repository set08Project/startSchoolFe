const ProfileSettings = () => {
  return (
    <div>
      <div className="border rounded-[4px] shadow-sm">
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px]">Full Name</h3>
            <h1 className="text-[18px] font-semibold">
              Rasheedat Eromosele Daniel
            </h1>
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px]">Email</h3>
            <div className="text-[15px] sm:text-[17px] font-semibold lowercase">
              RasheedatEromoseleDaniel
              <br className="lg:hidden" />
              @officialnextgroupofschools.com
            </div>
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px]">Role</h3>
            <h1 className="text-[18px] font-semibold">Teacher</h1>
          </div>
          <div></div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px]">Gender</h3>
            <h1 className="text-[18px] font-semibold">Male</h1>
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px]">Phone No:</h3>
            <h1 className="text-[18px] font-semibold">+234 812-910-0830</h1>
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px]">Address</h3>
            <h1 className="text-[18px] font-semibold">
              12, Gregg Crescent, Victoria Island Lagos
            </h1>
          </div>
          <div className="py-1 px-3 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105">
            Edit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
