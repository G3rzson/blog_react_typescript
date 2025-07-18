import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import Blogs from "../Components/Blog/Blogs";

export type BlogType = {
  title: string;
  content: string;
  author: string;
};

export default function Home() {
  const [blogs, setBlogs] = useState<BlogType[] | []>([]);
  const { errorMsg, setErrorMsg } = useGlobalContext();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get("http://localhost:8000/blogs");
        //console.log(response);
        setBlogs(response.data.blogs); // feltételezve, hogy a válaszban a bloglista van
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err?.response?.data?.error) {
            setErrorMsg(err.response.data.error);
          } else {
            setErrorMsg("Ismeretlen szerverhiba történt.");
          }
        } else {
          console.error("Nem várt hiba:", err);
          setErrorMsg("Nem várt hiba történt.");
        }
      }
    }

    fetchBlogs();
  }, []);

  return (
    <>
      <h1 className="title">Blogok</h1>

      {errorMsg && <p className="errorMsg">{errorMsg}</p>}

      <Blogs blogs={blogs} />
    </>
  );
}
