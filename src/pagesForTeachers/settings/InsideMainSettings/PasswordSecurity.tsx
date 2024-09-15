import PasswordInput from "../../../components/reUse/PasswordIput";

const PasswordSecurity = () => {
  return (
    <div className=" lg:flex lg:gap-4 items-center">
      <div className="mb-4 lg:mb-0">
        <div>Step 1</div>
        <div className="mb-3 font-semibold">Confirm Older Password</div>
        <div className="p-4 h-[200px] xl:w-[450px] bg-gray-100 transition-all duration-300 rounded-md shadow-sm">
          <h3 className="ml-3 mb-5 font-semibold text-[17px]">
            Input your current password
          </h3>
          <PasswordInput
            placeholder="Current Password"
            className="bg-white rounded-md"
          />
          <button className="ml-3 rounded-md py-2 px-3 bg-blue-950 text-white transition-all duration-300 hover:scale-105">
            Confirm
          </button>
        </div>
      </div>
      <div>
        <div>Step 2</div>
        <div className="mb-3 font-semibold">Add New Password</div>
        <div className="p-4 h-[200px] xl:w-[450px] bg-gray-100 transition-all duration-300 rounded-md shadow-sm">
          <h3 className="ml-3 mb-5 font-semibold text-[17px]">
            Input your new password
          </h3>
          <PasswordInput
            placeholder="New Password"
            className="bg-white rounded-md"
          />
          <button className="ml-3 rounded-md py-2 px-3 bg-blue-950 text-white transition-all duration-300 hover:scale-105">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordSecurity;
