import { lazy } from "react";

const NotFound = lazy(() => import("../Pages/NotFound"));
const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const MyBlogs = lazy(() => import("../Pages/MyBlogs"));
const User = lazy(() => import("../Pages/User"));
const CreateBlog = lazy(() => import("../Pages/CreateBlog"));
const EditBlog = lazy(() => import("../Pages/EditBlog"));

const routes = [
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Home /> },
  { path: "/user", element: <User /> },
  { path: "/user/register", element: <Register /> },
  { path: "/user/login", element: <Login /> },
  { path: "/blog/my", element: <MyBlogs /> },
  { path: "/blog/create", element: <CreateBlog /> },
  { path: "/blog/edit/:id", element: <EditBlog /> },
];

export default routes;
