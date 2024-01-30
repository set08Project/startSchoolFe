import { FC, PropsWithChildren } from "react";

interface iProps {
  tip?: string;
}

const Tooltip: FC<PropsWithChildren<iProps>> = ({ children, tip }) => {
  return (
    <div>
      <div className="lg:tooltip" data-tip={tip}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
