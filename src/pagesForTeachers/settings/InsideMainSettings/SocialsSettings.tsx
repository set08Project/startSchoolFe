import IG from "../../../assets/socials/Ig.png";
import FB from "../../../assets/socials/fb.png";
import Linkden from "../../../assets/socials/linkden.png";
import X from "../../../assets/socials/x-social-media-round-icon.svg";

const SocialsSettings = () => {
  return (
    <div>
      {" "}
      <div>
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
              <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-normal text-blue-500">
                + add your facebook handle
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
              <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-normal text-blue-500">
                + add your X handle
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
      </div>
    </div>
  );
};

export default SocialsSettings;
