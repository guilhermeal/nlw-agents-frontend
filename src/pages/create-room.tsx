import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";

export const CreateRoom = () => {
  return (
    <div className="h-[90%] bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  );
};
