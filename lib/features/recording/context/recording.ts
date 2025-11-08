import { create } from "zustand";

type RecordingStatus = "recording" | "paused" | "stopped" | "error" | "uploading" | "inactive";

interface RecordingActions {
  setStartRecording: () => void;
  setPauseRecording: () => void;
  setStopRecording: () => void;
  setUploadRecording: () => void;
  setErrorRecording: () => void;
  setInactiveRecording: () => void;
}
interface RecordingState {
  recording: RecordingStatus;
  actions: RecordingActions;
}

const useRecordingStore = create<RecordingState>(set => ({
  recording: "inactive",
  actions: {
    setStartRecording: () => set({ recording: "recording" }),
    setPauseRecording: () => set({ recording: "paused" }),
    setStopRecording: () => set({ recording: "stopped" }),
    setUploadRecording: () => set({ recording: "uploading" }),
    setErrorRecording: () => set({ recording: "error" }),
    setInactiveRecording: () => set({ recording: "inactive" }),
  },
}));

export const useRecordingState = () => useRecordingStore(state => state.recording);
export const useRecordingActions = () => useRecordingStore(state => state.actions);
