import pix from "../../../assets/pix.jpg";

const TopRatedTeacher = () => {
  return (
    <div>
      <div className="carousel carousel-end rounded-box w-96 gap-2 *:bg-slate-100">
        <div className="carousel-item w-1/2">
          <div className="w-full h-[300px]">
            <img src={pix} className="w-full h-[70%] object-cover" />
            <div className="p-2 text-[12px]">
              <p>
                Name: <span className="capitalize font-bold">name</span>
              </p>
              <p>
                Class: <span className="capitalize font-bold">name</span>
              </p>
              <div className="flex items-center text-[10px] gap-3 mt-4 leading-tight">
                <p>
                  Grade Ratio:{" "}
                  <span className="capitalize font-bold">name</span>
                </p>

                <p>
                  Att. Ratio:{" "}
                  <span className="ml-1 capitalize font-bold">name</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-1/2">
          <div className="w-full h-[300px]">
            <img src={pix} className="w-full h-[70%] object-cover" />
            <div className="p-2 text-[12px]">
              <p>
                Name: <span className="capitalize font-bold">name</span>
              </p>
              <p>
                Class: <span className="capitalize font-bold">name</span>
              </p>
              <div className="flex items-center justify-between text-[10px] gap-3 mt-4 leading-tight">
                <p>
                  Grade Ratio:{" "}
                  <span className="capitalize font-bold">name1</span>
                </p>
                {/* &middot; */}
                <p>
                  Att. Ratio:{" "}
                  <span className="ml-1 capitalize font-bold">name</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-1/2">
          <div className="w-full h-[300px]">
            <img src={pix} className="w-full h-[70%] object-cover" />
            <div className="p-2 text-[12px]">
              <p>
                Name: <span className="capitalize font-bold">name</span>
              </p>
              <p>
                Class: <span className="capitalize font-bold">name</span>
              </p>
              <div className="flex items-center text-[10px] gap-3 mt-4 leading-tight">
                <p>
                  Grade Ratio:{" "}
                  <span className="capitalize font-bold">name</span>
                </p>

                <p>
                  Att. Ratio:{" "}
                  <span className="ml-1 capitalize font-bold">name</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-1/2">
          <div className="w-full h-[300px]">
            <img src={pix} className="w-full h-[70%] object-cover" />
            <div className="p-2 text-[12px]">
              <p>
                Name: <span className="capitalize font-bold">name</span>
              </p>
              <p>
                Class: <span className="capitalize font-bold">name</span>
              </p>
              <div className="flex items-center text-[10px] gap-3 mt-4 leading-tight">
                <p>
                  Grade Ratio:{" "}
                  <span className="capitalize font-bold">name</span>
                </p>

                <p>
                  &middot; Att. Ratio:{" "}
                  <span className="ml-1 capitalize font-bold">name</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-1/2">
          <div className="w-full h-[300px]">
            <img src={pix} className="w-full h-[70%] object-cover" />
            <div className="p-2 text-[12px]">
              <p>
                Name: <span className="capitalize font-bold">name</span>
              </p>
              <p>
                Class: <span className="capitalize font-bold">name</span>
              </p>
              <div className="flex items-center text-[10px] gap-3 mt-4 leading-tight">
                <p>
                  Grade Ratio:{" "}
                  <span className="capitalize font-bold">name</span>
                </p>

                <p>
                  &middot; Att. Ratio:{" "}
                  <span className="ml-1 capitalize font-bold">name</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-1/2">
          <div className="w-full h-[300px]">
            <img src={pix} className="w-full h-[70%] object-cover" />
            <div className="p-2 text-[12px]">
              <p>
                Name: <span className="capitalize font-bold">name</span>
              </p>
              <p>
                Class: <span className="capitalize font-bold">name</span>
              </p>
              <div className="flex items-center text-[10px] gap-3 mt-4 leading-tight">
                <p>
                  Grade Ratio:{" "}
                  <span className="capitalize font-bold">name</span>
                </p>

                <p>
                  &middot; Att. Ratio:{" "}
                  <span className="ml-1 capitalize font-bold">name</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatedTeacher;
