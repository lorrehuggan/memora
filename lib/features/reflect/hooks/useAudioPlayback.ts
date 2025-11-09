import { useCallback, useEffect, useState } from "react";

import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

export interface AudioPlaybackHookState {
  playing: boolean;
  play: () => Promise<void>;
  pause: () => void;
  position: number;
  duration: number;
  error: string | null;
}

export function useAudioPlayback(fileUri: string | null): AudioPlaybackHookState {
  const [error, setError] = useState<string | null>(null);

  const audioPlayer = useAudioPlayer(fileUri || "");
  const playerState = useAudioPlayerStatus(audioPlayer);

  // Update position during playback
  useEffect(() => {
    if (playerState.playing) {
      const timer = setInterval(() => {
        // Force re-render to update position
      }, 100);
      return () => clearInterval(timer);
    }
  }, [playerState.playing]);

  const play = useCallback(async () => {
    try {
      setError(null);
      if (!fileUri) {
        throw new Error("No audio file to play");
      }
      audioPlayer.play();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to play audio";
      setError(message);
      throw new Error(message);
    }
  }, [audioPlayer, fileUri]);

  const pause = useCallback(() => {
    try {
      setError(null);
      audioPlayer.pause();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to pause audio";
      setError(message);
    }
  }, [audioPlayer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        audioPlayer.pause();
      } catch {
        // Ignore errors during cleanup
      }
    };
  }, [audioPlayer]);

  return {
    playing: playerState.playing,
    play,
    pause,
    position: playerState.currentTime || 0,
    duration: playerState.duration || 0,
    error,
  };
}
