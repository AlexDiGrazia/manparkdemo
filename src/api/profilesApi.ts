import { TProfile } from "../Components/Friends";

const BASE_URL = "http://localhost:3000";

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
