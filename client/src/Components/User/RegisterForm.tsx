import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  type RegisterFormData,
  registerFormSchema,
} from "../../Validation/registerUserForm";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";
import Modal from "../../Modals/Modal";

export default function RegisterForm() {
  const { setIsModalOpen, isModalOpen } = useGlobalContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "author",
    } as RegisterFormData,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const [username, email] = watch(["username", "email"]);
  useEffect(() => {
    if (username || email) {
      setErrorMsg("");
    }
  }, [username, email]);

  async function onSubmit(data: RegisterFormData) {
    setIsModalOpen(true);
    //console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:8000/user/register",
        data
      );

      if (response.data.success) {
        navigate("/user/login");
      }
    } catch (err) {
      // axios hibakezelés
      if (axios.isAxiosError(err)) {
        if (err?.response?.data?.error) {
          //console.log(err.response.data.error);
          setErrorMsg(err.response?.data.error);
        } else {
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
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
      <div className="formField">
        <label htmlFor="username">Username:</label>
        <input
          {...register("username")}
          className="formInput"
          type="text"
          name="username"
          id="username"
        />
        {errors.username && (
          <span className="errorMsg">{errors.username.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="formField">
        <label htmlFor="email">Email:</label>
        <input
          {...register("email")}
          className="formInput"
          type="email"
          name="email"
          id="email"
        />
        {errors.email && (
          <span className="errorMsg">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="formField">
        <label htmlFor="password">Password:</label>
        <input
          {...register("password")}
          className="formInput"
          type="password"
          name="password"
          id="password"
        />
        {errors.password && (
          <span className="errorMsg">{errors.password.message}</span>
        )}
      </div>

      {/* Error a backendtől */}
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-500 duration-300 text-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 p-2 cursor-pointer w-full rounded mt-3"
      >
        Regisztráció
      </button>
      <div className="flex justify-between text-sm">
        <p>Van már fiókod?</p>
        <Link
          className="hover:text-yellow-300 duration-300 underline"
          to={"../user/login"}
        >
          Bejelentkezés
        </Link>
      </div>
      <Modal isOpen={isModalOpen} />
    </form>
  );
}
