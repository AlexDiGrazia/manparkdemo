import { TComment } from "../types";

const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllCommunityPosts: () =>
    fetch(`${BASE_URL}/community_posts`).then((res) => res.json()),

  postNewComment: (
    userInput: Omit<TComment, "id" | "user">,
    jwtToken: string
  ): Promise<TComment> =>
    fetch(`${BASE_URL}/community_posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(userInput),
    }).then((response) => response.json()),

  updateComment: (
    id: number,
    updatedComment: { text: string },
    jwtToken: string
  ): Promise<TComment> =>
    fetch(`${BASE_URL}/community_posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(updatedComment),
    }).then((response) => response.json()),

  deleteComment: (id: number, jwtToken: string) =>
    fetch(`${BASE_URL}/community_posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
    }).then((res) => res.json()),
};
