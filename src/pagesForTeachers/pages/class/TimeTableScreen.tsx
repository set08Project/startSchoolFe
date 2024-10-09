import { FC } from "react";
import lodash from "lodash";
import {
  useClassTimeTable,
  useSchool,
  useSchoolData,
} from "../../../pages/hook/useSchoolAuth";

interface iProps {
  props?: any;
}

const daysData = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimeTableScreen: FC<iProps> = ({ props }) => {
  const { timetbale } = useClassTimeTable(props!);

  const parseTime = (timeString: string): number => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const dataTime: any = Object.values(
    lodash.groupBy(timetbale?.data?.timeTable, "day")
  )?.map((subArray: any) =>
    subArray.sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  );

  // parseTime(a.time.split(" - ")[0]) - parseTime(b.time.split(" - ")[0])
  const { data } = useSchoolData();

  return (
    <div className="w-full ">
      <div className=" h-screen">
        <div className=" w-full h-[415px] bg-slate-100  border rounded-md p-2 overflow-x-auto gap-4">
          {/* Header */}
          <div
            className={`flex w-[${
              data?.timeTableStructure?.length * 300
            }px] gap-4 bg-white py-3 px-1`}
            style={{
              width: `${data?.timeTableStructure?.length * 300}px`,
            }}
          >
            <div className="w-[210px] h-6 border-r ">days</div>
            {/* <div className="w-[280px] h-6 border-r">07:45AM - 08:00AM</div> */}
            {data?.timeTableStructure?.map((el: string, i: number) => (
              <div key={i} className="w-[300px] h-6 border-r">
                {el}
              </div>
            ))}
          </div>

          <div className="flex gap-0  py-3 mt-2 ">
            <div className="w-[200px] h-6 border-r ">
              {daysData?.map((props: string, i: number) => (
                <div
                  key={i}
                  className={`py-2 pl-2 h-[3.75rem] w-[188px] ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  {" "}
                  {props}
                </div>
              ))}
            </div>

            <div
              className="gap-1 px-1 "
              style={{
                width: `${data?.timeTableStructure?.length * 300}px`,
              }}
            >
              {dataTime?.map((props: any, i: number) => (
                <div
                  key={i}
                  className={`
                flex flex-col py-2 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                `}
                >
                  <div className="flex   ">
                    {/* <div className="w-[270px] h-6 border-r">
                      07:45AM - 08:00AM
                    </div> */}
                    {props?.map((props: any, e: number) => (
                      <div key={e} className="flex">
                        <div className="w-[285px] h-11 border-r px-4">
                          {props.subject}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTableScreen;
