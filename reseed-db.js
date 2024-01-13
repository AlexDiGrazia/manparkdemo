import { writeFileSync } from "fs";
import {
  users,
  profiles,
  community_posts,
  schedules,
  events,
  photos,
} from "./databaseConstants.js";

const db = {
  users: users.map((obj, id) => ({
    username: obj.username,
    password: obj.password,
    id: id + 1,
  })),
  profiles: profiles.map((obj, id) => ({
    user: obj.user,
    picture: obj.picture,
    bio: obj.bio,
    home: obj.home,
    occupation: obj.occupation,
    birthday: obj.birthday,
    id: id + 1,
  })),
  community_posts: community_posts.map((obj, id) => ({
    user: obj.user,
    text: obj.text,
    id: id + 1,
  })),
  schedules: schedules.map((obj, id) => ({
    user: obj.user,
    day: obj.day,
    event: obj.event,
    id: id + 1,
  })),
  events: events.map((obj, id) => ({
    user: obj.user,
    date: obj.date,
    title: obj.title,
    details: obj.details,
    id: id + 1,
  })),
  photos: photos.map((obj, id) => ({
    image: obj.image,
    date: obj.date,
    id: id + 1,
  })),
};

writeFileSync("db.json", JSON.stringify(db), {
  encoding: "utf-8",
});
