/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { TEvent } from "../Components/EventsList";
import { Requests as EventRequests } from "../api/eventsApi";
import { Requests as PostRequests } from "../api/postsApi";
import { TComment } from "../types";

type THomeContext = {
  allEvents: TEvent[];
  setAllEvents: Dispatch<SetStateAction<TEvent[]>>;
  allComments: TComment[];
  setAllComments: Dispatch<SetStateAction<TComment[]>>;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  refetchAllEvents: () => void;
  refetchAllComments: () => void;
  currentEvent: number | null;
  setCurrentEvent: Dispatch<SetStateAction<number | null>>;
  currentComment: number | null;
  setCurrentComment: Dispatch<SetStateAction<number | null>>;
  dialogVisible: boolean;
  setDialogVisible: Dispatch<SetStateAction<boolean>>;
  eventSubmissionFormVisible: boolean;
  setEventSubmissionFormVisible: Dispatch<SetStateAction<boolean>>;
  friendsListDisplay: "friends-list" | "profile";
  setFriendsListDisplay: Dispatch<SetStateAction<"friends-list" | "profile">>;
};

const HomeContext = createContext({} as THomeContext);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [allEvents, setAllEvents] = useState<TEvent[]>([]);
  const [allComments, setAllComments] = useState<TComment[]>([]);
  const [tab, setTab] = useState<string>("posts-tab");
  const [currentEvent, setCurrentEvent] = useState<number | null>(null);
  const [currentComment, setCurrentComment] = useState<number | null>(null);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [eventSubmissionFormVisible, setEventSubmissionFormVisible] =
    useState<boolean>(false);
  const [friendsListDisplay, setFriendsListDisplay] = useState<
    "friends-list" | "profile"
  >("friends-list");

  const refetchAllEvents = () => {
    EventRequests.getAllEvents().then(setAllEvents);
  };

  const refetchAllComments = () =>
    PostRequests.getAllCommunityPosts().then(setAllComments);

  return (
    <>
      <HomeContext.Provider
        value={{
          allEvents,
          setAllEvents,
          allComments,
          setAllComments,
          tab,
          setTab,
          refetchAllEvents,
          refetchAllComments,
          currentEvent,
          setCurrentEvent,
          currentComment,
          setCurrentComment,
          dialogVisible,
          setDialogVisible,
          eventSubmissionFormVisible,
          setEventSubmissionFormVisible,
          friendsListDisplay,
          setFriendsListDisplay,
        }}
      >
        {children}
      </HomeContext.Provider>
    </>
  );
};

export const useHomeContext = () => useContext(HomeContext);
