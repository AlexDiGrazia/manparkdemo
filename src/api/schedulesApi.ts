import { TSchedules } from "../Routes/Profile";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  getCurrentUserScheduleData: (user: string) =>
    fetch(`${BASE_URL}/schedules/${user}`).then((res) => res.json()),

  postNewScheduleData: (
    newData: Omit<TSchedules, "id" | "user">,
    jwtToken: string
  ) =>
    fetch(`${BASE_URL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(newData),
    }).then((res) => res.json()),

  deleteManyScheduleAppointments: (
    deletionQueue: {
      deletionQueue: number[];
    },
    jwtToken: string
  ) =>
    fetch(`${BASE_URL}/schedules/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(deletionQueue),
    }).then((res) => res.json()),

  updateScheduleAppointment: (
    id: number,
    updateAppointment: { event: string },
    jwtToken: string
  ) =>
    fetch(`${BASE_URL}/schedules/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(updateAppointment),
    }),
};
