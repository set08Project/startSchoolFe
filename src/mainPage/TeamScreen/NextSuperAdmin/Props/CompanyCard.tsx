import { FC, useEffect, useState } from "react";
import { getSchool } from "../../../../pages/api/schoolAPIs";

interface iPropsCard {
  text?: string;
  logo: string;
  setTotalSchools: (total: number) => void;
  setTotalTeachers: (total: number) => void;
  setTotalStudents: (total: number) => void;
}

const CompanyCard: FC<iPropsCard> = ({
  logo,
  setTotalSchools,
  setTotalTeachers,
  setTotalStudents,
}) => {
  const [schoolData, setSchoolData] = useState<any[]>([]);

  const getData = async () => {
    try {
      const res = await getSchool();
      if (res?.status === 200) {
        const schools = res.data?.data || [];
        setSchoolData(schools);
        setTotalSchools(schools.length);
        setTotalTeachers(
          schools.reduce(
            (acc: any, school: any) => acc + school.totalTeachers,
            0
          )
        );
        setTotalStudents(
          schools.reduce(
            (acc: any, school: any) => acc + school.totalStudents,
            0
          )
        );
      } else {
        console.error("Failed to fetch school data. Status:", res?.status);
      }
    } catch (error: any) {
      console.error("Error fetching school data:", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const unverifiedSchools = schoolData.filter((school) => !school.verify);
  const verifiedSchools = schoolData.filter((school) => school.verify);

  const renderSchoolRow = (school: any) => (
    <tr key={school._id}>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex justify-start gap-2 items-center">
        <img
          src={logo}
          alt=""
          className="w-[50px] h-[20px] object-contain rounded-lg mt-2"
        />
        <div className="uppercase text-blue-950 text-[14px] mt-2">
          {school.schoolName}
        </div>
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {school.email}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {school.address}
      </td>
      <td className="border-t-0 px-6 mt-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {school.phone}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
        <p className={`text-${school.verify ? "green" : "red"}-400`}>
          {school.verify ? "Onboard" : "Not Onboard"}
        </p>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <button
          className={`w-24 h-9 text-white rounded ${
            school.verify ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {school.verify ? "Verified" : "Verify"}
        </button>
      </td>
    </tr>
  );

  return (
    <div>
      <p className="font-bold pl-5 text-xl">New School</p>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-2 overflow-y-auto mt-3">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Unverified Schools
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
              {unverifiedSchools.length > 0 ? (
                unverifiedSchools.map(renderSchoolRow)
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

      <p className="font-bold pl-5 text-xl text-green-500 pt-3">
        Approve School
      </p>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-2 mt-4 overflow-y-auto">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Verified Schools
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
              {verifiedSchools.length > 0 ? (
                verifiedSchools.map(renderSchoolRow)
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
    </div>
  );
};

export default CompanyCard;
