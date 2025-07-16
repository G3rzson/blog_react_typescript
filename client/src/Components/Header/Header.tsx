import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center h-10 p-0 bg-zinc-800 text-zinc-300">
        <Link className="bg-zinc-800 text-zinc-300 px-2" to="/">
          Főoldal
        </Link>
        <Navlinks />
      </header>
    </>
  );
}
