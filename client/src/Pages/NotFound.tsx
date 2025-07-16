import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mt-40 flex flex-col items-center gap-8">
      <h1 className="text-4xl">404 | Page not found</h1>
      <Link
        className="text-2xl border-2 border-red-400 rounded cursor-pointer py-2 px-4"
        to={"/"}
      >
        Vissza a <span className="font-bold hover:underline">Főoldalra</span>
      </Link>
    </div>
  );
}
