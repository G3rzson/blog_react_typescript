import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/GlobalContext";
import Modal from "../Modal";

export default function UserInfo() {
  const {
    errorMsg,
    setErrorMsg,
    user,
    setAccessToken,
    setUser,
    setIsModalOpen,
    isModalOpen,
  } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsModalOpen(true);
    try {
      await axios.post(
        "http://localhost:8000/user/logout",
        {},
        { withCredentials: true }
      );
      setAccessToken("");
      setUser(null);
      navigate("/user/login");
    } catch (err) {
      //console.log("Hiba a kijelentkezésnél:", err);
      setErrorMsg("Hiba a kijelentkezésnél!");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-80 h-50 bg-zinc-800 text-zinc-300 rounded-xl mx-auto mt-20 flex items-center p-4 justify-between gap-8 flex-col">
      <p className="text-3xl">{user?.username}</p>
      <p className="errorMsg">{errorMsg}</p>
      <button
        onClick={handleLogout}
        className="bg-green-600 hover:bg-green-500 duration-300 text-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 p-2 cursor-pointer w-full rounded"
      >
        Kijelentkezés
      </button>
      <Modal isOpen={isModalOpen} />
    </div>
  );
}
