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
  getCurrentUser: () => Promise<TUserObject>;
  reloadCurrentUserAndProfile: () => void;
  jwtToken: string;
  setJwtToken: Dispatch<SetStateAction<string>>;
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
  const [jwtToken, setJwtToken] = useState<string>("");

  const getCurrentUser = async () => {
    const user = localStorage.getItem("user");
    if (user) {
      return await Requests.retrieveUserByName({
        username: user,
      });
    } else {
      console.error(
        'Oops! Make sure "user" is being set in local storage upon login/signup'
      );
    }
  };

  const reloadCurrentUserAndProfile = async () => {
    const user = await getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setCurrentProfile(user.profile);
    } else {
      console.log(
        "function reloadCurrentUserAndProfile() failed.  No user found."
      );
    }
  };

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
          getCurrentUser,
          reloadCurrentUserAndProfile,
          jwtToken,
          setJwtToken,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUserContext = () => useContext(UserContext);
