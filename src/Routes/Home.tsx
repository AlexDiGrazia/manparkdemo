/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect /* useState */ } from "react";
// import { Layout } from "../Components/Layout";
import { TabSlider } from "../Components/TabSlider";
import { useUserContext } from "../Providers/UserProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { CommunityPosts } from "../Components/CommunityPosts";
import { EventsList } from "../Components/EventsList";
import { ConfirmationDialog } from "../Components/ConfirmationDialog";
import { useHomeContext } from "../Providers/HomeProvider";
import { EventSubmissionForm } from "../Components/EventSubmissionForm";
import { Friends /* TProfile  */, TProfile } from "../Components/Friends";
import { Photos } from "../Components/Photos";
import { TUserObject } from "../Components/UserLogin";
import toast from "react-hot-toast";
import { EditProfilePrompt } from "../Components/EditProfilePrompt";

export const Home = () => {
  const {
    currentUser,
    setCurrentUser,
    currentProfile,
    setCurrentProfile,
    reloadCurrentUserAndProfile,
  } = useUserContext();
  const {
    dialogVisible,
    eventSubmissionFormVisible,
    tab,
    setTab,
    setFriendsListDisplay,
  } = useHomeContext();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser({} as TUserObject);
    setCurrentProfile({} as TProfile);
    navigate("/", { replace: true });
  };

  const pageWasRefreshed = !currentUser.username && !currentProfile.username;

  useEffect(() => {
    if (pageWasRefreshed) {
      if (pathname !== "/home" && pathname !== "/")
        navigate(
          "/home"
        ); /* if user is currently viewing /home/user/:userId, this will re-route /home upone page refresh */
      reloadCurrentUserAndProfile();
    }
  }, []);

  return (
    <>
      <div className="flex space-between">
        <h2 className="welcome_user">{`Welcome, ${
          currentUser?.username ||
          localStorage.getItem("user") ||
          "User Not Found"
        }!`}</h2>
        <div className="flex column center profile-buttons">
          <img
            className="profile-picture"
            src={`/${currentProfile?.picture}`}
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
                setFriendsListDisplay("profile");
                setTab("friends-tab");
                navigate(`/home/user/${currentProfile.id}`);
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
    </>
  );
};
