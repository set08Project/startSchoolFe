import gallery1 from "../../../assets/Labkids.jpg";
import gallery2 from "../../../assets/istockphoto-950614324-612x612.jpg";
import gallery3 from "../../../assets/Teacherandstudents.jpg";
// import { BsUpload } from "react-icons/bs";

import LittleHeader from "../../../components/layout/LittleHeader";
import { useState } from "react";
import { BsCamera } from "react-icons/bs";
document.title = "Gallery";
const GallerySettings = () => {
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState(gallery1);

  const onHandleImage = (e: any) => {
    const file = e.target.files![0];
    const readyImage = URL.createObjectURL(file);
    setImage(file);
    setAvatar(readyImage);
  };
  return (
    <div>
      <div className="w-full bg-white py-[20px] ">
        <LittleHeader name={document.title} />
        <div className="flex justify-between items-end">
          <div className="mb-5 text-blue-950">
            Upload School Photos to your custom gallery here
          </div>
          <div>
            <div className=" flex items-center">
              <label
                htmlFor="gallery-upload"
                className="mb-3 px-5 py-3 border rounded-md m-2 overflow-hidden flex gap-2 items-center justify-center bg-blue-950 text-white text-[18px]"
              >
                <BsCamera />
              </label>
              <input
                type="file"
                id="gallery-upload"
                className="hidden"
                placeholder="Upload"
                onChange={onHandleImage}
              />
            </div>
          </div>
        </div>
        <div className="min-h-[400px] mb-10 w-full border flex justify-start items-center gap-10 transition-all duration-300">
          <div className="w-full  py-[50px] gap-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 place-items-center ">
            <div
              className="w-[100%] h-[300px] rounded-md flex justify-center items-center object-contain object-center"
              style={{
                backgroundImage: `url(${gallery1})`,
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="w-[100%] h-[300px] rounded-md flex justify-center items-center object-contain object-center"
              style={{
                backgroundImage: `url(${gallery2})`,
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="w-[100%] h-[300px] rounded-md flex justify-center items-center object-contain object-center"
              style={{
                backgroundImage: `url(${gallery3})`,
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default GallerySettings;
