/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Layout } from "../Components/Layout";
import { SelectorBar } from "../Components/SelectorBar";
import { useUserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { CommunityPosts } from "../Components/CommunityPosts";
import { EventsList } from "../Components/EventsList";

export const Home = () => {
  const [selected, setSelected] = useState<string>("posts");
  const { currentUser, setCurrentUser } = useUserContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser("");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <Layout image="sunset">
        <div className="flex space-between">
          <h1>{`Welcome, ${currentUser}!`}</h1>
          <div className="flex column center profile-buttons">
            <img
              className="profile-picture"
              src="src/assets/Alex.jpeg"
              alt="portrait of user"
            />
            <div className="flex side_by_side">
              <span>Profile</span>
              <span onClick={logout}>Logout</span>
            </div>
          </div>
        </div>
        <SelectorBar selected={selected} setSelected={setSelected} />
        <div className="content_layout">
          {selected === "posts" && <CommunityPosts />}
          {selected === "events" && <EventsList />}
        </div>
      </Layout>
    </>
  );
};
