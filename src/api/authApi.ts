const BASE_URL = "http://localhost:3000";

export const authRequests = {
  getJwtToken: (user: { username: string; password: string }) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json()),
};
