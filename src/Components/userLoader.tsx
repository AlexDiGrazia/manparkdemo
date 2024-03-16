import { useEffect, useState } from "react";
import { Home } from "../Routes/Home";
import { useUserContext } from "../Providers/UserProvider";

export const UserLoader = () => {
  const [userIsLoaded, setUserIsLoaded] = useState<boolean>(false);

  const { getCurrentUser, setCurrentUser, setCurrentProfile } =
    useUserContext();

  useEffect(() => {
    getCurrentUser().then((res) => {
      setUserIsLoaded(true);
      setCurrentUser(res);
      setCurrentProfile(res.profile);
    });
  });
  return <>{userIsLoaded && <Home />}</>;
};
