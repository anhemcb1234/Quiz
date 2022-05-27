import React, { useEffect, useState } from "react";
import { examsServices } from "../services/examsServices";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function DashBoard() {
  const [data, setData] = useState([]);
  const [searchParam] = useSearchParams();
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(1);
  const [idUser, setIdUser] = useState(() => {
    return localStorage.getItem("idUser");
  });
  const [show, setShow] = useState(true);

  const red = "text-red-500";
  useEffect(() => {
    (async () => {
      try {
        const reps = await examsServices.getAllResult(idUser);
        setData(reps.data);
        console.log(reps.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    let time = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    if (count <= 0) {
      clearTimeout(time);
    }
    return () => {
      clearTimeout(time);
      setShow(false);
    };
  }, []);
  useEffect(() => {
    let cloneData = [...data];
    cloneData.map((x) => {
      let correct = 0;
      let wrong = 0;
      for (let i in x.resultDTOS) {
        if (x.resultDTOS[i].mark == 0) {
          x.wrong = wrong += 1;
        } else {
          x.correct = correct += 1;
        }
      }
    });
    setResult(cloneData);
  }, [count]);
  return (
    <>
      {show ? (
        <div className="h-screen w-full flex items-center justify-center">
          <svg
            role="status"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) :
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Dashboard</h2>
            <span className="text-xs">All exams have been done.</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="lg:ml-40  ml-10 space-x-8">
              <Link
                to={`/choose-quiz
                `}
              >
                <button className="bg-red-600 sm:h-10 md:h-14 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  Go to Home page
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name Exam
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Correct answer
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Wrong answer
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Point
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result?.map((item, index) => (
                    <>
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.exam_name}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p
                            className={
                              item.correct
                                ? "text-gray-900 whitespace-no-wrap"
                                : red + " font-bold whitespace-no-wrap"
                            }
                          >
                            {item.correct || 0}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p
                            className={
                              item.wrong
                                ? "text-gray-900 whitespace-no-wrap"
                                : red + " font-bold  whitespace-no-wrap"
                            }
                          >
                            {item.wrong || 0}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.resultDTOS?.reduce(
                              (acc, int) => (acc += int.mark),
                              0
                            )}
                          </p>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
export default DashBoard;
