import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img from "../../../assets/socials/Examsubmited.png";

const FinalMidTestScreenReport = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 p-6 text-center shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Exam Completed!
        </h2>

        <motion.img
          src={img}
          alt="Success Cartoon"
          className="w-32 mx-auto"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />

        <p className="mt-4 text-lg text-gray-600">
          you have just completed your exam all the best!
        </p>

        <Link to="/dashboard" className="mt-6 inline-block">
          <button className="bg-blue-950 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FinalMidTestScreenReport;
