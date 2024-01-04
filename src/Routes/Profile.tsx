import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Requests } from "../api/profilesApi";
import { useNavigate, useParams } from "react-router-dom";
import { TProfile } from "../Components/Friends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Schedule } from "../Components/Schedule";

type TProfileProps = {
  setFriendsListDisplay: Dispatch<SetStateAction<"friends-list" | "profile">>;
};

export type TSchedules = {
  user: string;
  day: number;
  event: string;
};

export const Profile = ({ setFriendsListDisplay }: TProfileProps) => {
  const [profile, setProfile] = useState<TProfile>({} as TProfile);
  const { userId } = useParams();
  const navigate = useNavigate();
  const photo = import.meta.env.BASE_URL + profile.picture;

  useEffect(() => {
    Requests.getSingleProfile(Number(userId)).then(setProfile);
  }, []);

  useEffect(() => {
    Requests.getSingleProfile(Number(userId)).then((data) => {
      setProfile(data);
      console.log(data);
    });
  }, [userId]);

  return (
    <div style={{ color: "white" }}>
      <img
        src={photo}
        style={{ width: "200px", height: "200px", borderRadius: "20px" }}
      />
      <span
        className="profile_back_btn"
        onClick={() => {
          setFriendsListDisplay("friends-list");
          navigate("/home");
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </span>
      <p>{profile.user}</p>
      <p>{profile.bio ? profile.bio : "User has not yet submitted a bio"}</p>
      <Schedule profile={profile} />
    </div>
  );
};
