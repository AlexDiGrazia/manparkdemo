import { UserLogin } from "../Components/UserLogin";
import { SignUp } from "../SignUp";
import { Layout } from "../Components/Layout";
import { useUserContext } from "../Providers/UserProvider";

export const Root = () => {
  const { display } = useUserContext();

  return (
    <>
      <Layout image="helping-hand">
        <h1 className="logo">Man Park</h1>
        <div className="gate-login">
          <div className="inputs-container">
            {display === "SignUp" && <SignUp />}
            {display === "UserLogin" && <UserLogin />}
          </div>
        </div>
      </Layout>
    </>
  );
};
