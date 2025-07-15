import { apiUrl } from "@/env";
import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/get-rooms-respose";

export function useRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch(
        `${apiUrl}/rooms`
      );
      const result: GetRoomsResponse = await response.json();

      return result;
    },
  });
}
