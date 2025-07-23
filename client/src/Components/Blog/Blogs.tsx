import { useState } from "react";
import { BlogType, useGlobalContext } from "../../Context/GlobalContext";
import { useSearchParams } from "react-router-dom";
import { useFetchBlogs } from "../../Hooks/useFetchBlogs";
import BlogModal from "../../Modals/BlogModal";
import Loading from "../Loading";

export default function Blogs() {
  const { blogs, errorMsg } = useFetchBlogs();
  const { isModalOpen, setIsModalOpen } = useGlobalContext();
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);
  const [searchParams] = useSearchParams();
  const blogFilter = searchParams.get("blogFilter")?.toLowerCase() || "";

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(blogFilter)
  );

  return (
    <>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <div className="flex flex-row gap-4 my-4 flex-wrap items-center justify-center">
        {blogs && blogs.length > 0 ? (
          filteredBlogs?.map((blog, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedBlog(blog);
                setIsModalOpen(true);
              }}
              className="p-4 flex flex-col justify-between gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 duration-200 text-zinc-300 w-80 cursor-pointer"
            >
              <h2 className="text-lg text-center font-semibold">
                {blog.title}
              </h2>
              <p className="truncate">{blog.content}</p>
              <p className="text-sm text-zinc-200 text-end">{blog.author}</p>
            </div>
          ))
        ) : (
          <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
            <Loading />
          </div>
        )}

        {selectedBlog && (
          <BlogModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedBlog(null);
            }}
            blog={selectedBlog}
          />
        )}
      </div>
    </>
  );
}
