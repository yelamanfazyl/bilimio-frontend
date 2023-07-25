import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/http";
import { Excalidraw } from "@excalidraw/excalidraw";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProblemItem = () => {
  const { _id } = useParams();
  const [problem, setProblem] = useState({});
  const [answer, setAnswer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      const fetchProblem = async () => {
        const response = await axios.get(`${API_URL}/problems/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProblem(response.data);
        setAnswer(response.data["answer"]);
      };

      fetchProblem();
    }
  }, []);

  const handleCheck = async (e) => {
    if (e.target.getAttribute("correct") == "True") {
      await axios.post(
        `${API_URL}/problems/${_id}/submit`,
        { correct: "true" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Правильно!");
    } else {
      toast.error("Не верно!");
    }
  };

  return (
    <Layout>
      {problem ? (
        <div className="flex flex-row justify-center items-center w-full h-full mt-4 gap-1 mb-4">
          <div className="w-1/2 flex flex-col justify-start items-center h-full border rounded-md gap-4 px-8 py-6">
            <div className="flex flex-col h-1/2">
              <div className="flex flex-col justify-between items-start w-full gap-2 border-b-[0.5px] py-2">
                <div className="flex w-full flex-row justify-between items-center">
                  <p className="text-[20px] text-white font-semibold">
                    {problem["title"]}
                  </p>
                  <p
                    onClick={() => {
                      navigate(`/problems/${_id}/discussion`);
                    }}
                    className="text-[16px] text-white font-semibold underline"
                  >
                    Обсуждение Задачи
                  </p>
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p
                    className={`${
                      problem["difficulty"] == "easy"
                        ? "text-[#22c55e]"
                        : problem["difficulty"] == "medium"
                        ? "text-[#fde047]"
                        : problem["difficulty"] == "hard"
                        ? "text-[#b91c1c]"
                        : null
                    } font-medium text-[12px]`}
                  >
                    {problem["difficulty"] == "easy" ||
                    problem["difficulty"] == "Easy"
                      ? "Легкая"
                      : problem["difficulty"] == "medium" ||
                        problem["difficulty"] == "Medium"
                      ? "Средняя"
                      : problem["difficulty"] == "hard" ||
                        problem["difficulty"] == "Hard"
                      ? "Сложная"
                      : null}
                  </p>
                  <p className="text-[#ffffff] font-medium text-[12px]">
                    {problem["topic"]}
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-white gap-4 py-4">
                <p className="text-[14px] text-justify">
                  {problem["description"]}
                </p>
              </div>
            </div>
            <div className="h-1/2 flex flex-col justify-center items-center w-full  rounded-md py-6 px-6 text-white gap-4">
              <p className="text-xl font-bold">Выберите правильный ответ:</p>
              <div className="flex flex-row gap-4 flex-wrap">
                {answer.map((el, idx) => (
                  <button
                    onClick={(e) => handleCheck(e)}
                    key={idx}
                    correct={el["correct"]}
                    className="bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white px-8 py-2 rounded-md"
                  >
                    {el["answer"]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center h-full gap-1">
            <div className="h-full flex flex-col justify-center items-center w-full border rounded-md">
              <Excalidraw />
            </div>
          </div>
        </div>
      ) : (
        <div>404</div>
      )}
    </Layout>
  );
};

export default ProblemItem;
