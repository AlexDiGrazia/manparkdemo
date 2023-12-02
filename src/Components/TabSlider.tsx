import { useHomeContext } from "../Providers/HomeProvider";

export const TabSlider = () => {
  const { tab: selected, setTab: setSelected } = useHomeContext();

  return (
    <>
      <div className="selector_bar">
        <label className="tab" htmlFor="radio-posts">
          <input
            type="radio"
            id="radio-posts"
            name="tabs"
            onChange={() => setSelected("posts")}
            defaultChecked
          />
          Posts
        </label>
        <label className="tab" htmlFor="radio-events">
          <input
            type="radio"
            id="radio-events"
            name="tabs"
            onChange={() => setSelected("events")}
          />
          Events
        </label>
        <label className="tab" htmlFor="radio-friends">
          <input
            type="radio"
            id="radio-friends"
            name="tabs"
            onChange={() => setSelected("friends")}
          />
          Friends
        </label>
        <label className="tab" htmlFor="radio-photos">
          <input
            type="radio"
            id="radio-photos"
            name="tabs"
            onChange={() => setSelected("photos")}
          />
          Photos
        </label>
        <span className={`glider ${selected}`}></span>
      </div>
    </>
  );
};
