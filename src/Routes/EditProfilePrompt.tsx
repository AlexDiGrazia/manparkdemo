import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import toast, { Toast } from "react-hot-toast";

export const EditProfilePrompt = ({ t }: { t: Toast }) => {
  return (
    <>
      <div className={`edit_profile_toast reveal_toast`}>
        <p>
          <span>✏️</span> Click text to edit profile information
        </p>
        <button
          onClick={() => {
            toast.remove(t.id);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </>
  );
};
