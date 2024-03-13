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
import { Requests as ProfileRequests } from "../api/profilesApi";

type TUserContext = {
  display: string;
  setDisplay: Dispatch<SetStateAction<"SignUp" | "LoginGate" | "UserLogin">>;
  currentUser: TUserObject;
  setCurrentUser: Dispatch<SetStateAction<TUserObject>>;
  resetCurrentUser: () => void;
  currentProfile: TProfile;
  setCurrentProfile: Dispatch<SetStateAction<TProfile>>;
  resetCurrentProfile: () => void;
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

  //these two Functions will only be run inside an if statement verifying there IS a user in local storage
  const resetCurrentUser = () =>
    Requests.loginUser({ username: localStorage.getItem("user")! }).then(
      setCurrentUser
    );

  const resetCurrentProfile = () =>
    ProfileRequests.getAllProfiles()
      .then((res) =>
        res.find(
          (profile: TProfile) => profile.user === localStorage.getItem("user")
        )
      )
      .then((res) => {
        setCurrentProfile(res);
      });

  return (
    <>
      <UserContext.Provider
        value={{
          display,
          setDisplay,
          currentUser,
          setCurrentUser,
          resetCurrentUser,
          currentProfile,
          setCurrentProfile,
          resetCurrentProfile,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUserContext = () => useContext(UserContext);
