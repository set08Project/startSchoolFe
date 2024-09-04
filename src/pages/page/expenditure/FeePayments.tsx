import moment from "moment";
import Input from "../../../components/reUse/Input";
import { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getRecords, recordFeesPayment } from "../../api/schoolAPIs";
import { useSchoolCookie, useSchoolStudents } from "../../hook/useSchoolAuth";

const FeePayments = () => {
  const [fee, setFee] = useState(0);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feePayments, setFeePayments] = useState(null);

  const schoolID = useSchoolCookie().dataID;
  const formattedDate = dueDate ? moment(dueDate).format("YYYY-MM-DD") : "";

  const getSchool = useSchoolStudents(schoolID);
  const getAllStudents = getSchool?.students?.data?.students;

  // console.log(
  //   "reading all students",
  //   getAllStudents.map((el) => {
  //     return el._id;
  //   })
  // );

  const students = getAllStudents?.map((el) => ({
    value: el._id,
    label: el.studentFirstName.concat(el?.studentLastName),
  }));

  // console.log("The selected id", selectedStudent.value);

  const handleRecordFee = () => {
    try {
      recordFeesPayment(
        schoolID,
        selectedStudent.value,
        fee,
        formattedDate
      ).then((res) => {
        console.log("codebase res", res.data);
        return res?.data;
      });
    } catch (error) {
      console.error();
      return error;
    }
  };

  // const handleGetFeeRecords = () => {
  //   try {
  //     getRecords(schoolID).then((res) => {
  //       console.log(res.data);
  //       setFeePayments(res?.data);
  //       return res.data;
  //     });
  //   } catch (error) {
  //     console.error();
  //     return error;
  //   }
  // };

  useEffect(() => {
    handleRecordFee();
    // handleGetFeeRecords();
  }, []);

  return (
    <div>
      <div>
        {/* <LittleHeader name={"Expenditures"} /> */}
        <Toaster position="top-center" reverseOrder={true} />

        <div>
          <div className="w-full flex justify-between items-start">
            <Input
              placeholder="Search for expense ITEM"
              className="ml-1 mt-6"
            />

            <div className="modal-action ml-6 flex">
              <label
                htmlFor="my_modal_expenses_modal"
                className="py-2 px-3 sm:py-4 sm:px-6 ml-3 border rounded-md bg-blue-950 text-[12px] text-white transition-all duration-300 hover:scale-105 cursor-pointer inline-block text-center"
              >
                Record Fees
              </label>
            </div>
          </div>
          {/* Modal starts */}
          <input
            type="checkbox"
            id="my_modal_expenses_modal"
            className="modal-toggle "
          />

          <div className="modal modal-middle">
            <div className="modal-box bg-white min-h-[500px] flex flex-col">
              <div className="mt-[30px]">
                <main className="transition-all duration-300">
                  <div className="mb-5">
                    <div className="text-[15px] mb-1 text-blue-950 font-medium">
                      Select the student for installmental fee payment
                    </div>
                    <div>
                      <Select
                        options={students}
                        className="w-full"
                        placeholder="Select or search for a student"
                        isSearchable
                        onChange={(selectedOption: any) =>
                          setSelectedStudent(selectedOption.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="text-[15px] mb-1 text-blue-950 font-medium">
                      Enter installment amount paid
                    </div>
                    <input
                      type="text"
                      placeholder="Enter amount, e.g., ₦20,000"
                      className="border-[1px] border-gray-400 outline-none w-full rounded-md p-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFee(parseFloat(e.target.value) || 0);
                      }}
                    />
                  </div>
                  <div className="mb-5 flex items-center justify-start gap-[20px]">
                    <div className="text-[15px] text-blue-950 font-medium">
                      Payment date :
                    </div>
                    <DatePicker
                      className="w-[170px] text-center p-1 bg-white text-black border border-gray-500 outline-none rounded-lg cursor-pointer"
                      selected={dueDate}
                      onChange={(date: Date) => {
                        setDueDate(date);
                      }}
                      dateFormat="P"
                      placeholderText="Select today's date"
                    />
                  </div>
                </main>

                <main className="flex gap-4 justify-center">
                  <label
                    htmlFor="my_modal_expenses_modal"
                    className="btn text-white py-4 px-6 bg-red-500 border hover:bg-red-600 scale-105 w-[200px]"
                  >
                    Cancel
                  </label>

                  <label
                    htmlFor="my_modal_expenses_modal"
                    className="btn text-white py-4 px-6 bg-green-500 border hover:bg-green-600 scale-105 w-[200px]"
                    onClick={handleRecordFee}
                  >
                    Approve
                  </label>
                </main>
              </div>
            </div>
          </div>
          {/* Modal */}
        </div>
        <div
          className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
          style={{ color: "var(--secondary)" }}
        >
          <div className="w-full ml-[15px] mb-6 flex justify-start items-center"></div>
          <div className="text-[gray] w-[1100px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
            <div className="w-[130px] border-r">Date</div>
            <div className="w-[120px] border-r">Amount</div>
            <div className="w-[200px] border-r">Item</div>
            <div className="w-[120px] border-r">Payment Method</div>
            <div className="w-[300px] border-r">Description / Notes</div>

            <div className="w-[120px] border-r">Category</div>
          </div>

          <div className=" w-[1100px] overflow-hidden">
            <div className="transition-all duration-300">
              <div key="">
                <div className="w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 py-2 my-2  overflow-hidden bg-white">
                  {/* start */}

                  <div className="w-[130px] border-r">
                    {/* {moment(props?.createdAt).format("ll")} */} Hii
                  </div>

                  <div
                    className="w-[120px] border-r 
                     text-red-600"
                  >
                    ₦100
                  </div>

                  <div className="w-[200px] border-r">Hello</div>
                  {/* name */}
                  <div className="w-[120px] flex justify-center border-r">
                    vulnerabilities
                  </div>
                  <div className="w-[300px] border-r">vulnerabilities</div>

                  {/* check */}
                  <div className="w-[120px] border-r  ">vulnerabilities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeePayments;
