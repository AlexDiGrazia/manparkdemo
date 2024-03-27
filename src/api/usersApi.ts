import { TProfile } from "../Components/Friends";
import { TUserObject } from "../Components/UserLogin";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  retrieveUserByName: ({ username }: { username: string }, jwtToken: string) =>
    fetch(`${BASE_URL}/users/retrieve_by_name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
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
    fetch(`${BASE_URL}/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(
      (response): Promise<{ token: string; userInformation: TUserObject }> =>
        response.json()
    ),
};
