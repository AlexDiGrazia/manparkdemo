import { Dispatch, SetStateAction } from "react";
import { TComment } from "../types";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Requests } from "../api/postsApi";

type TEditMenuProps = {
  setUserInput: Dispatch<SetStateAction<string>>;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  id: number;
  setAllComments: Dispatch<SetStateAction<TComment[]>>;
};

export const EditMenu = ({
  setUserInput,
  setMenuVisible,
  id,
  setAllComments,
}: TEditMenuProps) => {
  const closeDropDown = () => setMenuVisible(false);
  const ref = useDetectClickOutside({ onTriggered: closeDropDown });
  return (
    <>
      <div className="edit_delete_dropdown_container">
        <div className="edit_delete_dropdown" ref={ref}>
          <ul>
            <li
              onClick={() => {
                setUserInput("editBox");
                setMenuVisible(false);
              }}
            >
              Edit
            </li>
            <li
              onClick={() => {
                Requests.deleteComment(id).then(() =>
                  Requests.getAllCommunityPosts().then(setAllComments)
                );
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
