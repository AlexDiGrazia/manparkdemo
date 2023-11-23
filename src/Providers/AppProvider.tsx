/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type TAppContext = {
  nameInput: string;
  setNameInput: Dispatch<SetStateAction<string>>;
  passwordInput: string;
  setPasswordInput: Dispatch<SetStateAction<string>>;
};

const AppContext = createContext<TAppContext>({} as TAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  return (
    <>
      <AppContext.Provider
        value={{
          nameInput,
          setNameInput,
          passwordInput,
          setPasswordInput,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export const useAppContext = () => useContext(AppContext);
