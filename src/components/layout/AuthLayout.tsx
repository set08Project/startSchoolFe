import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="text-blue-950 w-full min-h-screen flex flex-col ">
      <div className={`${pathname === "/auth" ? "mt-5" : "mt-12"}`}>
        <Outlet />
      </div>

      <div className="flex-1" />

      <div className="flex justify-center items-center flex-col ">
        <div className="w-full pb-3 flex flex-col items-center">
          <div className="border-b w-[40%]  " />
        </div>

        <div className="text-[13px] mt-2">Built to support your school</div>
        <p className="font-medium text-[14px] mt-1">
          Innovating Education, Just for you!
        </p>
        <div className="mt-5" />
      </div>
    </div>
  );
};

export default AuthLayout;
