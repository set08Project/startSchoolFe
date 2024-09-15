import LittleHeader from "../../components/layout/LittleHeader";
import pic from "../../../assets/pix.jpg";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="min-h-[87vh]">
          <div>
            <h1 className="mb-2 font-medium text-[15px]">Profile Image:</h1>
            <img
              src={pic}
              alt="profile-image"
              className="h-[300px] w-full object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="min-h-[87vh]">
          <div className="w-[70%]">
            <div className="mb-2 font-medium text-[15px]">Role:</div>
            <div className="p-3 bg-gray-200 font-medium rounded-lg text-[18px]">
              Teacher
            </div>
          </div>
        </div>
        <div className="min-h-[87vh]">
          <div className="">
            <div className="mb-2 font-medium text-[15px]">Onboard Date:</div>
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
