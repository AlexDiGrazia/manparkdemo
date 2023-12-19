import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Requests } from "../api/usersApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";

export type TUserObject = {
  username: string;
  password: string;
  id: number;
};

export const UserLogin = () => {
  const [inputType, setInputType] = useState<string>("password");
  const [icon, setIcon] = useState<IconProp>(faEye);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { setDisplay, setCurrentUser } = useUserContext();

  const togglePassword = () => {
    const newType = inputType === "password" ? "text" : "password";
    const newIcon = icon === faEye ? faEyeSlash : faEye;
    setInputType(newType);
    setIcon(newIcon);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Requests.getAllUsers().then((res) => {
      if (res.some((obj: TUserObject) => obj.username === username)) {
        if (
          res.find((obj: TUserObject) => obj.username === username).password ===
          password
        ) {
          localStorage.setItem("user", username);
          Requests.getSingleUser(username).then(setCurrentUser);
          navigate("home");
          setUsername("");
          setPassword("");
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
