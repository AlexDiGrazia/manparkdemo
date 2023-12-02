import { Dispatch, SetStateAction } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useHomeContext } from "../Providers/HomeProvider";

type TEditMenuProps = {
  setDisplay: Dispatch<SetStateAction<"text" | "editBox">>;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  id: number;
};

export const EditMenu = ({
  setDisplay,
  setMenuVisible,
  id,
}: TEditMenuProps) => {
  const closeDropDown = () => setMenuVisible(false);
  const ref = useDetectClickOutside({ onTriggered: closeDropDown });

  const { setCurrentComment, setDialogVisible } = useHomeContext();

  return (
    <>
      <div className="edit_delete_dropdown_container">
        <div className="edit_delete_dropdown" ref={ref}>
          <ul>
            <li
              onClick={() => {
                setDisplay("editBox");
                setMenuVisible(false);
              }}
            >
              Edit
            </li>
            <li
              onClick={() => {
                setCurrentComment(id);
                setMenuVisible(false);
                setDialogVisible(true);
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
