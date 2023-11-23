import { Dispatch, SetStateAction, useState } from "react";
import { TEvent } from "./EventsList";
import { Requests } from "../api/eventsApi";
import ReactDatePicker from "react-datepicker";

export type TEventSubmissionFormProps = {
  setAllEvents: Dispatch<SetStateAction<TEvent[]>>;
};

export const EventSubmissionForm = ({
  setAllEvents,
}: TEventSubmissionFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const newEvent = {
    date,
    title,
    details,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Requests.postNewEvent(newEvent).then(() =>
      Requests.getAllEvents().then(setAllEvents)
    );
    setDate(new Date());
    setTitle("");
    setDetails("");
  };
  return (
    <>
      <form className="new_event_form" onSubmit={handleSubmit}>
        <ReactDatePicker
          selected={date}
          onChange={(date: Date) => setDate(date)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="event_details"
          id="event_details"
          maxLength={500}
          placeholder="Event Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
