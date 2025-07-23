import { useEffect, useState } from "react";
import axios from "axios";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import { BlogType, useGlobalContext } from "../../Context/GlobalContext";
import Title from "../Title";
import Loading from "../Loading";

export default function OwnBlogs() {
  const [myBlogs, setMyBlogs] = useState<BlogType[] | []>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { user } = useGlobalContext();

  async function fetchBlogs() {
    try {
      const response = await axios.post(
        "http://localhost:8000/blog/my",
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
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      {/* Error a backendtől */}
      {errorMsg && <p className="errorMsg text-center my-2">{errorMsg}</p>}
      <Title>Saját blogjaim:</Title>
      <div className="flex flex-row gap-4 my-4 flex-wrap items-center justify-center">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs?.map((blog) => (
            <div
              key={blog._id}
              className="p-4 flex flex-col justify-between gap-2 rounded-xl bg-zinc-800 text-zinc-300 w-80"
            >
              <h2 className="text-lg text-center font-semibold">
                {blog.title}
              </h2>
              <p className="break-words overflow-hidden ">{blog.content}</p>
              <p className="text-sm text-zinc-200 text-end">{blog.author}</p>
              <div className="flex flex-row items-center gap-4 justify-between">
                <EditBtn blogID={blog._id} />
                {user && user.role === "admin" && (
                  <DeleteBtn
                    blogID={blog._id}
                    onDelete={fetchBlogs}
                    setErrorMsg={setErrorMsg}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
