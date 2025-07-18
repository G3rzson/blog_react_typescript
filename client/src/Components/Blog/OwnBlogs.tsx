import { useEffect, useState } from "react";
import { BlogType } from "../../Pages/Home";
import { useGlobalContext } from "../../Context/GlobalContext";
import axios from "axios";

export default function OwnBlogs() {
  const [myBlogs, setMyBlogs] = useState<BlogType[] | []>([]);
  const { errorMsg, setErrorMsg } = useGlobalContext();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.post(
          "http://localhost:8000/my-blogs",
          {},
          { withCredentials: true }
        );
        //console.log(response);
        setMyBlogs(response.data.myBlogs);
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
      {/* Error a backendtől */}
      {errorMsg && <p className="errorMsg text-center my-2">{errorMsg}</p>}
      <h1 className="title">Saját blogjaim:</h1>
      <div className="flex flex-row gap-4 my-4 flex-wrap items-center justify-center">
        {myBlogs?.map((blog, index) => (
          <div
            key={index}
            className="p-4 flex flex-col justify-between gap-2 rounded-xl bg-zinc-800 text-zinc-300 w-80 cursor-pointer"
          >
            <h2 className="text-lg text-center font-semibold">{blog.title}</h2>
            <p>{blog.content}</p>
            <p className="text-sm text-zinc-200 text-end">{blog.author}</p>
            <div className="flex flex-row items-center gap-4 justify-between">
              <button className="bg-amber-500 hover:bg-amber-400 cursor-pointer rounded p-2 text-zinc-800 w-full">
                Szerkesztés
              </button>
              <button className="bg-red-400 hover:bg-red-300 cursor-pointer rounded p-2 text-zinc-800 w-full">
                Törlés
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
