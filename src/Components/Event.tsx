import { useRef, useState } from "react";
import { useUserContext } from "../Providers/UserProvider";
import { TEvent } from "./EventsList";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Requests } from "../api/eventsApi";
import { useHomeContext } from "../Providers/HomeProvider";

export const Event = ({ user, date, title, details, id }: TEvent) => {
  const [carrotVisible, setCarrotVisible] = useState<boolean>(false);
  const [accordionPosition, setAccordionPosition] = useState<string>("closed");
  const [display, setDisplay] = useState<"text" | "editBox">("text");

  const toggleAccordion = () => {
    const newPosition = accordionPosition === "closed" ? "open" : "closed";
    setAccordionPosition(newPosition);
  };

  const { currentUser } = useUserContext();
  const { setDialogVisible, setCurrentEvent, refetchAllEvents } =
    useHomeContext();

  const detailsText = useRef<string>(details);

  const handleChange = (e: ContentEditableEvent) => {
    detailsText.current = e.currentTarget.innerText;
  };

  const updateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    Requests.updateEventDetails(id, { details: detailsText.current }).then(
      () => {
        refetchAllEvents();
        setDisplay("text");
      }
    );
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
        <div className="event_title">
          {carrotVisible && (
            <span
              onClick={() => {
                setCurrentEvent(id);
                toggleAccordion();
              }}
            >
              &#9660;
            </span>
          )}
          <p style={{ margin: "0", position: "relative" }}>{title} </p>
        </div>
      </div>
      <div className="event_details">
        <div className="first_column"></div>
        <div
          className={`${accordionPosition} second_column ${
            accordionPosition === "open" && "second_column_padding_bottom"
          }`}
        >
          <div
            className={`${accordionPosition} event_details_container
          ${
            accordionPosition === "open" &&
            display === "editBox" &&
            "event_details_container_border_bottom"
          }`}
          >
            {display === "text" && (
              <p style={{ margin: "0", whiteSpace: "pre-wrap" }}>
                {details
                  ? details
                  : "No details yet! Be the first to add some -->"}
              </p>
            )}
            {display === "editBox" && (
              <ContentEditable
                className="details_edit_box"
                html={detailsText.current}
                onChange={handleChange}
                spellCheck="false"
              />
            )}
          </div>

          {accordionPosition === "open" && display === "text" && (
            <div className="event_details_btns">
              <input
                type="button"
                value="Edit"
                onClick={() => setDisplay("editBox")}
              />
              {currentUser.username === user && (
                <input
                  type="button"
                  value="Delete"
                  onClick={() => setDialogVisible(true)}
                />
              )}
            </div>
          )}
          {accordionPosition === "open" && display === "editBox" && (
            <form onSubmit={updateDetails}>
              <input
                className="edit_details_save_btn"
                type="submit"
                value="Save"
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
};
