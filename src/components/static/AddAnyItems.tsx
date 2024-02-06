import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { displaySubject } from "../../global/reduxState";
import { MdClose } from "react-icons/md";
import Input from "../reUse/Input";
import Button from "../reUse/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";

interface iProps {
  props?: any;
  text?: any;
  handleFn?: any;
  offFn?: any;
  titleCall?: string;
  start?: string;
  end?: string;
  setStart?: React.Dispatch<React.SetStateAction<string>>;
  setEnd?: React.Dispatch<React.SetStateAction<string>>;
  placeEnd?: string;
  placeStart?: string;
  startTitle?: string;
  endTitle?: string;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  en?: boolean;
}

const AddAnyItem: FC<iProps> = ({
  text,
  handleFn,
  start,
  end,
  setStart,
  setEnd,
  placeStart,
  placeEnd,
  startTitle,
  endTitle,
  loading,
  en,
  offFn,
  titleCall,
}) => {
  return (
    <div className="flex mt-60 justify-center ">
      <div className="w-[500px] min-h-[300px] border rounded-md bg-white shadow-md p-4">
        <p className="flex items-center justify-between my-4 ">
          <p className="font-bold">{titleCall}</p>
          <Toaster position="top-center" reverseOrder={true} />

          <p
            className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
            onClick={offFn}
          >
            <MdClose />
          </p>
        </p>
        <hr />

        <p className="mt-2 leading-tight text-[13px] font-medium">{text}</p>

        <div className="mt-10 w-full gap-2 flex items-center">
          <div className="w-full">
            <label className="font-medium text-[12px]">
              {startTitle} <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder={placeStart}
              className="mx-0 h-10 w-full"
              value={start}
              onChange={(e: any) => {
                setStart!(e.target.value);
              }}
            />
          </div>

          {en && (
            <div className="w-full">
              <label className="font-medium text-[12px]">
                {endTitle} <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder={placeEnd}
                className="mx-0 h-10  w-full"
                value={end}
                onChange={(e: any) => {
                  setEnd!(e.target.value);
                }}
              />
            </div>
          )}
        </div>

        <div className="w-full flex justify-end transition-all duration-300">
          {start !== "" && end !== "" ? (
            <Button
              name={
                loading ? (
                  <div>
                    <ClipLoader color="#fff" size={12} />{" "}
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Proceed"
                )
              }
              className="bg-blue-950  mx-0"
              onClick={handleFn}
            />
          ) : (
            <Button
              name="Can't Proceed"
              className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAnyItem;
