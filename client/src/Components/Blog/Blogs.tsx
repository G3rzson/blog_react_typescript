import { useState } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";
import { BlogType } from "../../Pages/Home";
import BlogModal from "../BlogModal";

type BlogProps = {
  blogs: BlogType[];
};

export default function Blogs({ blogs }: BlogProps) {
  const { isModalOpen, setIsModalOpen } = useGlobalContext();
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);

  return (
    <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
      {blogs?.map((blog, index) => (
        <div
          key={index}
          onClick={() => {
            setSelectedBlog(blog);
            setIsModalOpen(true);
          }}
          className="p-4 flex flex-col justify-between gap-2 rounded-xl bg-zinc-800 text-zinc-300 w-80 cursor-pointer"
        >
          <h2 className="text-lg text-center font-semibold">{blog.title}</h2>
          <p className="truncate">{blog.content}</p>
          <p className="text-sm text-zinc-200 text-end">{blog.author}</p>
        </div>
      ))}

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
  );
}
