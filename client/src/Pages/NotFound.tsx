import { Link } from "react-router-dom";
import Title from "../Components/Title";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-36px-40px)] flex flex-col items-center justify-center gap-2">
      <Title>404 | Page not found</Title>
      <Link
        className="text-2xl border-2 border-red-400 rounded cursor-pointer py-2 px-4"
        to={"/"}
      >
        Vissza a <span className="font-bold hover:underline">Főoldalra</span>
      </Link>
    </div>
  );
}
