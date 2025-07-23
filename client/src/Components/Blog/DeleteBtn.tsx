import axios from "axios";
import { useGlobalContext } from "../../Context/GlobalContext";
import DeleteBlogModal from "../../Modals/DeleteBlogModal";

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
  const { isModalOpen, setIsModalOpen } = useGlobalContext();

  async function handleDelete() {
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
    } finally {
      setIsModalOpen(false);
    }
  }

  return (
    <>
      <button
        className="bg-red-400 hover:bg-red-300 cursor-pointer rounded p-2 text-zinc-800 w-full"
        onClick={() => setIsModalOpen(true)}
      >
        Törlés
      </button>
      <DeleteBlogModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        handleDelete={handleDelete}
      />
    </>
  );
}
