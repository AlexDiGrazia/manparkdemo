import { TEvent } from "../Components/EventsList";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    updatedDetails: { details: string },
    jwtToken: string
  ): Promise<TEvent> =>
    fetch(`${BASE_URL}/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(updatedDetails),
    }).then((res) => res.json()),

  //TO_DO why is id number | null???
  deleteEvent: (id: number | null, jwtToken: string) =>
    fetch(`${BASE_URL}/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
    }).then((res) => res.json()),
};
