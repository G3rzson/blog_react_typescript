import { useNavigate } from "react-router-dom";

type EditBtnProps = {
  blogID: string;
};

export default function EditBtn({ blogID }: EditBtnProps) {
  const navigate = useNavigate();
  function handleEdit() {
    //console.log(blogID);

    navigate(`/blog/edit/${blogID}`);
  }

  return (
    <button
      className="bg-amber-500 hover:bg-amber-400 cursor-pointer rounded p-2 text-zinc-800 w-full"
      onClick={handleEdit}
    >
      Szerkesztés
    </button>
  );
}
