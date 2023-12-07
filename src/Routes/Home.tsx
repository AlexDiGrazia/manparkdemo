/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Layout } from "../Components/Layout";
import { TabSlider } from "../Components/TabSlider";
import { useUserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { CommunityPosts } from "../Components/CommunityPosts";
import { EventsList } from "../Components/EventsList";
import { ConfirmationDialog } from "../Components/ConfirmationDialog";
import { useHomeContext } from "../Providers/HomeProvider";
import { EventSubmissionForm } from "../Components/EventSubmissionForm";
import { Friends } from "../Components/Friends";
import { Photos } from "../Components/Photos";

export const Home = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const { dialogVisible, eventSubmissionFormVisible, tab } = useHomeContext();

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
              src="public/assets/Alex.jpeg"
              alt="portrait of user"
            />
            <div className="flex side_by_side">
              <span>Profile</span>
              <span onClick={logout}>Logout</span>
            </div>
          </div>
        </div>
        <TabSlider />
        <div className="content_layout">
          <div className="confirmation_dialog_container">
            {dialogVisible && <ConfirmationDialog />}
            {eventSubmissionFormVisible && <EventSubmissionForm />}
          </div>
          <div className="home_content_container">
            {tab === "posts-tab" && <CommunityPosts />}
            {tab === "events-tab" && <EventsList />}
            {tab === "friends-tab" && <Friends />}
            {tab === "photos-tab" && <Photos />}
          </div>
        </div>
      </Layout>
    </>
  );
};
