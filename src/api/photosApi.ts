const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllPhotos: () => fetch(`${BASE_URL}/photos`).then((res) => res.json()),

  postNewPhoto: (newPhoto: { image: string; date: string }) =>
    fetch(`${BASE_URL}/photos/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPhoto),
    }),
};
