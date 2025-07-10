import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetAPIRoomsResponse = Array<{
  id: string;
  name: string;
  questionsCount: number;
}>;

export const CreateRoom = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const result: GetAPIRoomsResponse = await response.json();

      return result;
    },
  });

  return (
    <div>
      <strong>Create Room</strong>

      {isLoading && <p>Loading rooms...</p>}

      <div className="container mx-auto p-4 text-sm">
        <ol className="list-decimal">
          {data?.map((room) => {
            return (
              <li key={room.id} title={room.id} className="my-2">
                <Link
                  key={room.id}
                  title={`Room ID: ${room.id}`}
                  to={`/room/${room.id}`}
                >
                  {`${room.name} (${room.questionsCount})`}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
