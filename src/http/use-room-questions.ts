import { apiUrl, env } from "@/env";
import { useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-respose";

export function useRoomQuestionss(roomId: string) {
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/rooms/${roomId}/questions`, {
        headers: {
          Authorization: `Bearer ${env.VITE_API_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const result: GetRoomQuestionsResponse = await response.json();

      return result;
    },
  });
}
