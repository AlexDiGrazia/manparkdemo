import { TUserObject } from "../Components/UserLogin";
// import { TUsers } from "../types";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllUsers: () =>
    fetch(`${BASE_URL}/users`).then((res) => {
      return res.json();
    }),

  getSingleUser: (id: number) =>
    fetch(`${BASE_URL}/users/${id}`).then((res) => res.json()),

  retrieveUserByName: ({ username }: { username: string }) =>
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost5173",
        url: "http://localhost5173",
        vary: origin,
      },
      body: JSON.stringify({ username }),
    }).then((res) => res.json()),

  createNewUser: (newUser: { username: string; password: string }) =>
    fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((response): Promise<TUserObject> => response.json()),
};

// getSingleUser: async (user: string) =>
//   await fetch(`${BASE_URL}/users`)
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res.find((obj: TUserObject) => obj.username === user));
//       return res.find((obj: TUserObject) => obj.username === user);
//     }),
