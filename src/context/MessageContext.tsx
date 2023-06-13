import { createContext } from "react";

// Define the shape of the context
interface MessageContextType {
  message: string;
  setMessage: (message: string) => void;
}
export const MessageContext = createContext<MessageContextType | any>(null);
