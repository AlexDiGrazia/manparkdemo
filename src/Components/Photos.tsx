import { useEffect, useState } from "react";
import { Requests } from "../api/photosApi";

type TPhoto = {
  image: string;
  date: Date;
  id: number;
};

interface PhotosByMonth {
  [month: number]: TPhoto[];
}
export const Photos = () => {
  const [allPhotos, setAllPhotos] = useState<TPhoto[]>([]);

  useEffect(() => {
    Requests.getAllPhotos().then(setAllPhotos);
  }, []);

  return (
    <>
      <div>
        {Object.values(
          allPhotos
            .toSorted(
              (a: { date: Date }, b: { date: Date }) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .reduce((acc: PhotosByMonth, obj) => {
              const month = new Date(obj.date).getMonth();
              acc[month] = [...(acc[month] || []), obj];
              return acc;
            }, {})
        ).map((array) => {
          return (
            <div key="">
              <h2 style={{ textAlign: "center" }}>
                {" "}
                {new Date(array[0].date).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="photos_container">
                {array.map((obj: TPhoto) => (
                  <div
                    key={`photo_album_image_${obj.id}`}
                    className="photo_album_image"
                    style={{ backgroundImage: `url(${obj.image})` }}
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
