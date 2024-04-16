import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import { Requests } from "./api/usersApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./Providers/UserProvider";
import ReactDatePicker from "react-datepicker";
import { UploadWidget } from "./Components/UploadWidget";

export const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [home, setHome] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | undefined>(undefined);
  const [password, setPassword] = useState<string>("");
  const [confirmation, setConfirmation] = useState<string>("");
  const [inputType, setInputType] = useState<string>("password");
  const [icon, setIcon] = useState<IconProp>(faEye);
  const [confirmationType, setConfirmationType] = useState<string>("password");
  const [confirmationIcon, setConfirmationIcon] = useState<IconProp>(faEye);
  const [profilePicture, setProfilePicture] = useState<string>("");

  const navigate = useNavigate();
  const { setDisplay, setCurrentUser, setCurrentProfile, setJwtToken } =
    useUserContext();

  const newProfile = {
    username,
    picture: profilePicture,
    bio: "",
    home,
    occupation,
    birthday,
  };

  const newUser = {
    username,
    password,
    profile: newProfile,
  };

  const allFieldsComplete = () => {
    let allFieldsComplete = true;
    [
      username,
      home,
      occupation,
      birthday,
      password,
      confirmation,
      profilePicture,
    ].forEach((field) => {
      field !== "" && field !== undefined ? null : (allFieldsComplete = false);
    });
    return allFieldsComplete;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmation && allFieldsComplete()) {
      Requests.createNewUserAndAssociatedProfile(newUser).then((res) => {
        localStorage.setItem("user", username);
        localStorage.setItem("personal_profile", "first_ever_visit");
        localStorage.setItem("jwtToken", res.token);
        setCurrentUser(res.userInformation);
        setCurrentProfile(res.userInformation.profile);
        setJwtToken(res.token);
        setUsername("");
        setPassword("");
        setDisplay("");
        setHome("");
        setOccupation("");
        setBirthday(undefined);
        setConfirmation("");
        navigate("home");
      });
    } else {
      if (password !== confirmation) {
        toast.error("Password and confirmation must match", {
          id: "passwords-match",
        });
      }
      if (!allFieldsComplete()) {
        toast.error("Please complete all input fields", {
          id: "all-fields-complete",
        });
      }
    }
  };

  const togglePassword = () => {
    const newType = inputType === "password" ? "text" : "password";
    const newIcon = icon === faEye ? faEyeSlash : faEye;
    setInputType(newType);
    setIcon(newIcon);
  };

  const toggleConfirmation = () => {
    const newType = confirmationType === "password" ? "text" : "password";
    const newIcon = confirmationIcon === faEye ? faEyeSlash : faEye;
    setConfirmationType(newType);
    setConfirmationIcon(newIcon);
  };

  return (
    <>
      <form className="login_form sign_up_form" onSubmit={handleSubmit}>
        <p className="CTA_create_account">
          Back to{" "}
          <strong className="CTA_link" onClick={() => setDisplay("UserLogin")}>
            Login
          </strong>
        </p>
        <label htmlFor="username"></label>
        <input
          className="text_inputs margin-bottom"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          placeholder="Username"
        />
        <label htmlFor="home"></label>
        <input
          className="text_inputs margin-bottom"
          type="text"
          value={home}
          onChange={(e) => setHome(e.target.value)}
          id="home"
          placeholder="Home"
        />
        <label htmlFor="occupation"></label>
        <input
          className="text_inputs margin-bottom"
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          id="occupation"
          placeholder="Occupation"
        />
        <label htmlFor="birthday"></label>
        <ReactDatePicker
          className="text_inputs margin-bottom"
          selected={birthday}
          placeholderText={birthday ? `${birthday}` : "Birthday"}
          onChange={(birthday: Date) => {
            setBirthday(new Date(birthday));
          }}
        />
        <label htmlFor="password"></label>
        <div className="password_input_container margin-bottom">
          <input
            className="text_inputs"
            type={inputType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
          />
          <FontAwesomeIcon
            className="faEye"
            icon={icon}
            onClick={() => togglePassword()}
          />
        </div>
        <label htmlFor="password_confirmation"></label>
        <div className="password_input_container margin-bottom">
          <input
            className="text_inputs"
            type={confirmationType}
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            id="password_confirmation"
            placeholder="Confirm Password"
          />
          <FontAwesomeIcon
            className="faEye"
            icon={confirmationIcon}
            onClick={() => toggleConfirmation()}
          />
        </div>

        <div className="profile_pic_upload_container">
          <UploadWidget
            dynamicPropsObject={{
              callback: "profile-picture",
              multiple: false,
              setProfilePicture,
              cropping: true,
              uploadPreset: import.meta.env
                .VITE_CLOUDINARY_PROFILE_THUMBNAIL_UPLOAD_PRESET,
            }}
          />

          <label htmlFor="profile-image-url"></label>
          <input
            className="profile-image-url-input"
            placeholder="Profile Picture"
            type="text"
            value={profilePicture}
          />
        </div>

        <div className="flex column align_items_start">
          <input
            className="enter_btn margin-bottom"
            type="submit"
            value="Create Account"
          />
        </div>
      </form>
    </>
  );
};
