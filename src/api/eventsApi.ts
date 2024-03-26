import { TEvent } from "../Components/EventsList";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllEvents: () => fetch(`${BASE_URL}/events`).then((res) => res.json()),

  postNewEvent: (
    newEvent: { date: Date; title: string; details: string },
    jwtToken: string
  ) =>
    fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(newEvent),
    }),

  updateEventDetails: (
    id: number,
    updatedDetails: { details: string }
  ): Promise<TEvent> =>
    fetch(`${BASE_URL}/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDetails),
    }).then((res) => res.json()),

  deleteEvent: (id: number | null) =>
    fetch(`${BASE_URL}/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),
};
