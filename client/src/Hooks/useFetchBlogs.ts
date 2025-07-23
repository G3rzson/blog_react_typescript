// src/hooks/useFetchBlogs.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../Context/GlobalContext";

export function useFetchBlogs() {
  const { blogs, setBlogs } = useGlobalContext();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/blog", {
          withCredentials: true,
        });
        setBlogs(response.data.blogs);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setErrorMsg(
            err.response?.data?.error || "Ismeretlen szerverhiba történt."
          );
        } else {
          setErrorMsg("Nem várt hiba történt.");
        }
      }
    }

    fetchData();
  }, []);

  return { blogs, errorMsg };
}
