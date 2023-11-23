import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type TUserContext = {
  display: string;
  setDisplay: Dispatch<SetStateAction<string>>;
  currentUser: string;
  setCurrentUser: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext<TUserContext>({} as TUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [display, setDisplay] = useState<string>("LoginGate");
  const [currentUser, setCurrentUser] = useState<string>("");

  return (
    <>
      <UserContext.Provider
        value={{
          display,
          setDisplay,
          currentUser,
          setCurrentUser,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUserContext = () => useContext(UserContext);
