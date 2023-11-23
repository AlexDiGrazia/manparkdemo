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
      <tr
        onMouseOver={() => setCarrotVisible(true)}
        onMouseOut={() => setCarrotVisible(false)}
        className="upcoming_event"
      >
        <td style={{ width: "40%" }} className="event_date">
          {new Date(date).toLocaleDateString("en-US")}
        </td>
        <td
          className="event_title"
          style={{ display: "inline-block", position: "relative" }}
        >
          {carrotVisible && (
            <span onClick={() => toggleAccordion()}>&#9660;</span>
          )}
          <p style={{ margin: "10px 0", position: "relative" }}>{title} </p>
        </td>
      </tr>
      <tr className="event_details">
        <td></td>
        <div className={`${accordionPosition} event_details_container`}>
          {details}
        </div>
      </tr>
    </>
  );
};
