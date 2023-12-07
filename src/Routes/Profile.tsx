import { useEffect, useState } from "react";
import { Requests } from "../api/profilesApi";
import { useParams } from "react-router-dom";
import { TProfile } from "../Components/Friends";

export const Profile = () => {
  const [profile, setProfile] = useState<TProfile>({} as TProfile);

  const { userId } = useParams();

  useEffect(() => {
    Requests.getSingleProfile(Number(userId)).then(setProfile);
  }, []);

  const photo = import.meta.env.BASE_URL + profile.picture;

  return (
    <div style={{ color: "white" }}>
      <img src={photo} style={{ width: "500px", height: "500px" }} />
      <p>{profile.user}</p>
      <p>{profile.id}</p>
    </div>
  );
};
