import { useEffect, useState } from "react";
import Button from "../../../components/reUse/Button";
import Input from "../../../components/reUse/Input";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { jwtDecode } from "jwt-decode";
import { loginSchool, verifySchool } from "../../api/schoolAPIs";
import toast, { Toaster } from "react-hot-toast";
import { displayUserStatus, loginState } from "../../../global/reduxState";
import { loginTeacher } from "../../../pagesForTeachers/api/teachersAPI";

const SwitchLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    // e.preventDefault();
    setLoading(true);
    const val = { email: state, password };

    loginTeacher(val)
      .then((res) => {
        if (res.status === 201) {
          dispatch(loginState(res.data));
          dispatch(displayUserStatus(res.user));
          toast.success("login successful");
          setLoading(false);
          console.log(res);

          {
            !loading && navigate("/");
          }
        } else {
          setLoading(false);
          toast.error(`${res?.response?.data?.message}`);
        }
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className=" w-full h-[94vh] flex flex-col justify-center items-center ">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mb-10 text-center flex items-center w-full flex-col">
        <div
          className="mb-5 w-20 h-20 rounded-full border flex justify-center items-center font-bold text-blue-600 text-[30px] cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          SCH
        </div>

        <div className="text-[26px] font-bold mb-3 text-blue-900">
          Welcome Back
        </div>
        <div className="text-[14px] -mt-3 w-[70%] leading-tight">
          {" "}
          Sign in as Teacher, Student or Parent to continue your Experience.
        </div>
      </div>

      <div
        className="rounded-md bg-white min-h-[300px] w-[80%] md:w-[500px] border p-4"
        // onSubmit={handleSubmit}
      >
        <Input
          placeholder="Email"
          className="w-[97%]"
          type="email"
          required
          value={state}
          onChange={(e: any) => {
            setState(e.target.value);
          }}
        />
        <Input
          placeholder="Your Password"
          className="w-[97%]"
          show
          //   errorText="Password has to be passed"
          errorText={
            password && "Please ensure you're putting your correct Password"
          }
          required
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />

        <div>
          <Button
            name={loading ? "Loading..." : "Login"}
            className="w-[97%] bg-blue-900 text-white h-14 hover:bg-blue-800 transition-all duration-300"
            type="submit"
            onClick={handleSubmit}
            icon={loading && <ClipLoader color="white" size={18} />}
          />

          <div className="text-[12px] ml-2 font-bold cursor-pointer">
            {/* Teacher and Student, Switch Login */}
          </div>
        </div>
        <div className="mt-10 mb-0 mx-2 text-[13px] font-medium flex  justify-between ">
          <div>Sign in with social network</div>
        </div>
        <div className="flex flex-col">
          <Button
            name="Continue with Google"
            className="h-14 bg-red-500 hover:bg-red-600 hover:text-white  transition-all duration-300 font-medium text-[#ababab]"
            icon={<FaGoogle />}
          />
        </div>
      </div>
      <div className="mt-5 text-[13px]">
        Don’t have an account yet?{" "}
        <span className="font-bold text-blue-900">
          <Link to="/auth">Register here</Link>
        </span>
      </div>
    </div>
  );
};

export default SwitchLogin;
