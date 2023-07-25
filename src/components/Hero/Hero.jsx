import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import hero_img from "../../assets/images/hero_img.png";

const Hero = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  return (
    <div className="flex flex-row items-center h-1/2 gap-12 mt-20">
      <div className="flex flex-col items-start w-full lg:w-1/2 h-3/4 gap-4">
        <p className="text-[42px] font-bold text-white">
          Готовься к ЕНТ вместе с{" "}
          <span className="text-gradient">Bilim.io</span>
        </p>
        <p className="text-justify text-[18px] font-light text-white">
          Наша платформа выводит персонализацию на новый уровень, адаптируясь к
          стилю обучения каждого студента, чтобы обеспечить действительно
          индивидуальную подготовку к ЕНТ
        </p>
        <div className="flex flex-row gap-6">
          <button
            onClick={() => {
              if (localStorage.getItem("token")) navigate("/problems");
              else navigate("/login");
            }}
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white px-8 py-2 rounded-md"
          >
            Начать
          </button>
          <button className="flex flex-row justify-center items-center gap-1 font-medium text-white">
            Про Bilim.io <BsArrowRight size={18} />
          </button>
        </div>
      </div>
      <div className="invisible lg:visible flex flex-col w-1/2 h-full rounded-md">
        <img
          src={hero_img}
          alt="exam"
          className="object-fill w-[100%] h-[100%] rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Hero;
