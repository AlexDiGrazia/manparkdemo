import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div
        style={{
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "white" }}>Oops!</h1>
          <h2 style={{ color: "white" }}>{error.status}</h2>
          <p style={{ color: "white" }}>{error.statusText}</p>
        </div>
      </div>
    );
  } else {
    return <div>Oops!</div>;
  }
};
