import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { Event } from "./Event";
import { useHomeContext } from "../Providers/HomeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export type TEvent = {
  user: string;
  date: Date;
  title: string;
  details: string;
  id: number;
};

export const EventsList = () => {
  const { refetchAllEvents, allEvents, setEventSubmissionFormVisible } =
    useHomeContext();

  useEffect(() => {
    refetchAllEvents();
  }, []);

  const submitNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEventSubmissionFormVisible(true);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", fontSize: "42px" }}>Events</h2>
      <form onSubmit={submitNewEvent} className="submit_new_event_btn">
        <input type="submit" value="New Event" />
        <FontAwesomeIcon icon={faPlus} className="plus_icon" />{" "}
      </form>
      <div>
        {allEvents
          .toSorted(
            (a: { date: Date }, b: { date: Date }) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .filter(
            (event) =>
              Date.parse(new Date(event.date).toLocaleDateString("en-US")) >=
              Date.parse(new Date().toLocaleDateString("en-US"))
          )
          .map((event) => (
            <Event
              key={`event_${event.id}`}
              user={event.user}
              date={event.date}
              title={event.title}
              details={event.details}
              id={event.id}
            />
          ))}
      </div>
    </>
  );
};
