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
      </div>
    </>
  );
}
export default DashBoard;
