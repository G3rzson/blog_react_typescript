import { BlogCardsProps } from "../types/types";

export default function BlogCards({ blogs }: BlogCardsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-2">
      {blogs?.map((blog) => (
        <div
          className="w-60 bg-zinc-600 p-2 rounded text-white"
          key={blog._id}
        >
          <p className="text-base">{blog.blog}</p>
          <p className="text-sm text-gray-300 text-end">
            {blog.userId.username}
          </p>
        </div>
      ))}
    </div>
  );
}
