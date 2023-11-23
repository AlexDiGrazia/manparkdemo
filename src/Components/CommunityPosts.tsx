import { useEffect, useState } from "react";
import { Requests } from "../api/postsApi";
import { Comment } from "./Comment";
import { TComment } from "../types";
import { useUserContext } from "../Providers/UserProvider";

export const CommunityPosts = () => {
  const [allComments, setAllComments] = useState<TComment[]>([]);
  const [commentInput, setCommentInput] = useState<string>("");

  const { currentUser } = useUserContext();

  const newComment = {
    user: currentUser,
    text: commentInput,
  };

  const fetchComments = () =>
    Requests.getAllCommunityPosts().then(setAllComments);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput !== "") {
      Requests.postNewComment(newComment).then(() => fetchComments());
      setCommentInput("");
    }
  };

  useEffect(() => {
    Requests.getAllCommunityPosts().then(setAllComments);
  }, []);

  return (
    <>
      <div className="community_posts">
        <form onSubmit={handleSubmit}>
          <textarea
            name="submit"
            id="comment_submit"
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
          ></textarea>
          <input type="submit" />
        </form>
        {!allComments && (
          <div className="text-align-center">
            {" "}
            No posts have been made yet. Be the first to say something!
          </div>
        )}
        {allComments &&
          allComments
            .toSorted((a: { id: number }, b: { id: number }) => b.id - a.id)
            .map((comment: TComment) => (
              <Comment
                key={`community_comment_${comment.id}`}
                commentText={comment.text}
                user={comment.user}
                id={comment.id}
                setAllComments={setAllComments}
              />
            ))}
      </div>
    </>
  );
};
