import { useNavigate } from "react-router-dom";
import CreateBlogForm from "../Components/Blog/CreateBlogForm";
import { useGlobalContext } from "../Context/GlobalContext";
import { useEffect } from "react";
import Loading from "../Components/Loading";

export default function CreateBlog() {
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
      <h1 className="title">Blog létrehozása</h1>
      <CreateBlogForm />
    </div>
  );
}
