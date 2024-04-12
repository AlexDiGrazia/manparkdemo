import { useEffect, useRef } from "react";
import { Requests } from "../api/photosApi";
import { Requests as ProfileRequests } from "../api/profilesApi";
import { useUserContext } from "../Providers/UserProvider";
import { useHomeContext } from "../Providers/HomeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const UploadWidget = ({ dynamicPropsObject, children }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const { display, currentProfile, jwtToken } = useUserContext();
  const { tab } = useHomeContext();

  const {
    multiple,
    callback,
    setProfilePicture,
    refetchAllPhotos,
    refetchProfileInformation,
    picture,
    cropping,
  } = dynamicPropsObject;

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        multiple,
        cropping,
      },
      (error, result) => {
        if (
          !error &&
          result &&
          result.info.url !== undefined &&
          result.info.url !== ""
        ) {
          if (callback === "profile-picture") {
            setProfilePicture(result.info.url);
          }
          if (callback === "gallery") {
            Requests.postNewPhoto({
              image: result.info.url,
              date: new Date().toLocaleDateString("en-US"),
            }).then(() => refetchAllPhotos());
          }
          if (callback === "patch-profile-pic") {
            console.log("correct callback");
            console.log(result.info.url);
            ProfileRequests.updateProfile(
              currentProfile.id,
              { picture: result.info.url },
              jwtToken
            ).then(() => refetchProfileInformation());
          }
        }
      }
    );
  }, []);

  return (
    <>
      {tab !== "friends-tab" && (
        <button
          className={`${
            display === "SignUp" && "profile_photo_submit_btn"
          }  margin-bottom`}
          type="button"
          onClick={() => widgetRef.current.open()}
        >
          {children}
        </button>
      )}

      {tab === "friends-tab" && (
        <div>
          <div
            style={{ backgroundImage: `url(${picture})` }}
            className={`patch_profile_btn`}
            onClick={() => widgetRef.current.open()}
          >
            <div className="profile-pic-overlay">
              <FontAwesomeIcon className="faPenToSquare" icon={faPenToSquare} />
            </div>

            {/* {children} */}
          </div>
          <span
            className="profile_pic_edit_btn"
            onClick={() => widgetRef.current.open()}
          >
            Edit
          </span>
        </div>
      )}
    </>
  );
};
