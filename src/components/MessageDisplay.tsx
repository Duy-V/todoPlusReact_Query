import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../context/MessageContext";
interface MessageDisplayProps {
  redirectPath: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ redirectPath }) => {
  const { message, modalOpen, setModalOpen } = useContext(MessageContext);
  const navigate = useNavigate();
  const handleClose = () => {
    setModalOpen(false);
    navigate(redirectPath);
  };

  return (
    modalOpen && (
      <div className="alert shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold">New message!</h3>
          <div className="text-xs">{message}</div>
        </div>
        <button className="btn btn-sm" onClick={handleClose}>
          See
        </button>
      </div>
    )
  );
};
export default MessageDisplay;
