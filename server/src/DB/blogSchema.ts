import { Schema, model, models } from "mongoose";

type BlogData = {
  title: string;
  content: string;
  author: string;
};

// Schema
const blogSchema = new Schema<BlogData>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
});
// Model
const BlogModel = models.Blog || model<BlogData>("Blog", blogSchema);

export default BlogModel;
