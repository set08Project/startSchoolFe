// ;
// 
import useSWR from "swr";
import { getSubjects } from "../api/teachAPI";

export const useReadTeachSubjects = () => {
  const x = `teach-subject/`;


  const { data, mutate } = useSWR(
    x,
    () => {
      return getSubjects().then((res) => {
        return res.data;
      });
    },
   
  );

 

  return { data, mutate };
};