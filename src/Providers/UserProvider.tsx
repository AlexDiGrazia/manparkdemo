import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { TUserObject } from "../Components/UserLogin";
import { TProfile } from "../Components/Friends";
import { Requests } from "../api/usersApi";
// import { Requests as ProfileRequests } from "../api/profilesApi";

type TUserContext = {
  display: string;
  setDisplay: Dispatch<SetStateAction<"SignUp" | "LoginGate" | "UserLogin">>;
  currentUser: TUserObject;
  setCurrentUser: Dispatch<SetStateAction<TUserObject>>;
  currentProfile: TProfile;
  setCurrentProfile: Dispatch<SetStateAction<TProfile>>;
  onPageLoad_setCurrentUser: () => void;
  onPageLoad_setCurrentProfile: () => void;
  getCurrentUser: () => Promise<TUserObject>;
};

const UserContext = createContext<TUserContext>({} as TUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [display, setDisplay] = useState<"SignUp" | "LoginGate" | "UserLogin">(
    "LoginGate"
  );
  const [currentUser, setCurrentUser] = useState<TUserObject>(
    {} as TUserObject
  );
  const [currentProfile, setCurrentProfile] = useState<TProfile>(
    {} as TProfile
  );

  const getCurrentUser = () =>
    Requests.retrieveUserByName({
      username: localStorage.getItem("user")!,
    });

  //these two Functions will only be run inside an if statement verifying there IS a user in local storage
  const onPageLoad_setCurrentUser = () =>
    getCurrentUser(); /* .then(setCurrentUser); */

  const onPageLoad_setCurrentProfile = () => getCurrentUser();
  // .then((res) => setCurrentProfile(res.profile))

  return (
    <>
      <UserContext.Provider
        value={{
          display,
          setDisplay,
          currentUser,
          setCurrentUser,
          currentProfile,
          setCurrentProfile,
          onPageLoad_setCurrentUser,
          onPageLoad_setCurrentProfile,
          getCurrentUser,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUserContext = () => useContext(UserContext);
