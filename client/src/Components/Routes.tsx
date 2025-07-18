import { lazy } from "react";

const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const MyBlogs = lazy(() => import("../Pages/MyBlogs"));
const User = lazy(() => import("../Pages/User"));
const CreateBlog = lazy(() => import("../Pages/CreateBlog"));
const NotFound = lazy(() => import("../Pages/NotFound"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/user", element: <User /> },
  { path: "/user/register", element: <Register /> },
  { path: "/user/login", element: <Login /> },
  { path: "/my-blogs", element: <MyBlogs /> },
  { path: "/blog/create", element: <CreateBlog /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
