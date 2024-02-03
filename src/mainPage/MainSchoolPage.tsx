import { useEffect, useState } from "react";
import { useSchoolDataByName } from "../hook/useSchoolAuth";
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

  return (
    <div>
      <MainHeader props={schoolInfo} />
    </div>
  );
};

export default MainSchoolPage;
