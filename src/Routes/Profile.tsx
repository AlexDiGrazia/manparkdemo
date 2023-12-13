import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Requests } from "../api/profilesApi";
import { Requests as ScheduleRequests } from "../api/schedulesApi";
import { useNavigate, useParams } from "react-router-dom";
import { TProfile } from "../Components/Friends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type TProfileProps = {
  setDisplay: Dispatch<SetStateAction<"friends-list" | "profile">>;
};

export type TSchedules = {
  user: string;
  day: number;
  event: string;
};

interface ScheduleEventsPerDay {
  [day: number]: TSchedules[];
}

export const Profile = ({ setDisplay }: TProfileProps) => {
  const [profile, setProfile] = useState<TProfile>({} as TProfile);
  const [scheduleData, setScheduleData] = useState<TSchedules[]>([]);
  const { userId } = useParams();

  const fetchUserScheduleData = (user: string) => {
    ScheduleRequests.getCurrentUserScheduleData(user).then(setScheduleData);
  };

  useEffect(() => {
    Requests.getSingleProfile(Number(userId)).then((profileData) => {
      setProfile(profileData);
      fetchUserScheduleData(profileData.user);
    });
  }, []);

  const photo = import.meta.env.BASE_URL + profile.picture;
  const navigate = useNavigate();

  return (
    <div style={{ color: "white" }}>
      <img
        src={photo}
        style={{ width: "200px", height: "200px", borderRadius: "20px" }}
      />
      <span
        className="profile_back_btn"
        onClick={() => {
          setDisplay("friends-list");
          navigate("/home");
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </span>
      <p>{profile.user}</p>
      <p>{profile.bio ? profile.bio : "User has not yet submitted a bio"}</p>
      <table className="schedule">
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(
              scheduleData
                .toSorted((a: TSchedules, b: TSchedules) => a.day - b.day)
                .reduce((acc: ScheduleEventsPerDay, obj: TSchedules) => {
                  acc[obj.day] = [...(acc[obj.day] || []), obj];
                  return acc;
                }, {})
            ).map((array: TSchedules[]) => (
              <td key={`day-of-the-week-${array[0].day}`}>
                <ul>
                  {array.map((obj, index) => (
                    <li key={`day-${array[0]}-event-${index}`}>{obj.event}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
