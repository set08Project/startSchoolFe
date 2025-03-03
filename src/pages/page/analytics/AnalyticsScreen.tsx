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
import {
  useSchoolData,
  useSchoolTermDetails,
} from "@/pages/hook/useSchoolAuth";
import _ from "lodash";
const AnalyticScreen: React.FC = () => {
  const { data } = useSchoolData();
  const { data: termData } = useSchoolTermDetails(data?.presentTermID);

  const otherPayment = _?.sumBy(
    termData?.data?.paymentOptions,
    (option: any) => Number(option.paymentAmount) || 0
  );

  const storePayment = _?.sumBy(termData?.data?.storePayment, "amount");

  const expensePayment = _?.sumBy(termData?.data?.expensePayOut, "amount");

  const schoolFeePayment = _?.sumBy(termData?.data?.schoolFeePayment, "cost");

  let allData = termData?.data?.storePayment.concat(
    termData?.data?.schoolFeePayment,
    termData?.data?.paymentOptions
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Inflow[income]"
          total={`₦${parseFloat(`${otherPayment}`).toLocaleString()}`}
          rate=""
          levelUp
        >
          <BsCashCoin size={30} />
        </CardDataStats>
        <CardDataStats
          title="Outflow[Expenses]"
          total={`₦${parseFloat(`${expensePayment}`).toLocaleString()}`}
          rate=""
          levelUp
        >
          <FaCcMastercard size={30} />
        </CardDataStats>
        <CardDataStats
          title="Store Sales"
          total={`₦${parseFloat(`${storePayment}`).toLocaleString()}`}
          rate=""
          levelUp
        >
          <FaStore size={30} />
        </CardDataStats>
        <CardDataStats
          title="School Fees[Paid]"
          total={`₦${parseFloat(`${schoolFeePayment}`).toLocaleString()}`}
          rate="1006"
          levelDown
        >
          <BsPeopleFill size={30} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne
          schoolFee={termData?.data?.schoolFeePayment}
          store={termData?.data?.storePayment}
          others={termData?.data?.paymentOptions}
        />
        <ChartTwo />

        <div className="col-span-12 xl:col-span-12">{/* <TableOne /> */}</div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default AnalyticScreen;
