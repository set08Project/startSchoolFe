import axios from "axios";

// Working Locally
// const URL: string = import.meta.env.VITE_MAIN_URL;

// Working Online
// const URL: string = "https://startschoolbe-3.onrender.com/api";
// const URL: string = import.meta.env.VITE_MAIN_URL;
// const URL: string = "http://localhost:2244/api";

const URL: string = "https://startschoolbe-4.onrender.com/api";

const URLII: string = "https://server.justnext.com.ng/api";

export const clockInWithID = async (schoolID: string, enrollmentID: string) => {
  try {
    return await axios
      .patch(`${URL}/student-clock-in-with-id/${schoolID}`, { enrollmentID })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    
    return error;
  }
};