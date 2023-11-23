import { useState } from "react";
import { SignUp } from "./SignUp";

export const HeroSection = () => {
  const [loginModalVisibility, setLoginModalVisibility] =
    useState<boolean>(false);

  return (
    <>
      <div className="heroContainer" style={{ maxWidth: "500px" }}>
        <p
          style={{
            color: "white",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          Welcome to What Next!
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          nulla fugiat in soluta consequuntur mollitia repellat non dolores
          vitae, earum obcaecati. Perferendis vero mollitia asperiores, officiis
          amet magni voluptas debitis.
        </p>
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <button
            className="btn-default"
            onClick={() => setLoginModalVisibility(!loginModalVisibility)}
          >
            Login
          </button>

          <button className="btn-default">Sign Up</button>
        </div>
      </div>

      {loginModalVisibility && <SignUp />}
    </>
  );
};
