import { useRoomQuestionss } from "@/http/use-room-questions";
import { QuestionItem } from "./question-item";

type QuestionListProps = {
  roomId: string;
};

export const QuestionList = (props: QuestionListProps) => {
  const { data } = useRoomQuestionss(props.roomId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {data?.length === 0 && <p>Nenhuma questão encontrada...</p>}

      {data?.map((question) => {
        return <QuestionItem key={question.id} question={question} />;
      })}
    </div>
  );
};
