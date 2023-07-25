import { useAppDispatch } from "@/hooks/redux";
import { registration } from "@/store/reducers/useAuth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const [email, setEmail] = useState<string>("");
  const isAuth = useSelector((state: any) => state.authReducer.isAuth);
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const buttonHandlerRegister = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await dispatch(registration({ email, password, firstname, lastname }));
    if (isAuth) {
      navigate("/");
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

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-[#282828] rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-white underline">
          Sign up
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-white">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              className="block w-full px-4 py-2 mt-2 text-white bg-[#1A1A1A]  rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-white bg-[#1A1A1A]  rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-white">
              First Name
            </label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-white bg-[#1A1A1A]  rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-white">
              Last Name
            </label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-white bg-[#1A1A1A]  rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-white hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              onClick={buttonHandlerRegister}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-white">
          {" "}
          Does have an account?{" "}
          <a href="/login" className="font-medium text-white hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
