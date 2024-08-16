import { FC } from "react";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

interface iProps {
  name?: string;
  url?: string;
}

const LittleHeader: FC<iProps> = ({ name, url }) => {
  return (
    <div>
      {" "}
      <div className="flex items-center text-blue-950">
        <Link to="/dashboard" className="flex items-center">
          Account <LiaGreaterThanSolid size={13} className="mx-4 " />{" "}
        </Link>
        <div className="capitalize text-[17px] font-[500]">{name}</div>
      </div>
      <Link to={url}>
        <div className="text-blue-800 mt-5 font-[500] text-[30px] capitalize">
          {name}
        </div>
      </Link>
    </div>
  );
};

export default LittleHeader;
