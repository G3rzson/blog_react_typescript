import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../Context/GlobalContext";
import Modal from "../Modal";
import { BlogFormData, blogFormSchema } from "../../Validation/blogForm";
import { useEffect } from "react";

export default function CreateBlogForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
  });
  const navigate = useNavigate();
  const { errorMsg, setErrorMsg, setIsModalOpen, isModalOpen } =
    useGlobalContext();

  const [title, content] = watch(["title", "content"]);
  useEffect(() => {
    if (title || content) {
      setErrorMsg("");
    }
  }, [title, content]);

  async function onSubmit(data: BlogFormData) {
    setIsModalOpen(true);
    //console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/blog/create",
        data,
        {
          withCredentials: true,
        }
      );
      //console.log(response);
      if (response.data.success) {
        navigate("/");
      }
    } catch (err) {
      // axios hibakezelés
      if (axios.isAxiosError(err)) {
        if (err?.response?.data?.error) {
          //console.log(err.response.data.error);
          setErrorMsg(err.response?.data.error);
        } else {
          //console.log(err);
          setErrorMsg("Ismeretlen szerverhiba történt.");
        }
      } else {
        // Nem axios típusú hiba (pl. programozási hiba)
        console.error("Nem várt hiba:", err);
      }
    } finally {
      setIsModalOpen(false);
    }
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className="formField">
          <label htmlFor="title">Cím:</label>
          <input
            {...register("title")}
            className="formInput"
            type="text"
            name="title"
            id="title"
          />
          {errors.title && (
            <span className="errorMsg">{errors.title.message}</span>
          )}
        </div>

        {/* Password */}
        <div className="formField">
          <label htmlFor="content">Tartalom:</label>
          <textarea
            {...register("content")}
            className="formInput"
            name="content"
            id="content"
            rows={8}
          />
          {errors.content && (
            <span className="errorMsg">{errors.content.message}</span>
          )}
        </div>

        {/* Error a backendtől */}
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-500 duration-300 text-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 p-2 cursor-pointer w-full rounded mt-3"
        >
          Létrehozás
        </button>
        <Modal isOpen={isModalOpen} />
      </form>
    </>
  );
}
