import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext";
import PlusIcon from "./PlusIcon";
import Logout from "./Logout";

export default function Header() {
  const { currentUser } = useGlobalContext();

  return (
    <header className="flex items-center justify-between p-4 bg-zinc-600 text-white">
      <div>
        <Link className="link" to="/">
          Fő oldal
        </Link>
      </div>

      <nav className="flex items-center justify-center gap-4">
        <Link className="link" to="/register">
          Regisztráció
        </Link>
        {currentUser ? (
          <Logout />
        ) : (
          <Link className="link" to="/login">
            Bejelentkezés
          </Link>
        )}

        <Link className="link flex items-center gap-1" to="/newblog">
          {PlusIcon()} Új blog
        </Link>
        <p>{currentUser}</p>
      </nav>
    </header>
  );
}
