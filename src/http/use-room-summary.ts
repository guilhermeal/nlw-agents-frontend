import { apiUrl, env } from "@/env";
import { useMutation } from "@tanstack/react-query";
import type { GetRoomSummaryResponse } from "./types/get-room-summary-respose";

export function useRoomSummary() {
  return useMutation({
    mutationFn: async (roomId: string) => {
      const response = await fetch(`${apiUrl}/rooms/${roomId}/summary`, {
        headers: {
          Authorization: `Bearer ${env.VITE_API_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao gerar resumo da sala!");
      }

      const result: GetRoomSummaryResponse = await response.json();

      return result;
    },
  });
}
