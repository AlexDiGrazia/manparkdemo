import { TSchedules } from "../Routes/Profile";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  getCurrentUserScheduleData: (user: string) =>
    fetch(`${BASE_URL}/schedules`)
      .then((res) => res.json())
      .then((res) => res.filter((obj: TSchedules) => obj.user === user)),
};
