import pix from "../../../assets/pix.jpg";
const MostActiveScreen = () => {
  const enter = Array.from({ length: 4 });

  return (
    <div className="py-6  rounded-md min-w-[300px] overflow-y-hidden ">
      {/* header */}

      <div className=" w-[800px] overflow-hidden">
        <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
          <div className="text-[gray] w-[700px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
            <div className="w-[200px] border-r">Subject Name</div>

            <div className="w-[200px] border-r">Teacher Info</div>
            <div className="w-[100px] border-r">Class</div>
            <div className="w-[200px] border-r">Assign Teacher</div>
          </div>

          {enter?.map((props: any, i: number) => (
            <div>
              {i <= 4 && (
                <div>
                  <div className=" w-[700px] overflow-hidden ">
                    <div>
                      <div>
                        <div
                          key={props}
                          className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
                            i % 2 === 0 ? "bg-slate-50" : "bg-white"
                          }`}
                        >
                          <div className="w-[200px] border-r">
                            {"props?.subjectTitle"}
                          </div>

                          <div className={`w-[200px] border-r `}>
                            <div className="flex gap-2">
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img src={pix} alt="Avatar" />
                                </div>
                              </div>
                              <div>
                                <p>Name</p>
                              </div>
                            </div>
                          </div>

                          <div className="w-[100px] border-r">
                            {/* {props?.designated} */}
                          </div>

                          <div className="w-[200px] border-r">
                            {/* {props?.designated} */}
                          </div>

                          {/* name */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostActiveScreen;
