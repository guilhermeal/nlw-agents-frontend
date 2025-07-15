import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiUrl, env } from "@/env";
import { formatTime } from "@/utils/format-date-time";
import { ArrowLeft, CirclePause, LoaderCircle, Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  roomId: string;
};

export const RecordRoomAudio = () => {
  const params = useParams<RoomParams>();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    if (!isRecordingSupported) {
      alert("Navegador não suportado!");
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();
      createRecorder(audio);
    }, 10000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const createRecorder = (audio: MediaStream) => {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.start();
  };

  const uploadAudio = async (audio: Blob) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("file", audio, "audio.webm");

      await fetch(`${apiUrl}/rooms/${params.roomId}/audio`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${env.VITE_API_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link to={`/room/${params.roomId}`}>
              <Button variant="outline" className="cursor-pointer">
                <ArrowLeft className="mr-2 size-4" />
                Voltar para sala
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Studio de gravação
          </h1>
          <p className="text-muted-foreground">
            Use o botão abaixo para Iniciar e Parar a gravação do áudio da aula
          </p>

          <div className="flex flex-col items-center justify-center gap-3 mt-[50%]">
            {isRecording ? (
              <Button
                onClick={stopRecording}
                className="cursor-pointer bg-red-600 hover:bg-zinc-500  text-zinc-100"
              >
                <CirclePause className="size-4" />
                Clique para finalizar a gravação
                <Badge variant="default" className="font-mono">
                  <Mic className="size-8 animate-ping mr-1" color="#ff0000" />
                  {formatTime(recordingTime)}
                </Badge>
              </Button>
            ) : (
              <Button
                onClick={startRecording}
                disabled={isLoading}
                className="cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    <p className="animate-pulse">Processando...</p>
                  </>
                ) : (
                  <>
                    <Mic className="size-4" />
                    Iniciar gravação de áudio
                  </>
                )}
              </Button>
            )}

            {isRecording && (
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  Gravando seu áudio...
                </div>
              </div>
            )}

            {isLoading && !isRecording && (
              <div className="text-sm text-muted-foreground">
                Por favor, aguarde...
              </div>
            )}

            {!isRecording && !isLoading && (
              <div className="text-sm text-muted-foreground">Pausado</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
