import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Requests } from "../api/eventsApi";
import { Event } from "./Event";
import { EventSubmissionForm } from "./EventSubmissionForm";

export type TEvent = {
  date: Date;
  title: string;
  details: string;
};

export const EventsList = () => {
  const [display, setDisplay] = useState<string>("events ");
  const [allEvents, setAllEvents] = useState<TEvent[]>([]);

  useEffect(() => {
    Requests.getAllEvents().then(setAllEvents);
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", fontSize: "42px" }}>Events</h2>

      <div>
        {allEvents
          .toSorted(
            (a: { date: Date }, b: { date: Date }) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((event) => (
            <Event
              date={event.date}
              title={event.title}
              details={event.details}
            />
          ))}
      </div>

      {display === "submission_form" && (
        <EventSubmissionForm setAllEvents={setAllEvents} />
      )}
    </>
  );
};
