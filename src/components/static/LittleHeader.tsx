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
      <Link to="/dashboard">
        <div className="flex items-center text-blue-950">
          Account <LiaGreaterThanSolid size={13} className="mx-4 " />{" "}
          <div className="capitalize">{name}</div>
        </div>
      </Link>
      <Link to={url}>
        <div className="text-blue-800 mt-5 font-[500] text-[30px] capitalize">
          {name}
        </div>
      </Link>
    </div>
  );
};

export default LittleHeader;
