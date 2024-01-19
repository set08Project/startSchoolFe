import { FC } from "react";
import { iProps } from "./familyProps";

const PersonalInfo = () => {
  // const { otherUser }: any = useOtherUser(props?._id);

  let count: number = 0;

  return (
    <div>
      {/* data bar */}
      <p className="mb-8">
        <span className="font-bold text-[12px] ">
          Profile: {((6 * count) / 100) * 280}% completed
        </span>
        <div className="w-full h-[5px] relative">
          <div className="w-full h-full bg-neutral-200 rounded-md absolute top-0" />
          <div
            className={`h-full bg-green-500 rounded-md  absolute top-0`}
            style={{
              width: `${41.0 * count}px`,
            }}
          />
        </div>
      </p>

      <div className="text-[13px]">
        <p className="font-normal mb-1">
          First Name:{" "}
          <span className="text-[gray] capitalize text-[12px]">
            yet to fill
          </span>
        </p>
        <p className="font-normal mb-1">
          Middle Name:{" "}
          <span className="font-medium ">
            <span className="text-[gray] capitalize text-[12px]">
              yet to fill
            </span>
          </span>
        </p>
        <p className="font-normal mb-1">
          Family Name:{" "}
          <span className="font-medium ">
            <span className="text-[gray] capitalize text-[12px]">
              yet to fill
            </span>
          </span>
        </p>
        <p className="font-normal mb-1">
          Phone Number:{" "}
          <span className="font-medium ">
            <span className="text-[gray] capitalize text-[12px]">
              yet to fill
            </span>
          </span>
        </p>
        <p className="font-normal mb-1">
          Contact Email:{" "}
          <span className="font-medium ">
            <span className="text-[gray] capitalize text-[12px]">
              yet to fill
            </span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;
