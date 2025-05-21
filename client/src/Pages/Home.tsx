import { useEffect } from "react";
import BlogCards from "../Components/BlogCards";
import { getBlogs } from "../Functions/getBlogs";
import { useGlobalContext } from "../Context/GlobalContext";

export default function Home() {
  const { blogs, setBlogs } =  useGlobalContext();

  useEffect(()=> {
    getBlogs(setBlogs)
  }, [])

  return (
    <div className="text-white">
      <h1 className="pageTitle">Blog & Blogs</h1>
      <div>
        <BlogCards blogs={blogs} />
      </div>
    </div>
  );
}
