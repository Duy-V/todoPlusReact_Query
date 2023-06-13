import { createContext, useContext, useState, ReactNode } from "react";
import { MessageContext } from "./MessageContext";

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false); // state variable to control the modal

  return (
    <MessageContext.Provider
      value={{ message, setMessage, modalOpen, setModalOpen }}
    >
      {children}
    </MessageContext.Provider>
  );
};
