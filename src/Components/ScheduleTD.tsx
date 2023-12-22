import { useEffect, useState } from "react";
import { TSchedules } from "./Schedule";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useUserContext } from "../Providers/UserProvider";
import { Requests } from "../api/schedulesApi";
import { TProfile } from "./Friends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

type TScheduleTDProps = {
  day: TSchedules[];
  dayOfWeekIndex: number;
  profile: TProfile;
  fetchUserScheduleData: (user: string) => void;
};

export const ScheduleTD = ({
  day,
  dayOfWeekIndex,
  profile,
  fetchUserScheduleData,
}: TScheduleTDProps) => {
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [newListItemVisible, setNewListItemVisible] = useState<boolean>(false);
  const [newListItemContent, setNewListItemContent] = useState<string>("");
  const [saveButtonVisible, setSaveButtonVisible] = useState<boolean>(false);
  const [listItemView, setListItemView] = useState<"display" | "delete">(
    "display"
  );

  const { currentUser } = useUserContext();

  const newScheduleData = {
    user: currentUser.username,
    day: dayOfWeekIndex,
    event: newListItemContent,
  };

  const handleListItemContentChange = (e: ContentEditableEvent) => {
    setNewListItemContent(e.target.value);
  };

  let deletionQueue: number[] = [];

  useEffect(() => {
    if (newListItemVisible) {
      setNewListItemVisible(false);
    }
  }, []);

  return (
    <>
      <td
        key={`day-of-the-week-${dayOfWeekIndex}`}
        onMouseOver={() => setButtonVisible(true)}
        onMouseLeave={() => setButtonVisible(false)}
      >
        {buttonVisible && profile.user === currentUser.username && (
          <>
            {listItemView === "display" && (
              <button
                className="schedule_trashcan_btn"
                onClick={() => setListItemView("delete")}
              >
                {<FontAwesomeIcon icon={faTrashCan} />}
              </button>
            )}
            {listItemView === "delete" && (
              <div className="delete_or_cancel_btn_container">
                <input type="button" value="Cancel" />
                <input
                  type="button"
                  value="Delete"
                  onClick={async () =>
                    await Promise.all(
                      deletionQueue.map((id: number) =>
                        Requests.deleteScheduleAppointment(id)
                      )
                    )
                  }
                />
              </div>
            )}
            <input
              type="button"
              value="+"
              onClick={() => {
                setNewListItemVisible(true);
                setSaveButtonVisible(true);
              }}
            />
          </>
        )}
        <ul>
          {day.length ? (
            day.map((obj, eventIndex) =>
              listItemView === "display" ? (
                <li
                  key={`day-${dayOfWeekIndex}-event-${eventIndex}`}
                  suppressContentEditableWarning
                  contentEditable={profile.user === currentUser.username}
                >
                  {obj.event}
                </li>
              ) : (
                <div
                  className="delete_queue_list_item"
                  key={`deletion_item_day-${dayOfWeekIndex}-event-${eventIndex}`}
                >
                  <input
                    onChange={() => {
                      deletionQueue.push(obj.id);
                    }}
                    type="checkbox"
                    className="appointment_deletion_checkbox"
                  />
                  <label>{obj.event}</label>
                </div>
              )
            )
          ) : (
            <li
              suppressContentEditableWarning
              contentEditable={profile.user === currentUser.username}
            >
              {"No Data"}
            </li>
          )}
          {newListItemVisible && (
            <>
              <li className={saveButtonVisible ? "underline" : "no_underline"}>
                <ContentEditable
                  className="new_appointment"
                  html={newListItemContent}
                  onChange={handleListItemContentChange}
                />
              </li>
              {saveButtonVisible && (
                <input
                  type="button"
                  value="save"
                  className="new_schedule_item_save_btn"
                  onClick={() => {
                    Requests.postNewScheduleData(newScheduleData).then(() => {
                      setSaveButtonVisible(false);
                      fetchUserScheduleData(profile.user);
                      setNewListItemContent("");
                      setNewListItemVisible(false);
                    });
                  }}
                />
              )}
            </>
          )}
        </ul>
      </td>
    </>
  );
};
