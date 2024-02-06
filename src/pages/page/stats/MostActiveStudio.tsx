// import { useAllStudios } from "../../hooks/useStudio";

import UserSingleDataActive from "./UserForActiove";
// import _ from "lodash";

const MostActiveScreen = () => {
  // const { data } = useAllStudios();

  // const occurrences = _.countBy(data, "studioName");

  // const enter = _.chain(occurrences)
  //   .toPairs()
  //   .sortBy((pair) => -pair[1])
  //   .take(5)
  //   .map((pair) => ({ studioName: pair[0], booked: pair[1] }))
  //   .value();

  const data = Array.from({ length: 2 });
  const enter = Array.from({ length: 4 });

  return (
    <div
      className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
      style={{ color: "var(--secondary)" }}
    >
      {/* header */}
      <div className="text-[gray] w-[1000px] flex items-center gap-2 text-[12px] font-medium uppercase mb-10 px-4">
        <div className="w-[50px] border-r">s/n</div>
        <div className="w-[150px] border-r">Studio Image</div>
        <div className="w-[170px] border-r">Studio Name</div>
        <div className="w-[170px] border-r">Studio Owner</div>
        <div className="w-[200px] border-r">Location</div>
        <div className="w-[80px] border-r">Times Booked</div>
        <div className="w-[180px] border-r">Total Revenue</div>
      </div>

      <div className=" w-[1000px] overflow-hidden">
        {enter?.map((props: any, i: number) => (
          <div>
            {i <= 4 && (
              <div
                key={props}
                className={`w-[1000px] flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                  i % 2 === 0 ? "bg-slate-50" : "bg-white"
                }`}
              >
                <div className="w-[50px] border-r">{i + 1}</div>
                {/* name */}
                <div className="w-[150px] flex justify-center border-r">
                  {/* <SingleStudioData props={props} image /> */}

                  <UserSingleDataActive props={props} image />
                </div>

                <div className="w-[170px] border-r">{props.studioName}</div>
                <div className="w-[170px] border-r">
                  {<UserSingleDataActive props={props} owner />}
                </div>

                <div className="w-[200px] border-r">
                  <UserSingleDataActive props={props} contact />
                </div>

                <div className="w-[80px] border-r">{props?.booked}</div>

                <div className="w-[180px] border-r">
                  <UserSingleDataActive
                    props={props}
                    cost
                    costData={props?.booked}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostActiveScreen;
