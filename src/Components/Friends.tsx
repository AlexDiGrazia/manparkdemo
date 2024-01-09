import { useEffect, useState } from "react";
import { Requests } from "../api/profilesApi";
import { Link } from "react-router-dom";
import { Profile } from "../Routes/Profile";
import { useHomeContext } from "../Providers/HomeProvider";

export type TProfile = {
  user: string;
  picture: string;
  bio: string;
  home: string;
  occupation: string;
  birthday: string;
  id: number;
};

export const Friends = () => {
  const [allProfiles, setAllProfiles] = useState<TProfile[]>([]);

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
              onClick={() => setFriendsListDisplay("profile")}
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
