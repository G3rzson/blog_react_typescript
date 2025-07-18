import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext";
import { useEffect } from "react";
import Loading from "../Components/Loading";
import OwnBlogs from "../Components/Blog/OwnBlogs";

export default function MyBlogs() {
  const { user, isLoading } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/user/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-36px-40px)] flex items-center justify-center backdrop-blur-sm bg-black/30">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Link
        to={"/blog/create"}
        className="bg-green-600 hover:bg-green-500 duration-300 text-xl text-center block mt-5 mx-4 text-zinc-800 p-2 cursor-pointer rounded"
      >
        Új blog létrehozása
      </Link>

      <OwnBlogs />
    </div>
  );
}
