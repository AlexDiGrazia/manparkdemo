import { useEffect, useRef } from "react";
import { Requests } from "../api/photosApi";

export const UploadWidget = (refetchAllPhotos) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      },
      (error, result) => {
        if (
          !error &&
          result &&
          result.info.url !== undefined &&
          result.info.url !== ""
        ) {
          console.log("image successfully uploaded");
          Requests.postNewPhoto({
            image: result.info.url,
            date: new Date().toLocaleDateString("en-US"),
          }).then(() => refetchAllPhotos());
        }
      }
    );
  }, []);

  return <button onClick={() => widgetRef.current.open()}>Upload</button>;
};
