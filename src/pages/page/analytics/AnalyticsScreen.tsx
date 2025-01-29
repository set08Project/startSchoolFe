import React from "react";
import CardDataStats from "../../../components/CardDataStats";
import ChartOne from "../../../components/Charts/ChartOne";
import ChartThree from "../../../components/Charts/ChartThree";
import ChartTwo from "../../../components/Charts/ChartTwo";
import ChatCard from "../../../components/Chat/ChatCard";
import TableOne from "../../../components/Tables/TableOne";
import { BsCashCoin, BsPeopleFill } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";
const AnalyticScreen: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Inflow[income]" total="₦3.456K" rate="" levelUp>
          <BsCashCoin size={30} />
        </CardDataStats>
        <CardDataStats title="Outflow[Expenses]" total="₦45.2K" rate="" levelUp>
          <FaCcMastercard size={30} />
        </CardDataStats>
        <CardDataStats title="Store Sales" total="₦245.0K" rate="" levelUp>
          <FaStore size={30} />
        </CardDataStats>
        <CardDataStats
          title="School Fees[Paid]"
          total="₦400.0K"
          rate="1006"
          levelDown
        >
          <BsPeopleFill size={30} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />

        <div className="col-span-12 xl:col-span-12">
          <TableOne />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default AnalyticScreen;
