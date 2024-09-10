import { FaCalendar } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="h-[50px] bg-blue-50 border-b w-full flex justify-center items-center  z-10 fixed top-0 left-0 text-blue-950">
      <div className="flex items-center justify-end w-[90%]">
        <div className="mr-5 font-medium cursor-pointer flex items-center bg-slate-200 px-4 py-2 rounded-sm z-30">
          <FaCalendar />
          <span className="text-[12px] mx-1">
            Session: <span>23/24 </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
