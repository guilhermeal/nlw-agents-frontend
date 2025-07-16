import { QuestionForm } from "@/components/question-form";
import { QuestionList } from "@/components/question-list";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoomSummary } from "@/http/use-room-summary";
import { useRoomTranscription } from "@/http/use-room-transcription";
import {
  ArrowLeft,
  Loader2,
  NotebookTabs,
  Radio,
  Sparkles,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

type RoomParams = {
  roomId: string;
};

export const Room = () => {
  const params = useParams<RoomParams>();
  const summaryMutation = useRoomSummary();
  const transcriptionMutation = useRoomTranscription();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  const handleClickGetTranscription = () => {
    if (!params.roomId) {
      return;
    }
    transcriptionMutation.mutate(params.roomId);
  };

  const handleClickGetSummary = () => {
    if (!params.roomId) {
      return;
    }
    summaryMutation.mutate(params.roomId);
  };

  return (
    <div className="h-[90%] bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 pb-2">
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/">
              <Button variant="outline" className="cursor-pointer">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>

            <Link to={`/room/${params.roomId}/audio`}>
              <Button variant="secondary">
                <Radio className="size-4 mr-2" />
                Gravar Áudio
              </Button>
            </Link>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              className="flex items-center gap-2 cursor-pointer"
              variant="secondary"
              onClick={handleClickGetTranscription}
              disabled={transcriptionMutation.isPending}
            >
              {transcriptionMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <NotebookTabs className="size-4" />
              )}
              {transcriptionMutation.isPending ? "Gerando..." : "Transcrição"}
            </Button>

            <Button
              className="flex items-center gap-2 cursor-pointer"
              variant="secondary"
              onClick={handleClickGetSummary}
              disabled={summaryMutation.isPending}
            >
              {summaryMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <NotebookTabs className="size-4" />
              )}
              {summaryMutation.isPending ? "Gerando..." : "Gerar resumo"}
            </Button>
          </div>
        </div>

        {transcriptionMutation.isPending && (
          <div className="p-4 flex flex-col gap-2 bg-zinc-900 rounded-lg mb-6 animate-pulse">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="px-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        )}

        {transcriptionMutation.data?.transcription && (
          <div className="p-4 flex flex-col gap-2 bg-zinc-900 rounded-lg mb-6">
            <div className="flex gap-2 items-center">
              <Sparkles className="size-5 text-yellow-400" />
              <h3 className="font-bold text-lg">
                Transcrição da gravação:
              </h3>
            </div>
            <p className="px-4 text-muted-foreground italic">
              {transcriptionMutation.data.transcription}
            </p>
          </div>
        )}

        {transcriptionMutation.error && (
          <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg mb-6">
            <p className="text-red-400">
              Erro ao gerar transcrição: {transcriptionMutation.error.message}
            </p>
          </div>
        )}

        {summaryMutation.isPending && (
          <div className="p-4 flex flex-col gap-2 bg-zinc-900 rounded-lg mb-6 animate-pulse">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="px-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        )}

        {summaryMutation.data?.summary && (
          <div className="p-4 flex flex-col gap-2 bg-zinc-900 rounded-lg mb-6">
            <div className="flex gap-2 items-center">
              <Sparkles className="size-5 text-yellow-400" />
              <h3 className="font-bold text-lg">
                Resumo da aula gerado por IA:
              </h3>
            </div>
            <p className="px-4 text-muted-foreground italic">
              {summaryMutation.data.summary}
            </p>
          </div>
        )}

        {summaryMutation.error && (
          <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg mb-6">
            <p className="text-red-400">
              Erro ao gerar resumo: {summaryMutation.error.message}
            </p>
          </div>
        )}

        {/* Resto do componente */}
        <div className="mb-8">
          <QuestionForm roomId={params.roomId} />
        </div>

        <QuestionList roomId={params.roomId} />
      </div>
    </div>
  );
};
