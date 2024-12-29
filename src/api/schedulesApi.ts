import { TSchedules } from "../Routes/Profile";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
