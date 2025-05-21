import axios from "axios";
import { BlogType } from "../types/types";

export async function getBlogs(setBlogs: React.Dispatch<React.SetStateAction<BlogType[] | []>>) {
  try {
    const response = await axios.get("http://localhost:8000/", {
      withCredentials: true,
    }); 

    setBlogs(response.data)

  } catch (error) {
    if (axios.isAxiosError(error)) {
      //const message = error.response?.data?.error || "Ismeretlen hiba történt.";
      const message = error.response?.data?.message
      console.error(message);
    }
  }
}
