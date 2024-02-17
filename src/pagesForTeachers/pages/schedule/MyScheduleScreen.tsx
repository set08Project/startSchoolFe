import LittleHeader from "../../components/layout/LittleHeader";
import { useTeacherInfo, useTeacherSchedule } from "../../hooks/useTeacher";
import lodash from "lodash";

const periodicData = [
  "07:45AM - 08:10AM",
  "08:10AM - 08:50AM",
  "08:50AM - 09:30AM ",
  "09:30AM - 10:10AM",
  "10:10AM - 10:20AM",
  "10:20AM - 11:00AM",
  "11:00AM - 11:40AM",
  "11:40AM - 12:00NOON ",
  "12:00NOON - 12:40PM",
  "12:40PM - 01:20PM",
  "01:20PM - 02:00PM",
];

const daysData = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const MyScheduleScreen = () => {
  const { teacherInfo } = useTeacherInfo();
  const { teacherSchedule: dataData } = useTeacherSchedule(teacherInfo?._id);

  const data = Object.values(lodash.groupBy(dataData?.schedule, "day"));

  return (
    <div>
      <LittleHeader name="My Schedule" />
      <div className="w-full">
        <div className="">
          <div className=" w-full bg-slate-50 min-h-[calc(100vh-240px)] border rounded-md p-2 overflow-x-auto gap-4">
            {/* Header */}

            <div className="flex w-[2600px] gap-4 px-1 py-3 mt-2">
              <div className="w-[200px] h-6 border-r">
                {daysData?.map((props: any, i: number) => (
                  <div
                    key={i}
                    className={`py-2 border rounded-lg bg-white h-[170px] my-2 flex justify-center items-center  `}
                  >
                    {props}
                  </div>
                ))}
              </div>

              <div className="flex ">
                {data?.map((props: any, i: number) => (
                  <div
                    key={i}
                    className={`
                flex flex-col py-2 my-0  $
                `}
                  >
                    <div className="flex gap-4 ">
                      {props?.map((props: any, e: number) => (
                        <div className="flex">
                          <div
                            key={e}
                            className=" h-[170px] flex justify-center items-center rounded-lg flex-col w-[200px] bg-white border"
                          >
                            <p>{props?.subject}</p>
                            <p>{props?.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 
          <div className="flex w-[2600px] gap-4 px-1 py-3 mt-2">
            
            <div className="w-[300px] h-6  border-r">Assembly</div>
            <div className="w-[300px] h-6  border-r">Chemistry</div>
            <div className="w-[300px] h-6  border-r">time</div>
            <div className="w-[300px] h-6  border-r">time</div>
            <div className="w-[300px] h-6  border-r">Short Break</div>
            <div className="w-[300px] h-6  border-r">time</div>
            <div className="w-[300px] h-6  border-r">time</div>
            <div className="w-[300px] h-6  border-r">Long Break</div>
            <div className="w-[300px] h-6  border-r">time</div>
            <div className="w-[300px] h-6  border-r">time</div>
            <div className="w-[300px] h-6  border-r">time</div>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleScreen;
