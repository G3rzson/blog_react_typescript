import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import NewBlog from "../Pages/NewBlog";

export default function HandleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/newblog" element={<NewBlog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
