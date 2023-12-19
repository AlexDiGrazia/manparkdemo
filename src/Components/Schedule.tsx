import { useEffect, useState } from "react";
import { Requests } from "../api/schedulesApi";
import { Requests as ProfileRequests } from "../api/profilesApi";
import { useParams } from "react-router-dom";

export type TSchedules = {
  user: string;
  day: number;
  event: string;
};

export const Schedule = () => {
  const [scheduleData, setScheduleData] = useState<TSchedules[]>([]);
  const { userId } = useParams();
  const daysOfWeekNumbers = [0, 1, 2, 3, 4, 5, 6];
  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const scheduleEachDayOfWeek = daysOfWeekNumbers.map((day) =>
    scheduleData.filter((obj) => obj.day === day)
  );

  const fetchUserScheduleData = (user: string) => {
    Requests.getCurrentUserScheduleData(user).then(setScheduleData);
  };

  useEffect(() => {
    ProfileRequests.getSingleProfile(Number(userId)).then((profileData) => {
      fetchUserScheduleData(profileData.user);
    });
  }, []);

  return (
    <>
      <table className="schedule">
        <thead>
          <tr>
            {dayOfWeekNames.map((day) => (
              <th>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {scheduleEachDayOfWeek.map((day, dayOfWeekIndex) => (
              <td key={`day-of-the-week-${dayOfWeekIndex}`}>
                <ul>
                  {day.length ? (
                    day.map((obj, eventIndex) => (
                      <li key={`day-${dayOfWeekIndex}-event-${eventIndex}`}>
                        {obj.event}
                      </li>
                    ))
                  ) : (
                    <li>{"No Data"}</li>
                  )}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};
