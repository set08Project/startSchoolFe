import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useSchoolData } from "../../pages/hook/useSchoolAuth";
import Button from "../reUse/Button";
import Input from "../reUse/Input";
import { createStore } from "../../pages/api/schoolAPIs";

const StoreScreen = () => {
  const { data } = useSchoolData();
  const [subject, setSubject] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  const [image, setImage] = useState("");

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onHandleAdd = () => {
    const formData = new FormData();
    formData.append("title", subject);
    formData.append("description", period);
    formData.append("cost", `${parseInt(day)}`);
    formData.append("avatar", image);

    createStore(data?._id, formData).then((res: any) => {
      console.log(res);
      if (res.status === 201) {
        toast.success("Product Uploaded");
      } else {
        toast.error("Product Error");
      }
    });
  };

  console.log(data?._id);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mt-5 text-[13px] font-medium text-blue-950 flex justify-start w-full">
        <label
          htmlFor="assign_subject_timetable"
          //   className=" my-3 text-blue-500 transition-all duration-300 hover:text-blue-600 cursor-pointer "

          className="bg-black text-white border-none font-medium py-4 px-9 leading-tight rounded-md cursor-pointer"
        >
          Add item to Store
        </label>
        <div className="mt-5" />
        {/* Put this part before </body> tag */}
        <input
          type="checkbox"
          id="assign_subject_timetable"
          className="modal-toggle"
        />
        <div className="modal rounded-md" role="dialog">
          <div className="modal-box  rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Add New Items to Store</p>

              <label
                htmlFor="assign_subject_timetable"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 leading-tight text-[13px] font-medium text-left">
              Please note that by assigning this subject to this class, it
              automtically becomes one of the class must take suject.
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p> Product Title: {subject}</p>
                {subject && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
              <div className="flex gap-2  items-center">
                <p> Product Cost: {period}</p>
                {period && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
              <div className="flex gap-2  items-center">
                <p> Product Description: {day}</p>
                {day && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10 flex w-full justify-start">
              <label
                className=" text-white bg-blue-950 border px-6 py-3 cursor-pointer rounded-md  mt-4 "
                htmlFor="pix"
              >
                Upload Image
              </label>

              <input
                id="pix"
                className="hidden"
                type="file"
                onChange={handleUpload}
              />
            </div>
            <div className="mt-4 w-full gap-2 flex flex-col items-center text-left">
              <div className="w-full">
                <label className="font-medium text-[12px] mt-4">
                  Product Title <span className="text-red-500">*</span>
                </label>

                {/* // readSubject */}
                <Input
                  className=" w-full mt-2 mb-8 ml-0"
                  placeholder="ProductTitle"
                  value={subject}
                  onChange={(e: any) => {
                    setSubject(e.target.value);
                  }}
                />
                <div className="flex w-full gap-2 mb-10">
                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Product Cost <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={period}
                      placeholder="Product Cost"
                      className="w-full mt-2 ml-0"
                      onChange={(e: any) => {
                        setPeriod(e.target.value);
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Product Description{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={day}
                      placeholder="Product Description"
                      className="ml-0 w-full mt-2"
                      onChange={(e: any) => {
                        setDay(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end transition-all duration-300">
              {subject !== "" && period !== "" && day !== "" ? (
                <label
                  //   htmlFor="assign_subject_timetable"
                  className="bg-blue-950 text-white py-4 px-8 rounded-md cursor-pointer "
                  onClick={onHandleAdd}
                >
                  Proceed
                </label>
              ) : (
                <Button
                  name="Can't Proceed"
                  className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                />
              )}
            </div>
          </div>

          <label className="modal-backdrop" htmlFor="assign_subject_timetable">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default StoreScreen;
