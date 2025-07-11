import { Button } from "@/components/ui/button";
import { CirclePause, LoaderCircle, Radio } from "lucide-react";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

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
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

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

      createRecorder(audio)
    }, 10000);
  };

  const stopRecording = () => {
    setIsRecording(false);

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
        console.log(event.data);
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravacao iniciada...");
    };

    recorder.current.onstop = () => {
      console.log("Gravacao pausada...");
    };

    recorder.current.start();
  };

  const uploadAudio = async (audio: Blob) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("file", audio, "audio.webm");

      await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
        method: "POST",
        body: formData,
      });

      // const result = await response.json();

      // console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button
          onClick={stopRecording}
          className="cursor-pointer bg-red-600 animate-pulse text-zinc-100"
        >
          <CirclePause className="size-4" />
          Clique para finalizar a gravação
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
              <p className={isLoading && "animate-pulse"}>Processando...</p>
            </>
          ) : (
            <>
              <Radio className="size-4" />
              Iniciar gravação de áudio
            </>
          )}
        </Button>
      )}
      {isLoading ? (
        <div>Por favor, aguarde...</div>
      ) : isRecording ? (
        <div>Gravando seu áudio...</div>
      ) : (
        <div>Pausado</div>
      )}
    </div>
  );
};
