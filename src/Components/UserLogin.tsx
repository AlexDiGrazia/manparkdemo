import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";
import { TProfile } from "./Friends";
import { authRequests } from "../api/authApi";

export type TUserObject = {
  username: string;
  id: number;
  profile: TProfile;
};

export const UserLogin = () => {
  const [inputType, setInputType] = useState<string>("password");
  const [icon, setIcon] = useState<IconProp>(faEye);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { setDisplay, setCurrentUser, setCurrentProfile, setJwtToken } =
    useUserContext();

  const togglePassword = () => {
    const newType = inputType === "password" ? "text" : "password";
    const newIcon = icon === faEye ? faEyeSlash : faEye;
    setInputType(newType);
    setIcon(newIcon);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authRequests.getJwtToken({ username, password }).then((res) => {
      if (res) {
        if (res.token) {
          localStorage.setItem("user", username);
          setCurrentUser(res.userInformation);
          setCurrentProfile(res.userInformation.profile);
          setJwtToken(res.token);
          setUsername("");
          setPassword("");
          navigate("home");
        } else {
          toast.error("Username and Password must match");
        }
      } else {
        toast.error("This user does not exist");
      }
    });
  };

  return (
    <>
      <p className="CTA_create_account">
        Don't have an account?{" "}
        <strong className="CTA_link" onClick={() => setDisplay("SignUp")}>
          Create Account
        </strong>
      </p>
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
        <div className="flex column align_items_start">
          <input
            className="enter_btn margin-bottom"
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </>
  );
};
