import { useEffect, useState } from "react";
import { Requests } from "../api/profilesApi";
import { Link } from "react-router-dom";

export type TProfile = {
  user: string;
  picture: string;
  id: number;
};

export const Friends = () => {
  const [allProfiles, setAllProfiles] = useState<TProfile[]>([]);

  useEffect(() => {
    Requests.getAllProfiles().then(setAllProfiles);
  }, []);

  return (
    <>
      <div className="friends_list_container">
        {allProfiles.map((profile) => (
          <Link
            to={`/user/${profile.id}`}
            key={`profile_${profile.id}`}
            className="react_router_link"
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
    </>
  );
};
