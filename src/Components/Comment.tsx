import { Dispatch, SetStateAction, useState } from "react";
import { Requests } from "../api/postsApi";
import { TComment } from "../types";
import { useUserContext } from "../Providers/UserProvider";
import { Ellipsis } from "./Ellipsis";
import { EditMenu } from "./EditMenu";

type TCommentProps = {
  commentText: string;
  user: string;
  id: number;
  setAllComments: Dispatch<SetStateAction<TComment[]>>;
};

export const Comment = ({
  commentText,
  user,
  id,
  setAllComments,
}: TCommentProps) => {
  const [ellipsisVisible, setEllipsisVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [commentDisplay, setCommentDisplay] = useState<string>("text");
  const [commentEdit, setCommentEdit] = useState<string>(commentText);

  const updateComment = (e: React.FormEvent) => {
    e.preventDefault();
    Requests.updateComment(id, { text: commentEdit }).then(() => {
      setCommentDisplay("text");
      Requests.getAllCommunityPosts().then(setAllComments);
    });
  };

  const { currentUser } = useUserContext();

  return (
    <>
      <div
        className="comment"
        onMouseOver={() => setEllipsisVisible(true)}
        onMouseOut={() => setEllipsisVisible(false)}
      >
        <img
          className="comment_user_thumbnail"
          src="src/assets/Alex.jpeg"
          alt="profile picture thumbnail"
        />
        <div className="comment_content">
          <h2>@{user}</h2>
          {commentDisplay === "text" && (
            <p className="comment_text">{commentText}</p>
          )}
          {commentDisplay === "editBox" && (
            <form onSubmit={updateComment}>
              <textarea
                value={commentEdit}
                className="edit_comment_textarea"
                onChange={(e) => setCommentEdit(e.target.value)}
              ></textarea>
              <input type="submit" value="Save" />
            </form>
          )}
        </div>
        {ellipsisVisible && currentUser === user && (
          <Ellipsis
            setMenuVisible={setMenuVisible}
            className="comment_ellipsis"
          />
        )}
        {menuVisible && (
          <EditMenu
            setUserInput={setCommentDisplay}
            setMenuVisible={setMenuVisible}
            id={id}
            setAllComments={setAllComments}
          />
        )}
      </div>
    </>
  );
};
