import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/reducers/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthState, setIsAuthState] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  //const isAuth = useSelector((state: any) => state.authReducer.isAuth);
  const navigate = useNavigate();

  const clear = async () => {
    localStorage.clear();
    await dispatch(logout());
    navigate("/");
    setIsAuthState(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthState(true);
    }
  }, []);

  return (
    <div className="flex flex-row justify-between items-center w-full m-auto shadow-sm bg-[#282828] h-[10%]">
      <div className="flex flex-row justify-between items-center w-[80%] m-auto h-[8vh] py-4">
        <div className="flex justify-start items-center w-[65%]">
          <Link to="/">
            <p className="text-[28px] font-bold text-gradient">Bilim.io</p>
          </Link>
        </div>
        <div className="invisible lg:visible flex flex-row w-[55%] justify-between items-center">
          <div className={`flex flex-row justify-between w-[65%]`}>
            <Link to="/problems">
              <p className="text-[16px] text-white">Задачи</p>
            </Link>
            <Link to="/discussion">
              <p className="text-[16px] text-white">Обсуждения</p>
            </Link>
            <Link to="/profile">
              <p className="text-[16px] text-white">Профиль</p>
            </Link>
          </div>
          {isAuthState ? (
            <button
              onClick={clear}
              className={`text-[16px] text-white flex flex-row justify-center items-center w-${
                !isAuthState ? "[10%]" : "[40%]"
              }`}
            >
              Выход
            </button>
          ) : (
            <div className={`flex flex-row justify-between w-[30%]`}>
              <Link to="/login">
                <p className="text-[16px] text-white">Войти</p>
              </Link>
              <div className="text-white">|</div>
              <Link to="/registration">
                <p className="text-[16px] text-white">Регистрация</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
