import { useEffect, useState } from "react";
import { Requests } from "../api/profilesApi";
import { useParams } from "react-router-dom";
import { TProfile } from "../Components/Friends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Profile = () => {
  const [profile, setProfile] = useState<TProfile>({} as TProfile);
  const { userId } = useParams();

  useEffect(() => {
    Requests.getSingleProfile(Number(userId)).then(setProfile);
  }, []);

  const photo = import.meta.env.BASE_URL + profile.picture;

  return (
    <div style={{ color: "white" }}>
      <img
        src={photo}
        style={{ width: "200px", height: "200px", borderRadius: "20px" }}
      />
      <span className="profile_back_btn">
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </span>
      <p>{profile.user}</p>
      <p>{profile.bio ? profile.bio : "User has not yet submitted a bio"}</p>
      <table className="schedule">
        <thead>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul>
                <li>Work 9-5pm</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Work 9-5pm</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Work 9-5pm</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
                <li>Work 9-5pm</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Off</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Off</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
