import React from "react";

const UnlockScreen = () => {
  const data = [
    {
      count: 5,
      title: "Schools",
    },
    {
      count: 100,
      title: "Teachers",
    },
    {
      count: 1,
      title: "Communities",
    },
    {
      count: 200,
      title: "Satisfied Customers",
    },
  ];
  return (
    <div className="mt-10 text-blue-950">
      <div className=" mx-20 grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="flex col-span-2">
          <p className=" border-l-2 pl-4 border-blue-950 text-[18px] capitalize font-extralight mb-5">
            Unlocking the true potential of Education with cutting edge
            technology
          </p>
        </div>

        <div className="col-span-3 bg-slate-50 rounded-lg grid grid-cols-4 gap-2">
          {data?.map((props: any) => (
            <div className="flex flex-col items-center border-r  h-full">
              <p className="font-semibold text-[25px] mt-2">{props.count}+</p>
              <p className="text-[15px] text-center mt-2">{props?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnlockScreen;
