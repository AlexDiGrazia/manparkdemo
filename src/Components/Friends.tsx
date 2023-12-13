import { useEffect, useState } from "react";
import { Requests } from "../api/profilesApi";
import { Link } from "react-router-dom";
import { Profile } from "../Routes/Profile";

export type TProfile = {
  user: string;
  picture: string;
  bio: string;
  id: number;
};

export const Friends = () => {
  const [allProfiles, setAllProfiles] = useState<TProfile[]>([]);
  const [display, setDisplay] = useState<"friends-list" | "profile">(
    "friends-list"
  );

  useEffect(() => {
    Requests.getAllProfiles().then(setAllProfiles);
  }, []);

  return (
    <>
      {display === "friends-list" && (
        <div className="friends_list_container">
          {allProfiles.map((profile) => (
            <Link
              to={`user/${profile.id}`}
              key={`profile_${profile.id}`}
              className="react_router_link"
              onClick={() => setDisplay("profile")}
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
      {display === "profile" && <Profile setDisplay={setDisplay} />}
    </>
  );
};
