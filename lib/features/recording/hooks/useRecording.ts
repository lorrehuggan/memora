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
  amplitudes: number[];
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  reset: () => void;
}

export function useRecording(): RecordingHookState {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [amplitudes, setAmplitudes] = useState<number[]>([]);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  // Normalize amplitude from dB range (-160 to 0) to 0-1 range
  const normalizeAmplitude = (dbValue: number | undefined): number => {
    if (dbValue === undefined || dbValue === null) return 0;
    // Clamp between -160 and 0 dB, then normalize to 0-1
    const clamped = Math.max(-160, Math.min(0, dbValue));
    return (clamped + 160) / 160;
  };

  // Update duration and capture audio levels when recording
  useEffect(() => {
    if (recorderState.isRecording) {
      const timer = setInterval(() => {
        setDuration(recorderState.durationMillis || 0);

        // Capture audio metering data
        const status = audioRecorder.getStatus();
        if (status.metering !== undefined) {
          const normalizedLevel = normalizeAmplitude(status.metering);
          // Keep only last 20 amplitude values (rolling window)
          setAmplitudes(prev => [...prev, normalizedLevel].slice(-20));
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [recorderState.isRecording, recorderState.durationMillis, audioRecorder]);

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

      // Start recording with metering enabled
      await audioRecorder.prepareToRecordAsync({
        ...RecordingPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      });
      audioRecorder.record();
      setIsRecording(true);
      setDuration(0);
      setFileUri(null);
      setAmplitudes([]);
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
    setAmplitudes([]);
  }, []);

  return {
    isRecording,
    duration,
    fileUri,
    error,
    amplitudes,
    startRecording,
    stopRecording,
    reset,
  };
}
