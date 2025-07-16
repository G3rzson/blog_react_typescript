import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginFormData, loginFormSchema } from "../../Validation/loginUserForm";
import { useGlobalContext } from "../../Context/GlobalContext";
import Modal from "../modal";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const navigate = useNavigate();
  const {
    errorMsg,
    setErrorMsg,
    setUser,
    setAccessToken,
    setIsModalOpen,
    isModalOpen,
  } = useGlobalContext();

  async function onSubmit(data: LoginFormData) {
    setIsModalOpen(true);
    //console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        setErrorMsg("");
        navigate("/my-blogs");
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
          Bejelentkezés
        </button>
        <div className="flex justify-between text-sm">
          <p>Még nincs fiókod?</p>
          <Link
            className="hover:text-yellow-300 duration-300 underline"
            to={"../user/register"}
          >
            Regisztráció
          </Link>
        </div>

        <Modal isOpen={isModalOpen} />
      </form>
    </>
  );
}
