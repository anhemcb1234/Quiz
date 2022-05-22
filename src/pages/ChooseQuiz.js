import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { examsServices } from "../services/examsServices";
export default function ChooseQuiz() {
  const [exams, setExams] = useState([]);
  const [show, setShow] = useState(true);
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
    let time = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => {
      clearTimeout(time);
      setShow(false);
    };
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
  }
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
      )}
    </>
  );
}
