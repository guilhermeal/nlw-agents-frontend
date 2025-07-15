import { env, apiUrl } from "@/env";
import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/get-rooms-respose";

export function useRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/rooms`, {
        headers: {
          Authorization: `Bearer ${env.VITE_API_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });


      if (!response.ok) {
        throw new Error('Falha ao retornar salas!');
      }

      const result: GetRoomsResponse = await response.json();

      return result;
    },
  });
}
