import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetAPIRoomsResponse = Array<{
  id: string;
  name: string;
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

      <div className="flex flex-col">
        {data?.map((room) => {
          return (
            <Button variant={"link"} key={room.id} title={room.id}>
              <Link to={`/room/${room.id}`}>{room.name}</Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
