import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { examsServices } from "../services/examsServices";

const Quiz = () => {
  let navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [id, setId] = useState(() => {
    return searchParam?.get("id");
  });
  const [idUser, setIdUser] = useState(() => {
    return localStorage.getItem("idUser");
  });
  const [show, setShow] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [filterSelected, setFilterSelected] = useState(() => {
    return [];
  });
  const [questionId, setQuestionId] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [second, setSecond] = useState(10);
  const [listAnswer, setListAnswer] = useState([]);
  const [listsAnswer, setListAnswers] = useState([]);
  const [addQuestion, setAddQuestion] = useState([]);
  const [check, setCheck] = useState(false);
  const [data, setData] = useState([]);
  const [idQuestion, setIdquestion] = useState(() => {
    return questions[questionId]?.id;
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName");
  });
  const [dataFilter, setDataFilter] = useState([]);
  const red = "text-rose-600";
  const mt = "flex a justify-between"
  if (!localStorage.getItem("token")) {
    alert("You must be logged in to access this page");
    navigate("/");
  }
  const handlerStart = () => {
    setShow(!show);
    setMinutes(1);
    setSecond(59);
  };
  useEffect(() => {
    if (second === 0) {
      setSecond(59);
      setMinutes(minutes - 1);
    }
    let time = setInterval(() => {
      setSecond(second - 1);
    }, 1000);
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
   });
    return () => clearInterval(time);
  }, [second]);
  useEffect(() => {
    (async () => {
      try {
        let repsQuestion = await examsServices.getQuestions(id);
        setQuestions(repsQuestion.data);
        setId(searchParam?.get("id"));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [show]);

  const handlerPrevious = () => {
    setCheck();
    if (questionId <= 0) {
      setQuestionId(questions.length - 1);
      return;
    }
    setQuestionId(questionId - 1);
  };
  useEffect(() => {
    setListAnswers([...listsAnswer, listAnswer]);
    const arr1 = getUniqueListBy(listsAnswer, "question_id");
    setAddQuestion(arr1);
  }, [addQuestion]);
  const handlerNext = () => {
    if (questionId === questions.length - 1) {
      setQuestionId(0);
      return;
    }
    setFilterSelected([]);
    setQuestionId(questionId + 1);
    selectedFilterHandle();
  };
  useEffect(() => {
    setData([
      ...data,
      {
        question_id: questions[questionId]?.id,
        question_type: 2,
        idSingleQuestion: null,
        listIdAnswer: filterSelected,
      },
    ]);
  }, [filterSelected]);
  useEffect(() => {
    let newArray = [...data].filter((x) => x.listIdAnswer?.length);
    let newArray2 = getUniqueListBy(newArray, "question_id");
    setDataFilter(newArray2);
  }, [dataFilter]);
  useEffect(() => {
    if(second === 0 && minutes === 0) {
      handlerSubmit()
      return
    }
  },[second])
  const selectedFilterHandle = (id, index, item, e) => {
    setIdquestion(item?.question_id);
    item.checked = !item.checked;
    if (filterSelected?.includes(index)) {
      const tmp = filterSelected?.filter((item) => item !== index);
      setFilterSelected(tmp);
      return;
    }
    setFilterSelected([...filterSelected, index]);
  };

  useEffect(() => {
    let test = [...questions];
    test.map((x) => x.answerDTOS?.map((y) => (y.checked = false)));
    setQuestions(test);
  }, []);
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  const radioFilterHandler = (id) => {
    let testA = [...questions];
    let testing = [...questions];
    testA[questionId]?.answerDTOS?.map((x) => (x.anwer = false));
    testA[questionId]?.answerDTOS?.map((x) => (x.question_type = 1));
    testA[questionId]?.answerDTOS?.map((x) => (x.idSingleQuestion = id));
    let a = testA[questionId]?.answerDTOS?.find((x) => x.id === id);
    a.id = id;
    a.anwer = !a.anwer;
    let filerList = testing[questionId]?.answerDTOS?.find(
      (x) => x.anwer === true
    );
    setListAnswer(filerList);
  };
  const handlerSubmit = async () => {
    await examsServices.addQuestions({
      userId: idUser,
      examId: id,
      lstQuestion: [...addQuestion.filter((x) => x.id), ...dataFilter],
    });
    navigate(`/result?id=${id}&idUser=${idUser}`);
  };
  return (
    <>
      {show ? (
        <div className="flex w-full h-screen justify-center items-center">
          <div className="absolute top-5  right-5">
            <Link to={`/choose-quiz?userName=${userName}`}>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Go to home page
              </button>
            </Link>
          </div>
          <div className="w-full max-w-xl p-3">
            <h1 className="font-bold text-5xl text-center text-indigo-700">
              Hackathon Quiz
            </h1>
            <div className="mt-6 flex justify-center items-center">
              <button
                onClick={() => handlerStart()}
                className="float-right hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="app"
          className="flex  w-full h-screen justify-center items-center"
        >
          <div className="w-full max-w-xl p-3">
            <div className="flex justify-between">
              <p>
                Câu hỏi: {questionId + 1}/{questions.length}
              </p>
              <span
                className={
                  minutes === 0
                    ? red + " countdown font-mono text-2xl"
                    : "countdown font-mono text-2xl"
                }
              >
                {minutes === 0 ? (
                  ""
                ) : (
                  <>
                    <span style={{ "--value": minutes }}></span>m
                  </>
                )}
                <span style={{ "--value": second }}></span>s
              </span>
            </div>
            <div
              className="flex justify-start flex-col"
              style={{ height: "17vh" }}
            >
              <>
                <p className="font-bold w-full text-2xl text-indigo-700">
                  {questions[questionId]?.question_content}
                </p>
                {questions[questionId]?.image_url ? <img className="w-full rounded mb-2 h-20 object-cover" src={"http://18.136.124.246:9998/images/"+questions[questionId]?.image_url}/> : null}
                {questions[questionId]?.answerDTOS?.map((item, index) => (
                  <div className="mx-2 flex items-center" key={index}>                    
                    <input
                      className="form-check-input mr-2  appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                      type={
                        questions[questionId]?.question_type == 1
                          ? "radio"
                          : "checkbox"
                      }
                      name="flexRadioDefault"
                      id={item?.id}
                      value={item?.id}
                      checked={
                        questions[questionId].question_type == 1
                          ? item?.anwer
                          : item?.checked.checked
                      }
                      onChange={
                        questions[questionId]?.question_type == 1
                          ? () => radioFilterHandler(item?.id)
                          : (e) =>
                              selectedFilterHandle(
                                item?.answer_content,
                                item?.id,
                                item,
                                e
                              )
                      }
                    />
                    <label
                      className="form-check-label text-xl inline-block text-gray-800"
                      for={item?.id}
                    >
                      {index + 1}. {item?.answer_content}
                    </label>
                  </div>
                ))}
              </>
            </div>
            <div className={questions[questionId]?.image_url ? mt + ' mt-32' :  mt + ' mt-12'}>
              <button
                onClick={() => handlerPrevious()}
                className="float-right hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Previous
              </button>
              <button
                onClick={() => handlerNext()}
                className="float-right hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Next
              </button>
            </div>
            <div className="w-full mt-4">
              <button
                onClick={() => handlerSubmit()}
                className="float-right w-full hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Quiz;
