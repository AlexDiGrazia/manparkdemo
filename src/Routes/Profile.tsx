import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Requests } from "../api/profilesApi";
import { useNavigate, useParams } from "react-router-dom";
import { TProfile } from "../Components/Friends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Schedule } from "../Components/Schedule";
import { useUserContext } from "../Providers/UserProvider";
import ReactDatePicker from "react-datepicker";

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
  const [birthday, setBirthday] = useState<Date>(new Date());
  const { userId } = useParams();
  const navigate = useNavigate();
  const photo = import.meta.env.BASE_URL + profile.picture;
  const { currentUser } = useUserContext();

  useEffect(() => {
    Requests.getSingleProfile(Number(userId)).then((res) => {
      setProfile(res);
      setBirthday(new Date(res.birthday));
    });
  }, []);

  useEffect(() => {
    Requests.getSingleProfile(Number(userId)).then((res) => {
      setProfile(res);
      setBirthday(new Date(res.birthday));
    });
  }, [userId]);

  return (
    <div style={{ color: "white" }}>
      <div className="profile_img_container">
        <img
          src={photo}
          style={{ width: "200px", height: "200px", borderRadius: "20px" }}
        />
        <div className="profile_user_basic_info">
          <h2>{profile.user}</h2>
          <p>
            <span className="user_basic_info_span">Home:</span>{" "}
            <span
              contentEditable={profile.user === currentUser.username}
              suppressContentEditableWarning
              onBlur={(e) =>
                Requests.updateProfile(currentUser.id, {
                  home: e.currentTarget.innerText,
                })
              }
            >
              {profile.home}
            </span>
          </p>
          <p>
            <span className="user_basic_info_span">Occupation:</span>{" "}
            <span
              contentEditable={profile.user === currentUser.username}
              suppressContentEditableWarning
              onBlur={(e) =>
                Requests.updateProfile(currentUser.id, {
                  occupation: e.currentTarget.innerText,
                })
              }
            >
              {profile.occupation}
            </span>
          </p>
          <p>
            <span className="user_basic_info_span">Birthday:</span>{" "}
            {profile.user === currentUser.username && (
              <ReactDatePicker
                className="profile_birthday_date_picker"
                selected={birthday}
                onChange={(birthday: Date) => {
                  setBirthday(birthday);
                  Requests.updateProfile(currentUser.id, {
                    birthday: new Date(birthday).toLocaleDateString("en-US"),
                  });
                }}
              />
            )}
            {profile.user !== currentUser.username && (
              <span>
                {new Date(profile.birthday).toLocaleDateString("en-US")}
              </span>
            )}
          </p>
          <p>
            <span className="user_basic_info_span">Age:</span>{" "}
            <span>
              {" "}
              {/* Progammatic calculation of age - milliseconds from date of birth to today -> divided by milliseconds in one day */}
              {Math.floor(
                (Date.parse(new Date().toLocaleDateString("en-US")) -
                  Date.parse(
                    new Date(profile.birthday).toLocaleDateString("en-US")
                  )) /
                  (1000 * 60 * 60 * 24 * 365.25)
              )}
            </span>
          </p>
        </div>
      </div>
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
      <p
        className="profile_bio"
        contentEditable={profile.user === currentUser.username}
        suppressContentEditableWarning
        spellCheck={false}
        onBlur={(e) =>
          Requests.updateProfile(profile.id, {
            bio: e.currentTarget.innerText,
          })
        }
      >
        {profile.bio ? profile.bio : "User has not yet submitted a bio"}
      </p>
      <Schedule profile={profile} />
    </div>
  );
};
