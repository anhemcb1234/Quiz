import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { examsServices } from "../services/examsServices";
export default function ChooseQuiz() {
  const [exams, setExams] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [searchParam] = useSearchParams();
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState(() => {
    return searchParam.get("userName");
  });
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("You must be logged in to access this page");
      navigate("/");
    }
    setShowToast(true);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const reps = await examsServices.getExams();
        setExams(reps.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const handlerLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("idUser");
    navigate("/");
  };
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
  return (
    <>
      <div className="min-h-screen  flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
          <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-violet-800 dark:bg-gray-800 border-none">
            <img
              className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
              src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
            />
            <span className="hidden md:block">
              {localStorage.getItem("userName")}
            </span>
          </div>
          <div className="flex w-screen justify-between items-center h-14 bg-violet-800 dark:bg-gray-800 header-right">
            <div className="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
              <button className="outline-none focus:outline-none">
                <svg
                  className="w-5 text-gray-600 h-5 cursor-pointer"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search"
                className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
              />
            </div>
            <ul className="flex items-center">
              <li>
                <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handlerLogout()}
                  className="flex items-center mr-4 hover:text-violet-100"
                >
                  <span className="inline-flex mr-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-violet-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
          <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5 hidden md:block">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                    Main
                  </div>
                </div>
              </li>
              <li>
                <Link to={`/dashboard`}>
                  <a
                    href="#"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-violet-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-violet-500 dark:hover:border-gray-800 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Dashboard
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link to={`/ranking`}>
                  <a
                    href="#"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-violet-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-violet-500 dark:hover:border-gray-800 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        ></path>
                      </svg>
                    </span>

                    <span className="ml-2 text-sm tracking-wide truncate">
                      Ranking
                    </span>
                    <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-violet-500 bg-indigo-50 rounded-full">
                      New
                    </span>
                  </a>
                </Link>
              </li>
            </ul>

            <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
              Copyright @2021
            </p>
          </div>
        </div>

        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 p-4 gap-4">
            <div className="bg-violet-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-violet-600 dark:border-gray-600 text-white font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current text-violet-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">{data.length}</p>
                <p>Total user</p>
              </div>
            </div>
            <div className="bg-violet-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-violet-600 dark:border-gray-600 text-white font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current text-violet-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">{exams.length - 1}</p>
                <p>Total exam</p>
              </div>
            </div>
          </div>
          <div className="mt-4 mx-4">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">No.</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Exam</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Total number of questions
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Do Quiz</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {exams?.map((item, index) => (
                      <>
                        {index === 0 ? (
                          ""
                        ) : (
                          <tr>
                            <td key={index} className="p-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="font-medium text-center text-gray-800">
                                  {index}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="font-medium text-gray-800">
                                  {item?.exam_name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">
                                {item?.questionDtos.length}
                              </div>
                            </td>
                            <td className="p-2 flex items-center justify-center whitespace-nowrap">
                              <Link to={`/quiz?id=${item?.id}`}>
                                <button className="hover:bg-indigo-700 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 bg-green-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2">
                                  Start
                                </button>
                              </Link>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-8 mx-4">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                  Get in touch
                </h1>
                <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                  Fill in the form to submit any query
                </p>

                <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    Ha Noi
                  </div>
                </div>

                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    +880 1234567890
                  </div>
                </div>

                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    info@demo.com
                  </div>
                </div>
              </div>
              <form className="p-6 flex flex-col justify-center">
                <div className="flex flex-col">
                  <label htmlFor="name" className="hidden">
                    Full Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-violet-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="email" className="hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-violet-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="tel" className="hidden">
                    Number
                  </label>
                  <input
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder="Telephone Number"
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-violet-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="md:w-32 bg-violet-600 dark:bg-gray-100 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 hover:bg-violet-500 dark:hover:bg-gray-200 transition ease-in-out duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <></>
    </>
  );
}
