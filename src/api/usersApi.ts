import { TUsers } from "../types";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllUsers: () => fetch(`${BASE_URL}/users`).then((res) => res.json()),

  createNewUser: (newUser: { username: string; password: string }) =>
    fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((response): Promise<TUsers> => response.json()),
};
