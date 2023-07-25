import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/http";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProblemDiscussion = () => {
  const { _id } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (_id) {
      const fetchProblem = async () => {
        const response = await axios.get(
          `${API_URL}/problems/${_id}/discussions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPosts(response.data["posts"]);
      };

      fetchProblem();
    }
  }, []);

  const handleCreate = async () => {
    await axios.post(
      `${API_URL}/problems/${_id}/discussions`,
      { title: title, content: content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const response = await axios.get(`${API_URL}/problems/${_id}/discussions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setPosts(response.data["posts"]);
  };

  console.log(posts);

  return (
    <Layout>
      <div className="flex flex-col w-full border rounded-md py-4 px-4 mb-4">
        <h2 className="text-white text-2xl font-semibold mb-2">Создать пост</h2>
        <label className="block text-sm font-semibold text-white">
          Заголовок
        </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="email"
          value={title}
          className="block w-full px-4 py-2 mt-2 text-white bg-[#1A1A1A] border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40 mb-2"
        />
        <label className="block text-sm font-semibold text-white">
          Контент
        </label>
        <input
          onChange={(e) => setContent(e.target.value)}
          type="email"
          value={content}
          className="block w-full px-4 py-2 mt-2 text-white bg-[#1A1A1A] border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40 mb-6"
        />
        <button
          onClick={handleCreate}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Создать
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-gray-700 uppercase bg-[#282828] ">
            <tr>
              <th scope="col" className="px-6 py-3 text-white">
                Author
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Content
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((el, idx) => (
              <tr
                key={idx}
                className="bg-[#282828] border-b "
                onClick={() => {
                  navigate(`/problems/${_id}/discussion/${el["id"]}`);
                }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {el["firstname"] + " " + el["lastname"]}
                </th>
                <td className="px-6 py-4">{el["title"]}</td>
                <td className="px-6 py-4">{el["content"].substring(0, 25)}</td>
                <td className="px-6 py-4">{el["created_at"].slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProblemDiscussion;
