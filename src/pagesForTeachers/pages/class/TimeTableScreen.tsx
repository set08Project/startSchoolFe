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

  const dataTime = Object.values(
    lodash.groupBy(timetbale?.data?.timeTable, "day")
  );

  const dateTime = [
    "07:45AM - 08:00AM",
    "08:00AM - 08:40AM",
    "08:40AM - 09:20AM",
    "09:20AM - 10:00AM",

    "10:00AM - 10:40AM",
    "10:40AM - 11:20AM",
    "11:20AM - 11:50AM",
    "11:50AM - 12:30AM",
    "12:30PM - 01:10PM",
    "01:10PM - 01:50PM",
    "01:50PM - 02:30PM",
    "02:30PM - 03:00PM",
  ];

  const { data } = useSchoolData();

  return (
    <div className="w-full ">
      <div className=" h-screen">
        <div className=" w-full h-[415px] bg-slate-100  border rounded-md p-2 overflow-x-auto gap-4">
          {/* Header */}
          <div className={`flex w-[3150px] gap-4 bg-white py-3 px-1`}>
            <div className="w-[300px] h-6 border-r">days</div>
            {/* <div className="w-[300px] h-6 border-r">07:45AM - 08:00AM</div> */}
            {data?.timeTableStructure?.map((el: string, i: number) => (
              <div key={i} className="w-[300px] h-6 border-r">
                {el}
              </div>
            ))}
          </div>

          <div className="flex w-[3150px] gap-0  py-3 mt-2 ">
            <div className="w-[200px] h-6 border-r">
              {daysData?.map((props: string, i: number) => (
                <div
                  key={i}
                  className={`py-2 pl-2 h-[3.75rem] ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  {" "}
                  {props}
                </div>
              ))}
            </div>

            <div className="w-[calc(3150px-200px)] gap-1 px-1">
              {dataTime?.map((props: any, i: number) => (
                <div
                  key={i}
                  className={`
                flex flex-col py-2 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                `}
                >
                  <div className="flex   ">
                    {props?.map((props: any, e: number) => (
                      <div key={e} className="flex">
                        <div className="w-[218px] h-11 border-r px-4">
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
