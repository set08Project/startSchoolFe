import LittleHeader from "../../../components/layout/LittleHeader";
import Input from "../../../components/reUse/Input";
import Button from "../../../pagesForTeachers/components/reUse/Button";
import { Link } from "react-router-dom";

const expenditure = () => {
  return (
    <div>
      <LittleHeader name={"Expenditures"} />
      <div className="w-full mb-[50px] min-h-[150px] grid grid-cols-1 lg:grid-cols-2 gap-3 transition-all duration-300">
        <div className=" border rounded-md grid grid-cols-2">
          <div className="h-full p-2">
            <div className="font-medium mb-5">EXPENDITURE DASHBOARD</div>
            <h4 className="mb-1 font-medium">Main Budget :</h4>
            <h1 className="mb-2 font-bold text-[25px] text-blue-950">
              ₦200,000.00
            </h1>
            <div className="flex items-center gap-[10px] text-blue-950">
              <div>Currency: </div>
              <div>Naira (₦)</div>
            </div>
          </div>
          <div className="h-full p-2 flex items-center justify-center">
            <div className="w-full p-2 h-full rounded-l-[inherit] border md:rounded-md md:h-[90%]">
              <h4 className="mb-3 font-medium">Total Expenses :</h4>
              <h1 className="font-bold text-[25px] text-blue-950">₦125,000</h1>
            </div>
          </div>
        </div>
        <div className="border h-full rounded-md">Chart</div>
      </div>

      <div className="flex w-full justify-between items-start">
        <Input placeholder="Search Staff Name" className="ml-0" />

        <div className="modal-action">
          <label
            htmlFor="my_modal_expenses"
            className="py-4 px-6  border rounded-md bg-blue-950 text-[12px] text-white transition-all duration-300 hover:scale-105 cursor-pointer inline-block text-center"
          >
            Record An Expenditure
          </label>
        </div>
        {/* Modal starts */}
        <input
          type="checkbox"
          id="my_modal_expenses"
          className="modal-toggle"
        />

        <div className="modal modal-middle">
          <div className="modal-box bg-white">
            <label
              htmlFor="my_modal_expenses"
              className="btn text-white py-4 px-6 bg-blue-950 border hover:bg-blue-950 scale-105"
            >
              Close
            </label>
          </div>
        </div>
        {/* Modal */}
      </div>
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="w-full ml-[15px] mb-6 flex justify-start items-center">
          <Link to="/view-all-expenditures">
            <div className="text-blue-950">view all expenses</div>
          </Link>
        </div>
        <div className="text-[gray] w-[2060px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[130px] border-r">Date</div>
          <div className="w-[120px] border-r">Amount</div>
          <div className="w-[200px] border-r">Item</div>
          <div className="w-[120px] border-r">Payment Method</div>
          <div className="w-[300px] border-r">Description / Notes</div>

          <div className="w-[120px] border-r">Category</div>
        </div>

        <div className=" w-[1200px] overflow-hidden">
          <div className="transition-all duration-300">
            <div>
              <div className="w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 py-2 my-2  overflow-hidden bg-white">
                {/* start */}

                <div className="w-[130px] border-r">Hello</div>

                <div
                  className="w-[120px] border-r 
                     text-red-600"
                >
                  ₦5,500
                </div>

                <div className="w-[200px] border-r">Batch of Sports wears</div>
                {/* name */}
                <div className="w-[120px] flex justify-center border-r">
                  Cash
                </div>
                <div className="w-[300px] border-r">
                  Bought the batch of sports wears from dealer
                </div>

                {/* check */}
                <div className="w-[120px] border-r  ">Clothes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default expenditure;
