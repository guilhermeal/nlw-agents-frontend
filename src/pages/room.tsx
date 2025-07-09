import { useParams, Navigate } from "react-router-dom";

type RommParams = {
  roomId: string;
};

export const Room = () => {
  const params = useParams<RommParams>();

  console.log("Room params:", params);

  if (!params.roomId || params.roomId.length === 0 || params.roomId === "") {
    console.log("Room params vazio:");
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <strong>Room details</strong>
      <p>Room ID: {params.roomId}</p>
    </div>
  );
};
