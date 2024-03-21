import { TProfile } from "../Components/Friends";
import { TUserObject } from "../Components/UserLogin";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  // SCHEDULED FOR DELETION - NOT IN USE
  // getAllUsers: () =>
  //   fetch(`${BASE_URL}/users`).then((res) => {
  //     return res.json();
  //   }),

  //SCHEDULED FOR DELETION - NOT IN USE
  // getSingleUser: (id: number) =>
  //   fetch(`${BASE_URL}/users/${id}`).then((res) => res.json()),

  retrieveUserByName: ({ username }: { username: string }) =>
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .catch(() => console.log("oh no something went wrong!")),

  //Backend EndPoint does a nested Create for User's Profile
  //See Prisma Schema
  createNewUserAndAssociatedProfile: (newUser: {
    username: string;
    password: string;
    profile: Omit<TProfile, "id" | "userId">;
  }) =>
    fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((response): Promise<TUserObject> => response.json()),
};
