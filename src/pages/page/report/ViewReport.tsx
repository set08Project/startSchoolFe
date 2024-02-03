import LittleHeader from "../../../components/static/LittleHeader";
import pix from "../../../assets/pix.jpg";

const ViewReport = () => {
  const data = Array.from({ length: 7 });
  return (
    <div>
      <LittleHeader name={"Report and Complains"} />

      <div className="mb-28" />

      <div className="mb-28" />

      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1090px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[80px] border-r">Resolved</div>

          <div className="w-[200px] border-r">Name</div>
          <div className="w-[100px] border-r">Status</div>

          <div className="w-[400px] border-r">Complains</div>
          <div className="w-[100px] border-r">Urgency</div>

          <div className="w-[80px] border-r">Make as seen</div>

          <div className="w-[80px] border-r">Make as Resolved</div>
        </div>

        <div className=" w-[1090px] overflow-hidden ">
          {data?.map((props: any, i: number) => (
            <div>
              <div>
                <div
                  key={props}
                  className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="w-[80px] border-r">
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </div>

                  <div className={`w-[200px] border-r `}>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={pix} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-[12px] opacity-50 ">
                          JSS 2C Teacher
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[100px] border-r">Teacher</div>
                  {/* name */}
                  <div className="w-[400px] py-2 flex justify-center border-r font-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vel, obcaecati quae maiores soluta vero expedita repudiandae
                    temporibus provident quas perferendis explicabo quos magni
                    hic ad sit dolores in, odit culpa.
                  </div>
                  <div className="w-[100px] border-r">Very Urgent</div>

                  <div className="w-[80px] border-r pl-6 ">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-error"
                      />
                    </label>
                  </div>
                  <div className="w-[80px] border-r  pl-6">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-warning "
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
