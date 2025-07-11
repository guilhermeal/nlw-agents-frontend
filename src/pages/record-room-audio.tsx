import { Button } from "@/components/ui/button";
import { CirclePause, Radio } from "lucide-react";
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
  const recorder = useRef<MediaRecorder | null>(null);

  const stopRecording = () => {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }
  };

  const uploadAudio = async (audio: Blob) => {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    const response = await fetch(
      `http://localhost:333/rooms/${params.roomId}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    console.log(result);
  };

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
          Pausar gravação
        </Button>
      ) : (
        <Button onClick={startRecording} className="cursor-pointer">
          <Radio className="size-4" />
          Gravar áudio
        </Button>
      )}
      {isRecording ? <div>Gravando seu áudio...</div> : <div>Pausado</div>}
    </div>
  );
};
