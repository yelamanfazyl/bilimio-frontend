import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "@/http";

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    topic: "Math",
  });

  const [answer1, setAnswer1] = useState({
    answer: "",
    correct: false,
  });

  const [answer2, setAnswer2] = useState({
    answer: "",
    correct: false,
  });

  const [answer3, setAnswer3] = useState({
    answer: "",
    correct: false,
  });

  const [answer4, setAnswer4] = useState({
    answer: "",
    correct: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      toast.error("Вы не авторизованы!");
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description, difficulty, topic } = formData;
    
    try {
      await axios.post(API_URL + "/problems", {
        title: title,
        description: description,
        answer: [
          answer1,
          answer2,
          answer3,
          answer4
        ],
        difficulty: difficulty,
        topic: topic,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setFormData({
      title: "",
      description: "",
      difficulty: "easy",
      topic: "Math",
    });

    setAnswer1({
      answer: "",
      correct: false,
    });

    setAnswer2({
      answer: "",
      correct: false,
    });

    setAnswer3({
      answer: "",
      correct: false,
    });

    setAnswer4({
      answer: "",
      correct: false,
    });

    toast.success("Задача успешно добавлена!");
  };

  const handleGenerate = async (event) => {
    event.preventDefault();

    const { topic } = formData;

    if (topic == "") {
      toast.error("Введите тему!");
      return;
    }

    let response = null;

    try {
      response = await axios.post(API_URL + "/problemsgpt", {
        topic: topic,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }

    if (response == null) {
      toast.error("Произошла ошибка!");
      return;
    }

    console.log(response.data)

    setFormData({
      title: formData.title,
      description: response.data.description,
      difficulty: formData.difficulty,
      topic: formData.topic,
    });

    setAnswer1({
      answer: response.data.answer[0].answer,
      correct: response.data.answer[0].correct == "True" ? true : false,
    });

    setAnswer2({
      answer: response.data.answer[1].answer,
      correct: response.data.answer[1].correct == "True" ? true : false,
    });

    setAnswer3({
      answer: response.data.answer[2].answer,
      correct: response.data.answer[2].correct == "True" ? true : false,
    });

    setAnswer4({
      answer: response.data.answer[3].answer,
      correct: response.data.answer[3].correct == "True" ? true : false,
    });

    toast.success("Задача успешно сгенерирована!");
  };

  return (
    <>
    <div className="flex justify-center items-center">
      <div className="flex-col w-[50%] justify-center items-center my-5">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-white my-5">
          Добавить задачу
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Answers:
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  onChange={(e) => {
                    setAnswer1({ ...answer1, answer: e.target.value });
                  }}
                  value={answer1.answer}
                />
                Correct:
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setAnswer1({ ...answer1, correct: e.target.checked });
                  }}
                  checked={answer1.correct}
                />
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  onChange={(e) => {
                    setAnswer2({ ...answer2, answer: e.target.value });
                  }}
                  value={answer2.answer}
                />
                Correct:
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setAnswer2({ ...answer2, correct: e.target.checked });
                  }}
                  checked={answer2.correct}
                />
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  onChange={(e) => {
                    setAnswer3({ ...answer3, answer: e.target.value });
                  }}
                  value={answer3.answer}
                />
                Correct:
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setAnswer3({ ...answer3, correct: e.target.checked });
                  }}
                  checked={answer3.correct}
                />
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  onChange={(e) => {
                    setAnswer4({ ...answer4, answer: e.target.value });
                  }}
                  value={answer4.answer}
                />
                Correct:
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setAnswer4({ ...answer4, correct: e.target.checked });
                  }}
                  checked={answer4.correct}
                />
              </div>
          </label>
          <label className="block mb-2 text-sm font-medium text-white">
            Difficulty:
            <select
              className="text-gray-900"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Topic:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
            />
          </label>
          <div className="flex justify-between">
            <button onClick={handleSubmit} className="justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Submit</button>
            <button onClick={handleGenerate} className="justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate</button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default Admin;
