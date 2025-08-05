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
import { useTermExpenses } from "@/pagesForStudents/hooks/useStudentHook";
const AnalyticScreen: React.FC = () => {
  const { data } = useSchoolData();
  const { data: termData } = useSchoolTermDetails(data?.presentTermID);

  const { termlyExpense } = useTermExpenses(data?._id);

  const otherPayment = _?.sumBy(
    termData?.data?.paymentOptions,
    (option: any) => Number(option.paymentAmount) || 0
  );

  const storePayment = _?.sumBy(termData?.data?.storePayment, "amount");

  const expensePayment = _?.sumBy(termData?.data?.expensePayOut, "amount");

  // const schoolFeePayment = _?.sumBy(termData?.data?.schoolFeePayment, "cost");

  console.clear();
  console.log("termData", termData?.data?.schoolFeePayment);

  let allData = termData?.data?.storePayment.concat(
    termData?.data?.schoolFeePayment,
    termData?.data?.paymentOptions
  );
  const expenseData = termlyExpense?.data?.expense
    ?.map((el: any) => {
      return el?.amount ? el?.amount : 0;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);
  const schoolFeePayment = termData?.data?.schoolFeePayment
    ?.map((el: any) => {
      return el?.amount ? el?.amount : 0;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);
  
  console.log("data: ", termData);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 text-blue-950">
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
          total={`₦${parseFloat(`${expenseData}`).toLocaleString()}`}
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
          rate={`${termData?.data?.schoolFeePayment?.length}`}
          levelDown
        >
          <BsPeopleFill size={30} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne
          schoolFee={schoolFeePayment}
          store={storePayment}
          others={otherPayment}
          expensePayment={expenseData}
          data={data}
        />
        <ChartTwo />

        <div className="col-span-12 xl:col-span-12">{/* <TableOne /> */}</div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default AnalyticScreen;
