document.title = "staff Detail's Page";
import { BsThreeDotsVertical } from "react-icons/bs";
import LittleHeader from "../../components/layout/LittleHeader";
import Button from "../../components/reUse/Button";

const StaffDetail = () => {
  return (
    <div>
      <LittleHeader name="Staff Details" />

      <div>Staff Name</div>

      <div className="w-full text-blue-950 h-[90px] rounded-lg border flex justify-between overflow-hidden ">
        <div className="bg-orange-500 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg ">
          <div>Pay Grade</div>
          <div className="text-[25px] font-bold">₦125,980</div>
        </div>
        <div className=" px-4 py-2 rounded-lg   items-end">
          <div>upgrade staff Pay</div>
          <Button name="Up Grade" className="bg-blue-950 mx-0 ml-3 " />
        </div>
      </div>

      <div className="my-6 border-t" />

      <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Detail data for Peter Oti</p>
        <p className="text-[13px]">
          Class Handled: <span className="font-bold">JSS A1</span>
        </p>

        <div className="mt-5 w-full grid grid-cols-2 ">
          <div className="bg-white border rounded-2xl h-[200px] px-4 pt-4">
            <div className="mt-3 flex justify-between items-center font-bold">
              <p>Mathematics</p>
              <div className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center">
                <BsThreeDotsVertical className="hover:text-blue-900" />
              </div>
            </div>
            <div className="flex">
              <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4">
                compulsory
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetail;
