import { useEffect, useState } from "react";
import { Requests } from "../api/photosApi";
import { UploadWidget } from "./UploadWidget";

type TPhoto = {
  image: string;
  date: Date;
  id: number;
};

interface PhotosByMonth {
  [month: string]: TPhoto[];
}
export const Photos = () => {
  const [allPhotos, setAllPhotos] = useState<TPhoto[]>([]);

  const refetchAllPhotos = () => Requests.getAllPhotos().then(setAllPhotos);

  useEffect(() => {
    refetchAllPhotos();
  }, []);

  return (
    <>
      <UploadWidget refetchAllPhotos={refetchAllPhotos} />
      <div>
        {Object.values(
          allPhotos
            .toSorted(
              (a: { date: Date }, b: { date: Date }) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .reduce((acc: PhotosByMonth, obj) => {
              const collection = new Date(obj.date).toLocaleDateString("en-US");
              acc[collection] = [...(acc[collection] || []), obj];
              console.log(Object.values(acc));
              return acc;
            }, {})
        ).map((array, index) => {
          return (
            <div key={`photo_month_collection_${index}`}>
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

//TO_DO change DB photos to not have /public/ in url
