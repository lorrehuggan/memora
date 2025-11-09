import React from "react";
import { View } from "react-native";

interface AudioWaveformProps {
  amplitudes: number[];
  isRecording: boolean;
}

/**
 * AudioWaveform component displays a real-time audio waveform visualization
 * during recording. Shows 20 vertical bars that represent audio amplitude levels.
 *
 * @param amplitudes - Array of normalized amplitude values (0-1)
 * @param isRecording - Whether recording is currently active
 */
const AudioWaveform: React.FC<AudioWaveformProps> = ({ amplitudes, isRecording }) => {
  // Don't render if there are no amplitudes
  if (amplitudes.length === 0) return null;

  // Ensure we always have 20 bars by padding with zeros if needed
  const bars = Array.from({ length: 20 }, (_, i) => amplitudes[i] || 0);

  return (
    <View
      className={`flex flex-row items-center justify-center gap-1 h-24 ${
        isRecording ? "opacity-100" : "opacity-50"
      }`}
    >
      {bars.map((amplitude, index) => {
        // Calculate height: minimum 10px, maximum 80px based on amplitude (0-1)
        const height = Math.max(10, amplitude * 80);

        return (
          <View
            key={index}
            className="w-1 bg-black rounded-full"
            style={{ height }}
          />
        );
      })}
    </View>
  );
};

export default React.memo(AudioWaveform);
