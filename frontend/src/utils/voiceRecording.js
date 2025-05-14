let mediaRecorder;
let audioChunks = [];

export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      audioChunks.push(e.data);
    }
  };

  mediaRecorder.start();
  console.log("🎤 Recording started");
}

export async function stopRecording() {
  return new Promise((resolve) => {
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

      // Prepare FormData
      const formData = new FormData();
      formData.append("file", audioBlob, "speech.wav");

      try {
        const res = await fetch("http://localhost:5000/transcribe", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log("📝 Transcription:", data.transcription);

        // You can do more here: e.g., set state or show it in the UI
        resolve(data.transcription);
      } catch (error) {
        console.error("❌ Transcription failed:", error);
        resolve(null);
      }
    };

    mediaRecorder.stop();
    console.log("🛑 Recording stopped");
  });
}
