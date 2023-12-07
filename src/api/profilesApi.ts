const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllProfiles: () => fetch(`${BASE_URL}/profiles`).then((res) => res.json()),

  getSingleProfile: (id: number) =>
    fetch(`${BASE_URL}/profiles/${id}`).then((res) => res.json()),
};
