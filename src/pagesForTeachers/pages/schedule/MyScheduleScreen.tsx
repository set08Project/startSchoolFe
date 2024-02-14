import LittleHeader from "../../components/layout/LittleHeader";
import { useTeacherInfo, useTeacherSchedule } from "../../hooks/useTeacher";

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
  const { teacherSchedule } = useTeacherSchedule(teacherInfo?._id);
  const title = Array.from({ length: 5 }, () => {
    return { title: daysData[Math.ceil(Math.random() * daysData.length - 1)] };
  });
  const data = Array.from({ length: 10 });

  console.log("kk ", teacherInfo);
  console.log("kk ", teacherSchedule);

  return (
    <div>
      <LittleHeader name="My Schedule" />
      <div className="w-full">
        <div className="">
          <div className=" w-full bg-slate-50 min-h-[calc(100vh-240px)] border rounded-md p-2 overflow-x-auto gap-4">
            {/* Header */}
            <div className="flex w-[2600px] gap-4 bg-white py-3 px-1">
              <div className="w-[295px] h-6 border-r">days</div>

              <div className="w-[300px] h-6  border-r">08:10AM - 08:50AM </div>
              <div className="w-[300px] h-6  border-r">08:50AM - 09:30AM </div>
              <div className="w-[300px] h-6  border-r">09:30AM - 10:10AM</div>
              <div className="w-[300px] h-6  border-r">10:10AM - 10:20AM </div>
              <div className="w-[300px] h-6  border-r">10:20AM - 11:00AM </div>
              <div className="w-[300px] h-6  border-r">11:00AM - 11:40AM </div>
              <div className="w-[300px] h-6  border-r">
                11:40AM - 12:00NOON{" "}
              </div>
              <div className="w-[300px] h-6  border-r">
                12:00NOON - 12:40PM{" "}
              </div>
              <div className="w-[300px] h-6  border-r">12:40PM - 01:20PM </div>
              <div className="w-[300px] h-6  border-r">01:20PM - 02:00PM </div>
            </div>

            <div className="flex w-[2600px] gap-4 px-1 py-3 mt-2">
              <div className="w-[200px] h-6 border-r">
                {title?.map((props: any, i: number) => (
                  <div
                    key={i}
                    className={`py-2 border rounded-lg bg-white h-[170px] my-2 flex justify-center items-center  `}
                  >
                    {props?.title}
                  </div>
                ))}
              </div>

              <div className="">
                {data?.map((props: any, i: number) => (
                  <div
                    key={i}
                    className={`
                flex flex-col py-2 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                `}
                  >
                    <div className="flex   ">
                      {props?.map((props: any, e: number) => (
                        <div className="flex">
                          <div key={e} className="w-[200px] h-6 border-r ">
                            {props.subject}
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
