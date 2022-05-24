import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { examsServices } from "../services/examsServices";

export default function ChooseQuiz() {
  const [exams, setExams] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [searchParam] = useSearchParams();
  const [id, setId] = useState(() => {
    return searchParam.get("id");
  });
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

  return (
    <>
        <>
          <section className="fixed mx-auto">
            <nav className="flex justify-between bg-violet-900 text-white w-screen">
              <div className="px-5 sm:p-5  xl:px-12 py-6 flex w-full items-center justify-between">
                <a className="text-3xl font-bold font-heading" href="#">
                  <h1>Hackathon</h1>
                </a>
                <div className="xl:flex  items-center space-x-5">
                  <ul className="flex sm:ml-2 items-center justify-center ">
                    <li>
                      <Link to={`/ranking`}>
                        <i className="fa-solid fa-ranking-star sm:inline md:inline md:text-xl lg:text-2xl "></i>
                      </Link>
                    </li>
                    <li className="ml-4">
                      <Link to={`/dashboard?UserName=${userName}`}>
                        <i className="fa-solid fa-list sm:inline md:inline md:text-xl lg:text-2xl"></i>
                      </Link>
                    </li>
                    <li className="ml-4">
                      <i onClick={() => handlerLogout()} className="fa-solid fa-arrow-right-from-bracket md:text-xl sm:inline md:inline lg:text-2xl"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </section>
          <div
            id="app"
            className="flex w-full  h-screen justify-center items-center"
          >
            <div className="w-full max-w-xl p-3">
              <h1 className="font-bold sm:mt-20  text-5xl text-center text-indigo-700">
                Hackathon Quiz
              </h1>
              <div>
                <p className="mt-2">User: {searchParam.get("userName")}</p>
              </div>
              <div className="mt-6 flex flex-col justify-center items-center">
                {exams?.map((exam, index) => (
                  <div key={index} className="w-full my-2">
                    <Link to={`/quiz?id=${exam?.id}`}>
                      <button className="float-right w-full hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2">
                        {exam?.exam_name}
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
    </>
  );
}
