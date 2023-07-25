import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/http";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Discussion = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      const response = await axios.get(`${API_URL}/problems/discussions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPost(response.data["discussions"]);
    };

    fetchProblem();
  }, []);

  return (
    <Layout>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-gray-700 uppercase bg-[#282828] ">
            <tr>
              <th scope="col" className="px-6 py-3 text-white">
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {post.map((el, idx) => (
              <tr
                key={idx}
                onClick={() => {
                  navigate(`/problems/${el["problem_id"]}/discussion`);
                }}
                className="bg-[#282828] border-b "
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {el["title"]}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Discussion;
