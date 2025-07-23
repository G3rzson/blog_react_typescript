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
  const [searchParams, setSearchParams] = useSearchParams();

  const blogFilter = searchParams.get("blogFilter")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1");

  // szűrés
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(blogFilter)
  );

  const itemsPerPage = 6; // Hány elem legyen egy oldalon
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage); // Összes oldal száma

  // Az aktuális oldalon megjelenítendő elemek kiszámítása
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage.toString());
      return params;
    });
  };

  return (
    <>
      {errorMsg && <p className="errorMsg text-center mt-4">{errorMsg}</p>}
      <div className="flex flex-col justify-between gap-4 items-center my-4">
        <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
          {blogs && blogs.length > 0 ? (
            currentBlogs?.map((blog, index) => (
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
            <div className="w-full h-[calc(100vh-400px)] flex items-center justify-center">
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
        {filteredBlogs.length > itemsPerPage && (
          <div className="flex gap-1 items-center justify-center">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={index}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm hover:bg-green-500 cursor-pointer ${
                    page === pageNumber ? "bg-green-500" : "bg-green-700"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
