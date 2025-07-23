import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../Context/GlobalContext";

import { BlogFormData, blogFormSchema } from "../../Validation/blogForm";
import { useEffect, useState } from "react";
import Modal from "../../Modals/Modal";

export default function EditBlogForm() {
  const { setIsModalOpen, isModalOpen } = useGlobalContext();
  const { id } = useParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [editBlog, setEditBlog] = useState<BlogFormData | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      setIsModalOpen(true);
      try {
        const res = await axios.get(`http://localhost:8000/blog/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          //console.log(res.data.blog);
          setEditBlog(res.data.blog);
        }
      } catch (err) {
        console.error("Hiba blog lekérésekor:", err);
      } finally {
        setIsModalOpen(false);
      }
    }

    fetchBlog();
  }, [id]);
  // ez tölti be az adatokat a form mezőkbe
  useEffect(() => {
    if (editBlog) {
      reset(editBlog);
    }
  }, [editBlog, reset]);

  // input error
  const [title, content] = watch(["title", "content"]);
  useEffect(() => {
    if (title || content) {
      setErrorMsg("");
    }
  }, [title, content]);

  if (!editBlog) return <Modal isOpen={isModalOpen} />;

  async function onSubmit(data: BlogFormData) {
    setIsModalOpen(true);
    //console.log(data);
    try {
      const response = await axios.put(
        `http://localhost:8000/blog/update/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      //console.log(response);
      if (response.data.success) {
        navigate("/blog/my");
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
          Mentés
        </button>
        <Modal isOpen={isModalOpen} />
      </form>
    </>
  );
}
