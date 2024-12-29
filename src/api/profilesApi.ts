import { TProfile } from "../Components/Friends";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Requests = {
  getAllProfiles: () => fetch(`${BASE_URL}/profiles`).then((res) => res.json()),

  getSingleProfile: (id: number) =>
    fetch(`${BASE_URL}/profiles/${id}`).then((res) => res.json()),

  updateProfile: (id: number, profile: Partial<TProfile>, jwtToken: string) =>
    fetch(`${BASE_URL}/profiles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(profile),
    }).then((res) => res.json()),
};
