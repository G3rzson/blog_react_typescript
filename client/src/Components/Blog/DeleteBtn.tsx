import axios from "axios";
import { useGlobalContext } from "../../Context/GlobalContext";

type DeleteBtnProps = {
  blogID: string;
  onDelete: () => void;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function DeleteBtn({
  blogID,
  onDelete,
  setErrorMsg,
}: DeleteBtnProps) {
  const { setIsModalOpen } = useGlobalContext();
  async function handleDelete() {
    //console.log(blogID);
    setIsModalOpen(true);
    try {
      const response = await axios.delete(
        `http://localhost:8000/blog/delete/${blogID}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        //console.log(response);
        onDelete();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err?.response?.data?.error) {
          setErrorMsg(err.response.data.error);
        } else {
          setErrorMsg("Ismeretlen szerverhiba történt.");
        }
      } else {
        console.error("Nem várt hiba:", err);
        setErrorMsg("Nem várt hiba történt.");
      }
    }
  }

  return (
    <button
      className="bg-red-400 hover:bg-red-300 cursor-pointer rounded p-2 text-zinc-800 w-full"
      onClick={handleDelete}
    >
      Törlés
    </button>
  );
}
