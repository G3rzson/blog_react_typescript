import axios from "axios";
import { useGlobalContext } from "../Context/GlobalContext";

export default function Logout() {
  const { setCurrentUser } = useGlobalContext();
  async function handleLogout() {
    try {
      const response = await axios.post("http://localhost:8000/logout", null, {
        withCredentials: true,
      });

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.message);
        setCurrentUser("");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error || "Ismeretlen hiba történt.";
        console.log(message);
      }
    }
  }
  return (
    <button className="link" onClick={handleLogout}>
      Kijelentkezés
    </button>
  );
}
