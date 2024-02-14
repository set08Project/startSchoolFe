import React from "react";
import LittleHeader from "../../components/layout/LittleHeader";

const QuizSetupScreen = () => {
  const data = Array.from({ length: 10 });
  return (
    <div>
      <LittleHeader name="Viewing Quiz" />

      <div className="mt-10" />

      <div className="mb-5 flex justify-between items-center ">
        <p>View Quiz</p>
        <p className="font-medium cursor-pointer">+ Create Quiz</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        {data.map((props: any, i: number) => (
          <div
            key={i}
            className="border p-4 rounded-md h-[200px] flex flex-col"
          >
            <p className="font-bold mt-5 text-[15px] ">Mathematics</p>

            <div className="flex">
              <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50 ">
                Quiz
              </p>
            </div>

            <div className="flex-1" />
            <div className="flex justify-between text-[13px]">
              <div>
                Questions: <span className="font-bold">10</span>
              </div>
              <div>
                Mark/Question: <span className="font-bold">10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSetupScreen;
