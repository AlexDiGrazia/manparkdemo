import { useEffect, useState } from "react";
import { Requests } from "../api/profilesApi";
import { Link } from "react-router-dom";
import { Profile } from "../Routes/Profile";
import { useHomeContext } from "../Providers/HomeProvider";
import { useUserContext } from "../Providers/UserProvider";
import toast from "react-hot-toast";
import { EditProfilePrompt } from "./EditProfilePrompt";

export type TProfile = {
  user: string;
  picture: string;
  bio: string;
  home: string;
  occupation: string;
  birthday: Date | undefined;
  id: number;
};

export const Friends = () => {
  const [allProfiles, setAllProfiles] = useState<TProfile[]>([]);
  const { currentUser } = useUserContext();
  const { friendsListDisplay, setFriendsListDisplay } = useHomeContext();

  useEffect(() => {
    Requests.getAllProfiles().then(setAllProfiles);
  }, []);

  return (
    <>
      {friendsListDisplay === "friends-list" && (
        <div className="friends_list_container">
          {allProfiles.map((profile) => (
            <Link
              to={`user/${profile.id}`}
              key={`profile_${profile.id}`}
              className="react_router_link"
              onClick={() => {
                setFriendsListDisplay("profile");
                profile.user === currentUser.username &&
                  localStorage.getItem("personal_profile") ===
                    "first_ever_visit" &&
                  toast.custom((t) => <EditProfilePrompt t={t} />, {
                    duration: Infinity,
                    id: "editProfileToast",
                  });
                localStorage.removeItem("personal_profile");
              }}
            >
              <div className="profile_thumbnail">
                <div
                  className="friends_list_thumbnail_image"
                  style={{ backgroundImage: `url(${profile.picture})` }}
                ></div>
                <p>{profile.user}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {friendsListDisplay === "profile" && (
        <Profile setFriendsListDisplay={setFriendsListDisplay} />
      )}
    </>
  );
};
