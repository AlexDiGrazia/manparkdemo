import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { TUserObject } from "../Components/UserLogin";

type TUserContext = {
  display: string;
  setDisplay: Dispatch<SetStateAction<string>>;
  currentUser: TUserObject;
  setCurrentUser: Dispatch<SetStateAction<TUserObject>>;
};

const UserContext = createContext<TUserContext>({} as TUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [display, setDisplay] = useState<string>("LoginGate");
  const [currentUser, setCurrentUser] = useState<TUserObject>(
    {} as TUserObject
  );

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
