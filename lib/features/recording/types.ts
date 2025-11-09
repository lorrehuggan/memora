export type RecordingState =
  | "recording"
  | "paused"
  | "stopped"
  | "uploading"
  | "inactive"
  | "reviewing"
  | "adding-metadata";

export interface WaveformData {
  amplitudes: number[]; // Array of normalized values (0-1)
  maxBars: number; // Fixed at 20
}

export type AudioMeteringData = {
  level: number;
  timestamp: number;
};
