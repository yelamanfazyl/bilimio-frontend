import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/http";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProblemDiscussionItem = () => {
  const { _id, post_id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (_id && post_id) {
      const fetchProblem = async () => {
        const response = await axios.get(
          `${API_URL}/problems/${_id}/discussions/${post_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPost(response.data);
      };

      fetchProblem();
    }

    console.log(post);
  }, []);

  return (
    <Layout>
      <div className="h-full w-11/12 lg:w-2/4 px-6 py-4 border border-gray-400 rounded-md text-white flex flex-col justify-start mx-auto">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="text-[32px] text-white font-bold">{post["title"]}</p>
          <p className="text-[16px] text-white font-medium">
            {post["created_at"]?.slice(0, 10)}
          </p>
        </div>
        <div className="w-full text-white">
          <p className="text-[14px] text-white font-medium text-justify">
            {post["content"]}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ProblemDiscussionItem;
