import React, { useEffect, useState } from "react";
import { examsServices } from "../services/examsServices";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function Ranking() {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [searchParam] = useSearchParams();
  const [idUser, setIdUser] = useState(() => {
    return localStorage.getItem("idUser");
  });
  useEffect(() => {
    (async () => {
      try {
        const reps = await examsServices.getRanking();
        setData(reps.data);
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
    setDatas(cloneData);
  }, [datas]);
  return (
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Ranking</h2>
            <span className="text-xs">Top user</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="lg:ml-40 ml-10 space-x-8">
              <Link
                to={`/choose-quiz?userName=${localStorage.getItem(
                  "userName"
                )}&id=${localStorage.getItem("idUser")}`}
              >
                <button className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
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
                      No.
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name user
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email user
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      <p className="text-center">Total number of exams</p>
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      <p className="text-center">Total point</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas
                    ?.sort((a, b) => b.total - a.total)
                    ?.map((item, index) => (
                      <>
                        <tr key={index}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {index + 1}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {item?.username}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {item?.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap text-center">
                              {item?.examDTO?.length}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 text-center whitespace-no-wrap">
                              {item?.examDTO?.reduce((acc, cur) => {
                                return acc + cur.totalScore;
                              }, 0)}
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
export default Ranking;
