import { useState } from "react";
import Button from "../../../components/reUse/Button";
import Input from "../../../components/reUse/Input";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { googleAuth, registerSchool } from "../../api/schoolAPIs";
import logo from "../../../assets/mainLogo.png";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getEntryEmail } from "../../../global/reduxState";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (email !== "") {
      registerSchool(email).then((res) => {
        if (res.status === 201) {
          dispatch(getEntryEmail(email));
          setLoading(false);
          navigate("/auth/enquiry-form");
        } else {
          setLoading(false);
          toast.error(
            `${
              res?.response?.data?.data.includes("duplicate")
                ? "Email has Already been used before!"
                : res?.response?.data?.mwssage
            }`
          );
        }
      });
    }
  };

  return (
    <div className=" w-full h-[94vh] flex flex-col justify-center items-center ">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mb-10 text-center flex items-center w-full flex-col">
        <Link to="/">
          <img className="mb-5 w-56 h-28 object-contain" src={logo} />{" "}
        </Link>

        <div className="text-[26px] font-bold mb-3">Create an Account</div>
        <div className="text-[14px] -mt-4 ">
          sign up now and get free account instant.
        </div>
      </div>

      <form
        className="rounded-md bg-white min-h-[150px] w-[80%] md:w-[500px] border p-4"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Email"
          className="w-[97%]"
          type="email"
          required
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        {/* <div className="mx-4 flex items-center gap-3">
          <input
            checked={check}
            type="checkbox"
            onClick={() => {
              setCheck(!check);
            }}
          />

          <label className="text-[12px] leading-tight">
            By checking on the box, you've gone through our Privacy and Data
            Protection Policy!{" "}
          </label>
        </div> */}

        <div>
          {/* {check ? ( */}
          <Button
            name="Register"
            className="w-[97%] bg-blue-900 text-white h-14 hover:bg-blue-800 transition-all duration-300"
            type="submit"
            icon={loading && <ClipLoader color="white" size={18} />}
            // onClick={handleSubmit}
          />
        </div>
      </form>
      <div className="mt-10 mb-0 ml-2 text-[13px] font-medium ">
        Sign up with social network
      </div>
      <div className="flex flex-col">
        <Button
          name="Continue with Google"
          className="h-14 bg-red-500 hover:bg-red-600 hover:text-white  transition-all duration-300 font-medium text-[#e6e6e6] leading-tight w-[97%]text-center text-[12px] sm:text-base "
          icon={<FaGoogle />}
          onClick={() => {
            const URL: string = "https://startschoolbe.onrender.com/api";

            window.location.replace(`${URL}/auth/google`);
          }}
        />
      </div>

      <div className="mt-5 text-[13px]">
        Already have an Account?{" "}
        <span className="font-bold text-blue-900">
          <Link to="/auth/login">Login here</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
