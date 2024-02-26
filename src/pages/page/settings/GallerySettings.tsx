import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useEffect, useState } from "react";
import { BsCamera } from "react-icons/bs";
import { createGallaryRestrict } from "../../api/schoolAPIs";
import { useGallary, useSchoolData } from "../../hook/useSchoolAuth";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
document.title = "School's Gallery";
import PhotoAlbum from "react-photo-album";
import slides, { advancedSlides } from "../gallary/slides";

import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const GallerySettings = () => {
  const { data } = useSchoolData();
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  const onHandleImage = (e: any) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);

    setImage(file);
    setAvatar(save);
  };

  useEffect(() => {
    let timimg = setTimeout(() => {
      if (avatar !== "") {
        setLoading(true);
        const formData = new FormData();
        formData.append("avatar", image);

        createGallaryRestrict(data?._id, formData).then((res) => {
          if (res.status === 201) {
            toast.success(`Image Uploaded`);
            setLoading(false);
            setImage("");
            setAvatar("");
          } else {
            toast.error(`${res?.response?.data?.message}`);
            setLoading(false);
          }
        });
      }

      clearTimeout(timimg);
    });
  }, [avatar]);

  const { gallary } = useGallary(data?._id);
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);

  let images = gallary?.data?.map((el: any) => {
    return { src: el.avatar };
  });
  console.log(images);

  let testImages = [
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708847559/bq5g9pxktgwolppdu1rb.jpg",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708847570/iavduio1195tjwwv7qer.jpg",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708847601/sdi1kqws9da6itjxldci.jpg",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708847980/cwv0tohovozjehjsatv1.jpg",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708848491/m7en8esm36spvx46cbuc.jpg",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708848769/hkmf7p7t1jkan8ic4fxr.jpg",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708848808/luopluixzkcxewl5yqnb.jpg",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708848863/xa0a0skpbrscho6txru1.png",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708848961/cmvhddntcrkcrkuc5iup.jpg",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708849023/x3ez1ysm8yhtpqktrgkp.jpg",
    "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708849135/rabpe5mpnt0wlnmmmbcy.jpg",
  ];

  const photos = [
    {
      src: "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708847559/bq5g9pxktgwolppdu1rb.jpg",
      width: 800,
      height: 600,
    },
    {
      src: "https://res.cloudinary.com/dv4dlmp4e/image/upload/v1708849135/rabpe5mpnt0wlnmmmbcy.jpg",
      width: 800,
      height: 600,
    },
  ];

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
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
                className="mb-3 px-5 py-3 border rounded-md m-2 overflow-hidden flex gap-2 items-center justify-center bg-blue-950 text-white text-[18px] cursor-pointer"
              >
                {loading ? (
                  <div className="text-[12px] flex items-center gap-1">
                    <ClipLoader color="white" size={15} />
                    <span>Loading</span>
                  </div>
                ) : (
                  <div className="text-[12px] flex items-center gap-1">
                    <BsCamera color="white" size={18} />
                    <span>Upload</span>
                  </div>
                )}
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
        <button type="button" onClick={() => setOpen(true)}>
          Open Lightbox
        </button>
        <div className=" min-h-[400px] mb-10 w-full border flex justify-start items-center transition-all duration-300">
          <div className="w-full">
            {gallary?.data?.length > 0 ? (
              <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  ">
                {gallary?.data?.map((props: any) => (
                  <img
                    className="w-full h-[300px] rounded-md flex object-cover bg-red-600"
                    src={props?.avatar}
                  />
                ))}

                {/* <PhotoAlbum
                  layout="rows"
                  photos={photos}
                  targetRowHeight={150}
                  onClick={({ index: current }) => setIndex(current)}
                />

                <Lightbox
                  open={open}
                  close={() => setOpen(false)}
                  slides={images}
                /> */}

                {/* <Lightbox
                  index={index}
                  advancedSlides={slides}
                  open={index >= 0}
                  close={() => setIndex(-1)}
                /> */}
              </div>
            ) : (
              <div>no image</div>
            )}
            {/* {gallary?.data?.length > 0 ? (
              <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  ">
                {gallary?.data?.map((props: any) => (
                  <img
                    className="w-full h-[300px] rounded-md flex object-cover bg-red-600"
                    src={props?.avatar}
                  />
                ))}
              </div>
            ) : (
              <div>no image</div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySettings;
