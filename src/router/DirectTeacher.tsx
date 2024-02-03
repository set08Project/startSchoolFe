import { Outlet } from "react-router-dom";

const DirectTeacher = () => {
  return (
    <div>
      <div>
        <Outlet />
        <div>Teacher screen</div>
      </div>
    </div>
  );
};

export default DirectTeacher;
