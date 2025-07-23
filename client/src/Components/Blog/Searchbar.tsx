import { useSearchParams } from "react-router-dom";

export default function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams({ blogFilter: "" });
  const blogFilter = searchParams.get("blogFilter") || "";

  return (
    <div className="bg-zinc-800 text-zinc-300 mx-4 p-4 rounded-xl flex flex-col items-center gap-2">
      <input
        type="text"
        id="searchbar"
        name="searchbar"
        value={blogFilter}
        onChange={(e) =>
          setSearchParams({ blogFilter: e.target.value }, { replace: true })
        }
        className="bg-zinc-300 w-full text-zinc-800 rounded p-2 outline-none border-none"
        placeholder="Keresés a blog címe alapján"
      />
    </div>
  );
}
