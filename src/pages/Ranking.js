import React, { useEffect, useState } from "react";
import { examsServices } from "../services/examsServices";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function Ranking() {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(true);
  const [searchParam] = useSearchParams();
  const [time, setTime] = useState(3);
  const [idUser, setIdUser] = useState(() => {
    return localStorage.getItem("idUser");
  });
  useEffect(() => {
    (async () => {
      try {
        console.log(1);
        const reps = await examsServices.getRanking();
        setData(reps.data);
        console.log(reps.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    let cloneData = [...data];
    cloneData.map((items) =>
      items.examDTO.reduce((acc, item) => {
        return (items.total = acc + item.totalScore);
      }, 0)
    );
    let a = setTimeout(() => {
      setTime(time - 1);
      setShow(false);
    }, 1000);
    if (time === 0) {
      clearTimeout(a);
    }
    setDatas(cloneData);
    return () => {
      clearTimeout(a);
    };
  }, [time]);
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
      ) : (
        <>
          <div className="w-full  h-screen">
            <div className="h-sreen m-10 bg-white shadow-lg rounded-sm  ">
              <div className="flex p-4 justify-between mb-10">
                <header className="px-5 py-4 ">
                  <h2 className="font-semibold sm:text-sm md:text-xl xl:text-3xl lg:text-3xl  text-gray-800">Ranking User</h2>
                </header>
                <Link to="/choose-quiz">
                  <button
                    type="button"
                    className="border  border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                  >
                    Go to home page
                  </button>
                </Link>
              </div>
              <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">No.</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Total exams done</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Total point</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {datas
                        ?.sort((a, b) => b.total - a.total)
                        ?.map((item, index) => (
                            <tr>
                              <td key={index} className="p-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-medium text-center text-gray-800">
                                    {index + 1 }
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-800">
                                    {item?.username}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">{item?.email}</div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-center font-medium text-green-500">
                                  {item?.examDTO?.length}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-lg text-center">
                                  {item?.examDTO?.reduce((acc, cur) => {
                                    return acc + cur.totalScore;
                                  }, 0)}
                                </div>
                              </td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Ranking;
