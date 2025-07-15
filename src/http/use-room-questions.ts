import { env } from "@/env";
import { useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-respose";

export function useRoomQuestionss(roomId: string) {
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://${env.API_HOST}:${env.API_PORT}/rooms/${roomId}/questions`
      );
      const result: GetRoomQuestionsResponse = await response.json();

      return result;
    },
  });
}
