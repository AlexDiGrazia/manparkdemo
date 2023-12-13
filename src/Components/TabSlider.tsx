import { useLocation, useNavigate } from "react-router-dom";
import { useHomeContext } from "../Providers/HomeProvider";

export const TabSlider = () => {
  const { tab, setTab } = useHomeContext();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTabChange = (tab: string) => {
    pathname !== "/home" && navigate("/home", { replace: true });
    setTab(tab);
  };

  return (
    <>
      <div className="selector_bar">
        <label className="tab" htmlFor="radio-posts">
          <input
            type="radio"
            id="radio-posts"
            name="tabs"
            onChange={() => handleTabChange("posts-tab")}
            defaultChecked
          />
          Posts
        </label>
        <label className="tab" htmlFor="radio-events">
          <input
            type="radio"
            id="radio-events"
            name="tabs"
            onChange={() => handleTabChange("events-tab")}
          />
          Events
        </label>
        <label className="tab" htmlFor="radio-friends">
          <input
            type="radio"
            id="radio-friends"
            name="tabs"
            onChange={() => handleTabChange("friends-tab")}
          />
          Friends
        </label>
        <label className="tab" htmlFor="radio-photos">
          <input
            type="radio"
            id="radio-photos"
            name="tabs"
            onChange={() => handleTabChange("photos-tab")}
          />
          Photos
        </label>
        <span className={`glider ${tab}`}></span>
      </div>
    </>
  );
};
