import { FC, PropsWithChildren } from "react";

interface iProps {
  tip?: string;
}

const Tooltip: FC<PropsWithChildren<iProps>> = ({ children, tip }) => {
  return (
    <div className="w-full ">
      <div className="md:tooltip -mt-5 w-full " data-tip={tip}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
