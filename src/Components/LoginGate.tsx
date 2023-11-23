import { useState } from "react";
import toast from "react-hot-toast";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useUserContext } from "../Providers/UserProvider";

export const LoginGate = () => {
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [inputType, setInputType] = useState<string>("password");
  const [icon, setIcon] = useState<IconProp>(faEye);

  const { setDisplay } = useUserContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordInput === "Sadie") {
      setDisplay("UserLogin");
      localStorage.setItem("gate", "unlocked");
    } else {
      toast.error("Only fools attempt to enter where they don't belong", {
        style: {
          position: "relative",
        },
      });
    }
  };

  const togglePassword = () => {
    const newType = inputType === "password" ? "text" : "password";
    const newIcon = icon === faEye ? faEyeSlash : faEye;
    setInputType(newType);
    setIcon(newIcon);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="password_input_container">
          <label htmlFor="enter"></label>
          <input
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
            type={inputType}
            id="enter"
            className="text_inputs margin-bottom"
            autoFocus={true}
          />
          <FontAwesomeIcon
            className="faEye"
            icon={icon}
            onClick={togglePassword}
          />
        </div>

        <input className="enter_btn" type="submit" value="Enter" />
      </form>
    </>
  );
};
