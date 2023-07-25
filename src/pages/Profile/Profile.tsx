import CalendarGrid from "@/components/Calendar/CalendarGrid";
import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/http";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();
  const isAuth = useSelector((state: any) => state.authReducer.isAuth);
  const [easy, setEasy] = useState<string>();
  const [medium, setMedium] = useState<string>();
  const [hard, setHard] = useState<string>();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      toast.error("Вы не авторизованы!");
    }

    const fetchUser = async () => {
      const response = await axios.get(`${API_URL}/auth/user/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(response.data);
      setEasy("" + (userData["easy"] / userData["easy_total"]) * 100);
    };

    fetchUser();
  }, []);

  console.log(easy);

  return (
    <>
      {userData ? (
        <Layout>
          <div className="flex flex-row w-full h-full gap-2 mt-4">
            <div className="flex flex-col w-2/6 h-full bg-[#282828] px-2 py-2 rounded-md">
              <div className="w-full bg-[#282828] h-1/4 flex-row justify-center items-center">
                <div className="w-full bg-[#282828] border border-[#484848] rounded-md flex-row justify-center items-center px-6 py-6">
                  <p className="text-[20px] font-medium text-white">
                    {userData["firstname"] + " " + userData["lastname"]}
                  </p>
                  <p className="text-[12px] font-light mb-4 text-white">
                    {userData["city"] ? userData["city"] : "No city set"}
                  </p>
                  <div className="flex flex-col">
                    <p className="text-[12px] font-medium text-white">
                      {userData["school"]
                        ? userData["school"]
                        : "No School set"}
                    </p>
                    <p className="text-[12px] font-medium text-white">
                      {userData["date_of_birth"]
                        ? userData["date_of_birth"]
                        : "No date of birth set"}
                    </p>
                    <p className="text-[12px] font-medium text-white">
                      {userData["country"]
                        ? userData["country"]
                        : "No Country set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-4/6 gap-2">
              <div className="flex flex-row w-full h-1/4 gap-2">
                <div className="flex flex-col w-full bg-[#282828] rounded-md h-full justify-center items-start px-6 py-4">
                  <h3 className="text-white">Количество решенных задач:</h3>
                  <div className="flex justify-center flex-col w-full gap-2 py-2">
                    <div className="flex flex-row w-full justify-between">
                      <div className="w-full">
                        <p className="text-[12px] text-white">Easy</p>
                        <div className="relative h-2 w-full overflow-hidden rounded-full max-w-none flex justify-between">
                          <div
                            className={`absolute h-full bg-green-500`}
                            style={{
                              width:
                                (userData["easy"] / userData["easy_total"]) *
                                  100 +
                                "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[12px] text-white">Medium</p>
                      <div className="relative h-2 w-full overflow-hidden rounded-full max-w-none flex justify-between">
                        <div
                          className={`absolute h-full bg-yellow-300`}
                          style={{
                            width:
                              (userData["medium"] / userData["medium_total"]) *
                                100 +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[12px] text-white">Hard</p>
                      <div className="relative h-2 w-full overflow-hidden rounded-full max-w-none flex justify-between">
                        <div
                          className={`absolute h-full bg-red-700`}
                          style={{
                            width:
                              (userData["hard"] / userData["hard_total"]) *
                                100 +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full bg-[#282828] rounded-md h-1/6 justify-center items-center px-8 py-12">
                <CalendarGrid submissions={userData["submissions"]} />
              </div>
              <div className="flex flex-col w-full bg-[#282828] rounded-md h-full px-2 py-2 gap-1">
                {userData["problems"].map((el, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(`/problems/${el["_id"]}`);
                    }}
                    className="flex flex-row w-full h-[50px] border border-[#484848] rounded-md px-4 py-2 justify-start items-center text-white"
                  >
                    {el["title"]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      ) : null}
    </>
  );
};

export default Profile;
