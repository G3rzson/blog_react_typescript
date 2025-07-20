import { useEffect, useState } from "react";
import { BlogType } from "../../Pages/Home";
import axios from "axios";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import Modal from "../Modal";
import { useGlobalContext } from "../../Context/GlobalContext";

export default function OwnBlogs() {
  const [myBlogs, setMyBlogs] = useState<BlogType[] | []>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setIsModalOpen, isModalOpen } = useGlobalContext();

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
    } finally {
      setIsModalOpen(false);
    }
  }
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      {/* Error a backendtől */}
      {errorMsg && <p className="errorMsg text-center my-2">{errorMsg}</p>}
      <h1 className="title">Saját blogjaim:</h1>
      <div className="flex flex-row gap-4 my-4 flex-wrap items-center justify-center">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs?.map((blog, index) => (
            <>
              <div
                key={index}
                className="p-4 flex flex-col justify-between gap-2 rounded-xl bg-zinc-800 text-zinc-300 w-80"
              >
                <h2 className="text-lg text-center font-semibold">
                  {blog.title}
                </h2>
                <p className="break-words overflow-hidden ">{blog.content}</p>
                <p className="text-sm text-zinc-200 text-end">{blog.author}</p>
                <div className="flex flex-row items-center gap-4 justify-between">
                  <EditBtn blogID={blog._id} />
                  <DeleteBtn
                    blogID={blog._id}
                    onDelete={fetchBlogs}
                    setErrorMsg={setErrorMsg}
                  />
                </div>
              </div>
              <Modal isOpen={isModalOpen} />
            </>
          ))
        ) : (
          <p className="text-2xl">Még nincsenek blogjaid 😊</p>
        )}
      </div>
    </>
  );
}
