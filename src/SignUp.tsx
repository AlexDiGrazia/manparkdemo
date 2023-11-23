import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import { Requests } from "./api/usersApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./Providers/UserProvider";

export const SignUp = () => {
  const [username, setUsername] = useState<string>("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmation) {
      Requests.createNewUser(newUser);
      localStorage.setItem("user", username), setCurrentUser(username);
      setCurrentUser("username");
      navigate("home");
      setUsername("");
      setPassword("");
      setConfirmation("");
    } else {
      toast.error("Password and password confirmation must match");
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
      <form className="login_form" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <input
          className="text_inputs margin-bottom"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          placeholder="Username"
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
