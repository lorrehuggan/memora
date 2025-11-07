import { create } from "zustand";

type RecordingStatus = "recording" | "paused" | "stopped" | "error" | "uploading" | "inactive";

interface RecordingActions {
  startRecording: () => void;
  pauseRecording: () => void;
  stopRecording: () => void;
  uploadRecording: () => void;
  errorRecording: () => void;
  inactiveRecording: () => void;
}
interface RecordingState {
  recording: RecordingStatus;
  actions: RecordingActions;
}

const useRecordingStore = create<RecordingState>(set => ({
  recording: "inactive",
  actions: {
    startRecording: () => set({ recording: "recording" }),
    pauseRecording: () => set({ recording: "paused" }),
    stopRecording: () => set({ recording: "stopped" }),
    uploadRecording: () => set({ recording: "uploading" }),
    errorRecording: () => set({ recording: "error" }),
    inactiveRecording: () => set({ recording: "inactive" }),
  },
}));

export const useRecordingState = () => useRecordingStore(state => state.recording);
export const useRecordingActions = () => useRecordingStore(state => state.actions);
