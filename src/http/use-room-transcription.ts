import { apiUrl, env } from "@/env";
import { useMutation } from "@tanstack/react-query";
import type { GetRoomTranscriptionResponse } from "./types/get-room-transcription-respose";

export function useRoomTranscription() {
  return useMutation({
    mutationFn: async (roomId: string) => {
      const response = await fetch(`${apiUrl}/rooms/${roomId}/transcription`, {
        headers: {
          Authorization: `Bearer ${env.VITE_API_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao gerar transcrição da sala!");
      }

      const result: GetRoomTranscriptionResponse = await response.json();

      return result;
    },
  });
}
