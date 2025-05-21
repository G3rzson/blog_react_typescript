import axios from "axios";

export async function getCurrentUser(
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    const response = await axios.get("http://localhost:8000/profile", {
      withCredentials: true,
    });

    if (response.status === 200 && response.data.user) {
      setCurrentUser(response.data.user.username);
    } else {
      setCurrentUser(""); // nincs bejelentkezve
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //const message = error.response?.data?.error || "Ismeretlen hiba történt.";
      const message = error.response?.data?.message
      console.error(message);
    }
  }
}
