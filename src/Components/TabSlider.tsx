import { useHomeContext } from "../Providers/HomeProvider";

export const TabSlider = () => {
  const { tab, setTab } = useHomeContext();

  return (
    <>
      <div className="selector_bar">
        <label className="tab" htmlFor="radio-posts">
          <input
            type="radio"
            id="radio-posts"
            name="tabs"
            onChange={() => setTab("posts-tab")}
            defaultChecked
          />
          Posts
        </label>
        <label className="tab" htmlFor="radio-events">
          <input
            type="radio"
            id="radio-events"
            name="tabs"
            onChange={() => setTab("events-tab")}
          />
          Events
        </label>
        <label className="tab" htmlFor="radio-friends">
          <input
            type="radio"
            id="radio-friends"
            name="tabs"
            onChange={() => setTab("friends-tab")}
          />
          Friends
        </label>
        <label className="tab" htmlFor="radio-photos">
          <input
            type="radio"
            id="radio-photos"
            name="tabs"
            onChange={() => setTab("photos-tab")}
          />
          Photos
        </label>
        <span className={`glider ${tab}`}></span>
      </div>
    </>
  );
};
