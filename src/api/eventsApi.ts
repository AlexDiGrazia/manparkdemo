// import { TEvent } from "../Components/Events";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllEvents: () => fetch(`${BASE_URL}/events`).then((res) => res.json()),

  postNewEvent: (newEvent: { date: Date; title: string; details: string }) =>
    fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    }),
};
