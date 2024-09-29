import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="text-blue-950 w-full h-[100%] flex flex-col ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
