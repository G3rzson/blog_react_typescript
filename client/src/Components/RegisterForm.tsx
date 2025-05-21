import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../Schemas/registerSchema";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [registerInfo, setRegisterInfo] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    //console.log(data);
    try {
      const response = await axios.post("http://localhost:8000/register", data);

      if (response.status >= 200 && response.status < 300) {
        setHasError(false);
        setRegisterInfo(response.data.message);
        setRegisterInfo("");
        navigate("/login");
      }
    } catch (error) {
      setHasError(true);
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error || "Ismeretlen hiba történt.";
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
      <p className="text-white text-center">
        A *-al jelölt mezők kitöltése kötelező
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-600 text-white w-96 rounded flex flex-col gap-2 p-2 mx-auto"
      >
        <div className="">
          <label htmlFor="username">Felhasználónév*</label>
          <input
            {...register("username")}
            className="input"
            type="text"
            name="username"
            id="username"
          />
          {errors.username && (
            <p className="errorMsg">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email*</label>
          <input
            {...register("email")}
            className="input"
            type="email"
            name="email"
            id="email"
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>
        <div className="relative">
          <label htmlFor="password">Jelszó*</label>
          <input
            {...register("password")}
            className="input"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
          />
          <span
            className="absolute right-3 top-8 cursor-pointer text-xl text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
          )}
        </div>
        <button disabled={isSubmitting} type="submit" className="submitBtn">
          Regisztráció
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
