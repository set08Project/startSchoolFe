// import moment from "moment";
import pix from "../../assets/pix.jpg";
import Button from "../../components/reUse/Button";
import LittleHeader from "../../components/static/LittleHeader";

const ViewStaffScreen = () => {
  document.title = "View Staff";
  const data = Array.from({ length: 7 });

  return (
    <div>
      {/* header */}
      <LittleHeader name={"viewing all Staffs"} />

      <div className="mt-10" />

      <div className="flex w-full justify-end">
        <Button
          name="Add a new Recruit"
          className="uppercase text-[12px] font-medium bg-blue-950 py-4 px-8 hover:bg-blue-900 cursor-pointer transition-all duration-300 "
        />
      </div>
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1800px] flex items-center gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[130px] border-r">Date</div>
          <div className="w-[150px] border-r">Staff Image</div>
          <div className="w-[200px] border-r">Staff Name</div>

          <div className="w-[100px] border-r">Staff Role</div>
          <div className="w-[150px] border-r">Phone</div>
          <div className="w-[200px] border-r">Contact </div>
          <div className="w-[200px] border-r">Subjects Taking</div>
          <div className="w-[200px] border-r">Class Handle</div>
          <div className="w-[200px] border-r">Class Teaches</div>
          <div className="w-[180px] border-r">Action</div>
        </div>

        <div className=" w-[1800px] overflow-hidden">
          {data?.map((props: any, i: number) => (
            <div>
              <div>
                <div
                  key={props}
                  className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="w-[130px] border-r">{"22-22-22"}</div>
                  {/* name */}
                  <div className="w-[150px] flex justify-center border-r">
                    <img
                      className="w-14 h-14 rounded-md border object-cover"
                      src={pix}
                    />
                  </div>

                  <div className="w-[200px] border-r">name</div>

                  <div className="w-[100px] border-r  ">Role</div>
                  <div className="w-[150px] border-r  ">phone</div>
                  <div className="w-[200px] border-r  ">contact</div>
                  <div className="w-[200px] border-r  ">Suject Taking</div>
                  <div className="w-[200px] border-r  ">Class Handle</div>
                  <div className="w-[200px] border-r  ">Class Teaches</div>

                  <div className="w-[180px] border-r">
                    <Button
                      name="View Detail"
                      className="py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                      onClick={() => {}}
                    />
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

export default ViewStaffScreen;
