import { useState } from "react";
import LittleHeader from "../../components/layout/LittleHeader";
import Button from "../../components/reUse/Button";
import { useParams } from "react-router-dom";

interface TestDetails {
  question: string;
  answer: string;
  options: { [key: string]: string }[];
}

interface iTestProps {
  id: number;
  subjectTest: string;
  time: string;
  testDetails: TestDetails[];
  gradeScore: number;
}

const testData: iTestProps = {
  id: 2,
  subjectTest: "Maths Test1",
  time: "2hrs",

  testDetails: [
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "James" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
  ],
  gradeScore: 5,
};

const QuizTestScreen = () => {
  const { quizID } = useParams();
  const [state, setState] = useState<any>({});

  const handleStateChange = (questionValue: any, optionValue: any) => {
    setState((el: any) => ({
      ...el,
      [questionValue]: optionValue,
    }));
  };

  const handleSubmit = () => {
    let correctAnswer: Array<string> = [];
    let score: number = 0;

    for (let i = 0; i < testData.testDetails.length; i++) {
      correctAnswer.push(testData.testDetails[i].answer);
      if (correctAnswer[i] === Object.values(state)[i]) {
        score++;
      }
    }
  };
  //

  return (
    <div>
      <LittleHeader name="Mathematics Test Screen" />
      <div className="bg-slate-50 justify-center flex min-h-[100vh]">
        <div className=" bg-white w-full px-5">
          {/* <p className=" w-full text-center font-bold text-[20px] my-1">
            Question
          </p> */}

          {testData?.testDetails?.map((props: any, index: number) => (
            <div>
              <p className="text-[14px] font-bold mt-10">
                Question {index + 1}.
              </p>
              <div className="ml-4 ">
                <p className="text-[18px]">{props.question}</p>

                <div className="ml-8">
                  <p className="text-[12px] mt-5">
                    Choose your Options carefully
                  </p>
                  {props.options.map((props: any, i: number) => {
                    const choiceValue = Object.values(props)[0];
                    const choice = Object.keys(props)[0];

                    return (
                      <div key={i} className="flex items-center gap-2 ml-4">
                        <input
                          className="radio radio-sm"
                          type="radio"
                          onChange={() => {
                            handleStateChange(index, choiceValue);
                          }}
                          id={`${index} - ${choice}`}
                          value={`${choiceValue}`}
                          checked={state[index] === choiceValue}
                        />
                        <label htmlFor={`${index} - ${choice}`}>
                          {props[choice]}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          <div>
            <Button
              className="bg-blue-950 px-12 mt-14 py-4 "
              name={"Submit"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTestScreen;
