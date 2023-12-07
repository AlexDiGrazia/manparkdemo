const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllPhotos: () => fetch(`${BASE_URL}/photos`).then((res) => res.json()),
};
