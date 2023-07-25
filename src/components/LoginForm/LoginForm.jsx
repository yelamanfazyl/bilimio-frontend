import { useAppDispatch } from "@/hooks/redux";
import { login } from "@/store/reducers/useAuth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const buttonHandler = async (event) => {
    event.preventDefault();
    await dispatch(login({ email, password }));
    if (isAuth) {
      navigate("/problems");
    } else {
      if (localStorage.getItem("token") != undefined)
        toast.success("Успешный вход");
      else toast.error("Не верная авторизация");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/problems");
    }
  });

  console.log(isAuth);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-[90%] p-6 m-auto bg-[#282828] rounded-lg shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-pur-700 text-white">
          Вход
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-white">
              Логин/Почта
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              className="block w-full px-4 py-2 mt-2 text-white bg-[#1A1A1A] rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-white">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-white bg-[#1A1A1A] rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs hover:underline text-white">
            Забыли пароль?
          </a>
          <div className="mt-6">
            <button
              onClick={buttonHandler}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Вход
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-white">
          {" "}
          Нет аккаунта?{" "}
          <a
            href="/registration"
            className="font-medium text-black-600 hover:underline"
          >
            Регистрация
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
