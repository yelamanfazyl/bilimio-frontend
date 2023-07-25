import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/http";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Problems = () => {
  const [problems, setProblems] = useState<Array<object>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      navigate("/");
      toast.error("Вы не авторизованы!");
    }

    const fetchProblems = async () => {
      const response = await axios.get(`${API_URL}/problems`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProblems(response.data.problems);
    };

    fetchProblems();
  }, []);

  console.log(problems);

  return (
    <Layout>
      <div className="relative overflow-x-auto w-full rounded-md">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-[#282828] text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Название
              </th>
              <th scope="col" className="px-6 py-3">
                Топик
              </th>
              <th scope="col" className="px-6 py-3">
                Сложность
              </th>
            </tr>
          </thead>
          <tbody>
            {problems?.map((el, idx) => {
              return (
                <tr
                  onClick={() => {
                    navigate(`/problems/${el["_id"]}`);
                  }}
                  key={idx}
                  className="bg-[#282828] border-b "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {el["title"]}
                  </th>
                  <td className="px-6 py-4">{el["topic"]}</td>
                  <td className={`px-6 py-4`}>
                    {el["difficulty"].toLowerCase() == "easy"
                      ? "Легкая"
                      : el["difficulty"].toLowerCase() == "medium"
                      ? "Средняя"
                      : el["difficulty"].toLowerCase() == "hard"
                      ? "Сложная"
                      : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Problems;
