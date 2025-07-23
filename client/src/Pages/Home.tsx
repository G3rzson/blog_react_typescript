import Blogs from "../Components/Blog/Blogs";
import Searchbar from "../Components/Blog/Searchbar";
import Title from "../Components/Title";

export default function Home() {
  return (
    <>
      <Title>Blogok</Title>

      <Searchbar />

      <Blogs />
    </>
  );
}
