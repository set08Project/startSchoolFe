import { FC, useEffect, useState } from "react";
import { approveRegisterationStatus } from "../../../../pages/api/schoolAPIs";

interface iPropsCard {
  text?: string;
  logo: string;
  companyName: string;
  initialSchoolID?: string;
}

const CompanyCard: FC<iPropsCard> = ({
  logo,
  companyName,
  initialSchoolID,
}) => {
  const [schoolData, setSchoolData] = useState<any>(null);
  const [schoolID] = useState<string>(initialSchoolID || "");

  console.log("initialSchoolID", initialSchoolID);

  const getData = async () => {
    try {
      if (schoolID) {
        const res = await approveRegisterationStatus(initialSchoolID);
        if (res?.status === 200) {
          console.log("API Response Data:", res.data?.data);
          setSchoolData(res.data?.data);
        } else {
          console.error("Failed to fetch school data. Status:", res?.status);
        }
      } else {
        console.error("No schoolID found in state.");
      }
    } catch (error: any) {
      console.error("Error fetching school data:", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [schoolID]);

  return (
    <div>
      <p className="font-bold pl-5 text-xl">New School</p>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-2 overflow-y-auto mt-3">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Next
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-blue-950 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  School Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Address
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Phone
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Verify
                </th>
              </tr>
            </thead>
            <tbody>
              {schoolData ? (
                <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex justify-start gap-2 items-center">
                    <img
                      src={logo}
                      alt=""
                      className="w-[50px] h-[20px] object-contain rounded-lg mt-2"
                    />
                    <div className="uppercase text-blue-950 text-[16px] mt-2">
                      {companyName}
                    </div>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {schoolData?.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {schoolData?.address}
                  </td>
                  <td className="border-t-0 px-6 mt-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {schoolData?.phone}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                    <p className="text-red-400 ">Not Onboard</p>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button className="w-24 h-9 bg-red-600 text-white rounded">
                      Verify
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    Loading school data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-bold pl-5 text-xl text-green-500">Approve School</p>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-2 mt-4 overflow-y-auto">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Next
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-blue-950 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  School Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Total Teachers
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Total Students
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Verify
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex justify-start gap-2 items-center">
                  <img
                    src={logo}
                    alt=""
                    className="w-[50px] h-[20px] object-contain rounded-lg"
                  />
                  <div className="uppercase text-blue-950 text-[16px]">
                    {companyName}
                    {}
                  </div>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  4,569
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  340
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="w-24 h-9 bg-green-600 text-white rounded">
                    Verified
                  </button>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  <p className="text-green-500">Onboard</p>
                </td>
              </tr>

              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex justify-start gap-2 items-center">
                  <img
                    src={logo}
                    alt=""
                    className="w-[50px] h-[20px] object-contain rounded-lg"
                  />
                  <div className="uppercase text-blue-950 text-[16px]">
                    {companyName}
                    {}
                  </div>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  3,985
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  319
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="w-24 h-9 bg-green-600 text-white rounded">
                    Verified
                  </button>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                  <p className="text-green-500">Onboard</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
