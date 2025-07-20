import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { href: "/", title: "Főoldal" },
  { href: "/blog/my", title: "Blogjaim" },
  { href: "/user", title: "Felhasználó" },
];

export default function Navlinks() {
  const location = useLocation();
  return (
    <nav>
      <ul className="flex flex-row">
        {navLinks.map((link) => {
          const isActive =
            location.pathname === link.href ||
            (location.pathname.startsWith(link.href) && link.href !== "/");
          return (
            <li key={link.title}>
              <Link
                to={link.href}
                className={`${
                  isActive
                    ? "bg-zinc-300 text-zinc-800"
                    : "bg-zinc-800 text-zinc-300"
                } hover:bg-zinc-300 hover:text-zinc-800 duration-300 block p-2`}
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
