import Loading from "./Loading";

type ModalProps = {
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Háttér blur réteg */}
      <div className={`absolute inset-0 backdrop-blur-sm bg-black/30`} />

      {/* Modal tartalom */}
      <div
        className={`relative z-10 bg-transparent w-96 transform flex items-center justify-center`}
      >
        <Loading />
      </div>
    </div>
  );
};

export default Modal;
