import { useEffect, useState } from "react";
import { useSchoolDataByName } from "../pages/hook/useSchoolAuth";
import { useParams } from "react-router-dom";
import MainHeader from "./MainHeader";

const MainSchoolPage = () => {
  const { schoolName } = useParams();

  const [name, setName] = useState<string>("");
  const { schoolInfo } = useSchoolDataByName(name);

  useEffect(() => {
    if (schoolName) {
      setName(schoolName);
    }
  }, []);

  document.title = `${schoolInfo?.schoolName}`;

  console.log(schoolInfo?.schoolName);

  return (
    <div>
      {schoolInfo?.schoolName !== undefined ? (
        <MainHeader props={schoolInfo} />
      ) : (
        <div>no page found</div>
      )}
    </div>
  );
};

export default MainSchoolPage;
