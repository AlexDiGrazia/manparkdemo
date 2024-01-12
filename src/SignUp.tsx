import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import { Requests } from "./api/usersApi";
import { Requests as ProfileRequests } from "./api/profilesApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./Providers/UserProvider";
import ReactDatePicker from "react-datepicker";

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

  const navigate = useNavigate();
  const { setCurrentUser } = useUserContext();

  const newUser = {
    username,
    password,
  };

  const newProfile = {
    user: username,
    picture: "assets/Blank.webp",
    bio: "",
    home,
    occupation,
    birthday,
  };

  const allFieldsComplete = () => {
    let allFieldsComplete = true;
    [username, home, occupation, birthday, password, confirmation].forEach(
      (field) => {
        field !== "" && field !== undefined
          ? null
          : (allFieldsComplete = false);
      }
    );
    return allFieldsComplete;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmation && allFieldsComplete()) {
      Requests.createNewUser(newUser)
        .then(() => Requests.getSingleUser(username))
        .then(setCurrentUser);
      localStorage.setItem("user", username);
      localStorage.setItem("personal_profile", "first_ever_visit");
      ProfileRequests.createNewProfile(newProfile);
      navigate("home");
      setUsername("");
      setPassword("");
      setHome("");
      setOccupation("");
      setBirthday(undefined);
      setConfirmation("");
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
