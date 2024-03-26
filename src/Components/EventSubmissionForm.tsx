import { Dispatch, SetStateAction, useState } from "react";
import { TEvent } from "./EventsList";
import { Requests } from "../api/eventsApi";
import ReactDatePicker from "react-datepicker";
import { useHomeContext } from "../Providers/HomeProvider";
import { useUserContext } from "../Providers/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import toast from "react-hot-toast";

export type TEventSubmissionFormProps = {
  setAllEvents: Dispatch<SetStateAction<TEvent[]>>;
  setDisplay: Dispatch<SetStateAction<string>>;
};

export const EventSubmissionForm = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [titleCharLimit, setTitleCharLimit] = useState<number>(50);

  const { refetchAllEvents, setEventSubmissionFormVisible } = useHomeContext();
  const { jwtToken } = useUserContext();
  const newEvent = {
    date,
    title,
    details,
  };

  const titleMaxLength = 50;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title !== "" && newEvent.details !== "") {
      Requests.postNewEvent(newEvent, jwtToken).then(refetchAllEvents);
      setDate(new Date());
      setTitle("");
      setDetails("");
      setEventSubmissionFormVisible(false);
    } else {
      toast.error("Please complete all fields");
    }
  };
  return (
    <>
      <form className="new_event_form" onSubmit={handleSubmit}>
        <FontAwesomeIcon
          icon={faXmark}
          style={{ textAlign: "right" }}
          className="Xmark_icon"
          onClick={() => setEventSubmissionFormVisible(false)}
        />
        <ReactDatePicker
          selected={date}
          onChange={(date: Date) => setDate(date)}
        />
        <div className="event_title_input_container">
          <input
            type="text"
            placeholder="Title"
            value={title}
            maxLength={titleMaxLength}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleCharLimit(titleMaxLength - e.target.value.length);
            }}
          />
          {titleCharLimit < 26 && <span>{titleCharLimit}</span>}
        </div>
        <TextareaAutosize
          minRows={5}
          maxRows={10}
          name="event_details"
          id="event_details"
          maxLength={500}
          placeholder="Event Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <input
          type="submit"
          value="Submit"
          className="event_form_submission_btn"
        />
      </form>
    </>
  );
};
