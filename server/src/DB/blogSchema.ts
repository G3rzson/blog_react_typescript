import mongoose, { Schema, Document } from "mongoose";

interface Blog extends Document {
  userId: mongoose.Types.ObjectId;
  blog: string;
}

const blogSchema = new Schema<Blog>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Kapcsolódik a User modellhez
    required: true,
  },
  blog: {
    type: String,
    required: true,
  },
});

const BlogModel = mongoose.model<Blog>("Blog", blogSchema);

export default BlogModel;
