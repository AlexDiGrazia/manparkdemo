import { LoginGate } from "../Components/LoginGate";
import { UserLogin } from "../Components/UserLogin";
import { SignUp } from "../SignUp";
import { Layout } from "../Components/Layout";
import { useUserContext } from "../Providers/UserProvider";
import { useEffect } from "react";

export const Root = () => {
  const { display, setDisplay } = useUserContext();

  useEffect(() => {
    if (localStorage.getItem("gatecode") === "Sadie") {
      setDisplay("UserLogin");
    }
  }, []);

  return (
    <>
      <Layout image="helping-hand">
        <h1 className="logo">Man Park</h1>
        <div className="gate-login">
          <div className="inputs-container">
            {display === "SignUp" && <SignUp />}
            {display === "LoginGate" && <LoginGate />}
            {display === "UserLogin" && <UserLogin />}
          </div>
        </div>
      </Layout>
    </>
  );
};
