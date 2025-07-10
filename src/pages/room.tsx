import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate, Link } from "react-router-dom";

type RommParams = {
  roomId: string;
};

type Question = {
  id: string;
  question: string;
  answer?: string;
  createdAt: string;
};

type GetAPIRoomsResponse = Array<{
  id: string;
  name: string;
  questionsCount: number;
  questions: Array<Question>;
}>;

export const Room = () => {
  const params = useParams<RommParams>();

  if (!params.roomId || params.roomId.length === 0 || params.roomId === "") {
    console.log("Room params vazio:");
    return <Navigate to="/" replace />;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["get-room-and-questions"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${params.roomId}`
      );
      const result: GetAPIRoomsResponse = await response.json();

      return result;
    },
  });

  const questions = data?.questions || [];

  if (isLoading) {
    return <p>Loading data room...</p>;
  }

  return (
    <div>
      <strong>Room details</strong>
      <p>Room ID: {params.roomId}</p>
      <div className="flex flex-col mt-5">
        <p className="font-bold mb-5">Perguntas: ({data?.questionsCount})</p>
        <div className="container mx-auto p-4 text-sm">
          <ol className="list-decimal">
            {questions.map((question: Question) => {
              return (
                <li key={question.id} title={question.id} className="my-2">
                  {question.question}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <Button asChild>
        <Link to="/">Voltar</Link>
      </Button>
    </div>
  );
};
