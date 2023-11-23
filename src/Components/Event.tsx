import { useState } from "react";

type TEvent = {
  date: Date;
  title: string;
  details: string;
};

export const Event = ({ date, title, details }: TEvent) => {
  const [carrotVisible, setCarrotVisible] = useState<boolean>(false);
  const [accordionPosition, setAccordionPosition] = useState<string>("closed");

  const toggleAccordion = () => {
    const newPosition = accordionPosition === "closed" ? "open" : "closed";
    setAccordionPosition(newPosition);
  };

  return (
    <>
      <div
        onMouseOver={() => setCarrotVisible(true)}
        onMouseOut={() => setCarrotVisible(false)}
        className="upcoming_event"
      >
        <div className="event_date first_column">
          {new Date(date).toLocaleDateString("en-US")}
        </div>
        <div
          className="event_title"
          style={{ display: "inline-block", position: "relative" }}
        >
          {carrotVisible && (
            <span onClick={() => toggleAccordion()}>&#9660;</span>
          )}
          <p style={{ margin: "0", position: "relative" }}>{title} </p>
        </div>
      </div>
      <div className="event_details">
        <div className="first_column"></div>
        <div className={`${accordionPosition} event_details_container`}>
          {details}
        </div>
      </div>
    </>
  );
};
