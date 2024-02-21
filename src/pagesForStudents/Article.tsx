import React from "react";
import LittleHeader from "../components/layout/LittleHeader";
import { MdAutoAwesome } from "react-icons/md";

const Article = () => {
  return (
    <div>
      <LittleHeader name="view school's Article" />

      <div className=" mt-32 w-full h-full flex flex-col items-center justify-center ">
        <MdAutoAwesome />
        <div className="opacity-50 mt-5">No Article Published yet</div>
      </div>
    </div>
  );
};

export default Article;
