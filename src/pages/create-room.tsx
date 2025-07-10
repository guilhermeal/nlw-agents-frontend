import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dayjs } from "@/lib/dayjs";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type GetAPIRoomsResponse = Array<{
  id: string;
  name: string;
  questionsCount: number;
  createdAt: string;
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
    <div className="min-h-screen p-5">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />

          <Card>
            <CardHeader>
              <CardTitle>Salas recentes</CardTitle>
              <CardDescription>
                Acesso rápido para as salas criadas recentemente
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {isLoading && (
                <p className="text-muted-foreground text-sm">
                  Carregando salas...
                </p>
              )}

              {data?.map((room) => {
                return (
                  <Link
                    key={room.id}
                    to={`/rooms/${room.id}`}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/30"
                  >
                    <div className="flex flex-1 flex-col gap-1">
                      <h3 className="font-medium">{room.name}</h3>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {dayjs(room.createdAt).toNow()}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {`${room.questionsCount} pergunta${
                            room.questionsCount > 1 ? `s` : ``
                          }`}
                        </Badge>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-sm">
                      Entrar <ArrowRight className="size-3" />
                    </span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
