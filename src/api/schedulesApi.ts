import { TSchedules } from "../Routes/Profile";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  getCurrentUserScheduleData: (user: string) =>
    fetch(`${BASE_URL}/schedules/${user}`).then((res) => res.json()),

  postNewScheduleData: (newData: Omit<TSchedules, "id">) =>
    fetch(`${BASE_URL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then((res) => res.json()),

  deleteScheduleAppointment: (id: number) =>
    fetch(`${BASE_URL}/schedules/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),

  updateScheduleAppointment: (
    id: number,
    updateAppointment: { event: string }
  ) =>
    fetch(`${BASE_URL}/schedules/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateAppointment),
    }),
};
