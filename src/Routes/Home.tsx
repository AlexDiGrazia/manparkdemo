/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Layout } from "../Components/Layout";
import { TabSlider } from "../Components/TabSlider";
import { useUserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { CommunityPosts } from "../Components/CommunityPosts";
import { EventsList } from "../Components/EventsList";
import { ConfirmationDialog } from "../Components/ConfirmationDialog";
import { useHomeContext } from "../Providers/HomeProvider";
import { EventSubmissionForm } from "../Components/EventSubmissionForm";
import { Friends, TProfile } from "../Components/Friends";
import { Photos } from "../Components/Photos";
import { Requests } from "../api/usersApi";
import { Requests as ProfileRequests } from "../api/profilesApi";
import { TUserObject } from "../Components/UserLogin";
import toast from "react-hot-toast";
import { EditProfilePrompt } from "./editProfilePrompt";

export const Home = () => {
  const [currentProfile, setCurrentProfile] = useState<TProfile>(
    {} as TProfile
  );
  const { currentUser, setCurrentUser } = useUserContext();
  const {
    dialogVisible,
    eventSubmissionFormVisible,
    tab,
    setTab,
    setFriendsListDisplay,
  } = useHomeContext();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser({} as TUserObject);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      Requests.getSingleUser(user).then(setCurrentUser);
    }
    ProfileRequests.getAllProfiles()
      .then((res) => res.find((profile: TProfile) => profile.user === user))
      .then((res) => {
        setCurrentProfile(res);
      });
  }, []);

  return (
    <>
      <Layout image="sunset">
        <div className="flex space-between">
          <h2 className="welcome_user">{`Welcome, ${currentUser.username}!`}</h2>
          <div className="flex column center profile-buttons">
            <img
              className="profile-picture"
              src={`public/${currentProfile.picture}`}
              alt="portrait of user"
            />
            <div className="flex side_by_side">
              <span
                onClick={() => {
                  localStorage.getItem("personal_profile") ===
                    "first_ever_visit" &&
                    toast.custom((t) => <EditProfilePrompt t={t} />, {
                      duration: Infinity,
                      id: "editProfileToast",
                    });
                  localStorage.removeItem("personal_profile");
                  setTab("friends-tab");
                  setFriendsListDisplay("profile");
                  navigate(`/home/user/${currentUser.id}`);
                }}
              >
                Profile
              </span>
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
