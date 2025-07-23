import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
};

const DeleteBlogModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  handleDelete,
}) => {
  // Scroll tiltás
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC billentyű figyelés
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Háttér blur */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/30"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 bg-zinc-800 text-zinc-300 rounded-xl p-6 w-96 shadow-lg transform transition-all duration-300 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-2xl text-center mb-4">Biztosan törli a blogot?</h2>
        <div className="flex flex-row gap-6">
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 cursor-pointer w-full text-zinc-800 bg-red-400 hover:bg-red-300 rounded"
          >
            Törlés
          </button>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 cursor-pointer w-full bg-amber-500 text-zinc-800 rounded hover:bg-amber-400"
          >
            Mégse
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
