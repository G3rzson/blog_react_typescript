import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext";
import { useEffect } from "react";
import Loading from "../Components/Loading";
import EditBlogForm from "../Components/Blog/EditBlogForm";

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
      <h1 className="title">Blog szerkesztése</h1>
      <EditBlogForm />
    </div>
  );
}
