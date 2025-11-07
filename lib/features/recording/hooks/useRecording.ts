import { useCallback, useEffect, useState } from "react";

import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";

export interface RecordingHookState {
  isRecording: boolean;
  duration: number;
  fileUri: string | null;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  reset: () => void;
}

export function useRecording(): RecordingHookState {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  // Update duration when recording
  useEffect(() => {
    if (recorderState.isRecording) {
      const timer = setInterval(() => {
        setDuration(recorderState.durationMillis || 0);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [recorderState.isRecording, recorderState.durationMillis]);

  const startRecording = useCallback(async () => {
    try {
      setError(null);

      // Request permission
      const { status } = await requestRecordingPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Recording permission required");
      }

      // Set audio mode
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      // Start recording
      await audioRecorder.prepareToRecordAsync(RecordingPresets.HIGH_QUALITY);
      audioRecorder.record();
      setIsRecording(true);
      setDuration(0);
      setFileUri(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to start recording";
      setError(message);
      throw new Error(message);
    }
  }, [audioRecorder]);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    try {
      if (!audioRecorder || !recorderState.isRecording) {
        return null;
      }

      await audioRecorder.stop();
      const uri = audioRecorder.uri;

      setIsRecording(false);
      setFileUri(uri || null);

      // Reset audio mode
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: false,
      });

      return uri || null;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to stop recording";
      setError(message);
      setIsRecording(false);
      throw new Error(message);
    }
  }, [audioRecorder, recorderState.isRecording]);

  const reset = useCallback(() => {
    setDuration(0);
    setFileUri(null);
    setError(null);
  }, []);

  return {
    isRecording,
    duration,
    fileUri,
    error,
    startRecording,
    stopRecording,
    reset,
  };
}
