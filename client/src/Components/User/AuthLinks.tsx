import { Link } from "react-router-dom";

export default function AuthLinks() {
  return (
    <div className="flex flex-wrap flex-row justify-center mx-auto gap-8 mt-20 sm:mt-40">
      <div className="w-80 h-60 p-4 bg-zinc-800 text-zinc-300 rounded-xl flex flex-col justify-between">
        <p className="text-3xl flex justify-center items-center h-full">
          Van már fiókod?
        </p>
        <Link
          className="bg-amber-500 hover:bg-amber-400 text-zinc-800 w-full text-center rounded p-2"
          to="/user/login"
        >
          Bejelentkezés
        </Link>
      </div>
      <div className="w-80 h-60 p-4 bg-zinc-800 text-zinc-300 rounded-xl flex flex-col justify-between">
        <p className="text-3xl flex justify-center items-center h-full">
          Nincs még fiókod?
        </p>
        <Link
          className="bg-amber-500 hover:bg-amber-400 text-zinc-800 w-full text-center rounded p-2"
          to="/user/register"
        >
          Regisztráció
        </Link>
      </div>
    </div>
  );
}
