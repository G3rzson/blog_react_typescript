import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../Schemas/blogSchema";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type BlogFormData = z.infer<typeof blogSchema>;

export default function BlogForm() {
  const [hasError, setHasError] = useState(false);
  const [registerInfo, setRegisterInfo] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  async function onSubmit(data: BlogFormData) {
    //console.log(data);

    try {
      const response = await axios.post("http://localhost:8000/newblog", data, {
        withCredentials: true,
      });

      if (response.status >= 200 && response.status < 300) {
        setHasError(false);
        setRegisterInfo(response.data.message);
        setRegisterInfo("");
        navigate("/");
      }
    } catch (error) {
      setHasError(true);
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Ismeretlen hiba történt.";
        setRegisterInfo(message);
      } else {
        setRegisterInfo("Valami hiba történt a kérés során.");
      }
    } finally {
      reset();
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-600 text-white w-96 rounded flex flex-col gap-2 p-2 mx-auto"
      >
        <div className="">
          <label htmlFor="blog">Blog</label>
          <textarea
            {...register("blog")}
            className="input"
            name="blog"
            id="blog"
            placeholder="Írj valamit!"
            rows={8}
          />
          {errors.blog && <p className="errorMsg">{errors.blog.message}</p>}
        </div>
        <button disabled={isSubmitting} type="submit" className="submitBtn">
          Blog létrehozása
        </button>
      </form>
      <p
        className={`text-center text-3xl my-4 ${
          hasError ? "text-amber-500" : "text-green-500"
        }`}
      >
        {registerInfo}
      </p>
    </>
  );
}
