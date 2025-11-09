import { useState } from "react";

import { Alert, Pressable, View } from "react-native";

import * as Haptics from "expo-haptics";

import clsx from "clsx";
import { Mic } from "lucide-react-native";

import AppText from "@/components/ui/appText";
import AppTextBold from "@/components/ui/appTextBold";
import SafeView from "@/components/ui/safeView";
import AudioWaveform from "@/features/recording/components/AudioWaveform";
import { useRecording } from "@/features/recording/hooks/useRecording";
import type { RecordingState } from "@/features/recording/types";
import AudioReviewModal from "@/features/reflect/components/AudioReviewModal";
import ReflectionMetadataModal from "@/features/reflect/components/ReflectionMetadataModal";
import { useAudioUpload } from "@/features/reflect/hooks/useReflections";
import type { ReflectionMetadata } from "@/features/reflect/types";
import { millisecondsToTime } from "@/utils/index";

export default function ReflectScreen() {
  const [recordingState, setRecordingState] = useState<RecordingState>("inactive");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showMetadataModal, setShowMetadataModal] = useState(false);

  const {
    duration,
    fileUri,
    error: recordingError,
    amplitudes,
    startRecording,
    stopRecording,
    reset,
  } = useRecording();
  const uploadMutation = useAudioUpload();

  const handleStartRecording = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await startRecording();
      setRecordingState("recording");
    } catch (err) {
      Alert.alert("Error", err instanceof Error ? err.message : "Failed to start recording");
    }
  };

  const handleStopRecording = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const recordingUri = await stopRecording();

      if (recordingUri && !recordingError) {
        // Check minimum duration (2 seconds = 2000ms)
        if (duration < 2000) {
          Alert.alert("Recording Too Short", "Please hold for at least 2 seconds.");
          handleReset();
          return;
        }

        // Open review modal
        setRecordingState("reviewing");
        setShowReviewModal(true);
      }
    } catch (err) {
      Alert.alert("Error", err instanceof Error ? err.message : "Failed to stop recording");
      setRecordingState("inactive");
    }
  };

  const handleContinueFromReview = () => {
    setShowReviewModal(false);
    setRecordingState("adding-metadata");
    setShowMetadataModal(true);
  };

  const handleReRecord = () => {
    setShowReviewModal(false);
    handleReset();
  };

  const handleCancelReview = () => {
    setShowReviewModal(false);
    handleReset();
  };

  const handleCancelMetadata = () => {
    setShowMetadataModal(false);
    setRecordingState("reviewing");
    setShowReviewModal(true);
  };

  const handleMetadataSubmit = async (metadata: ReflectionMetadata) => {
    try {
      setRecordingState("uploading");

      if (!fileUri) {
        throw new Error("No recording file found");
      }

      await uploadMutation.mutateAsync({
        fileUri,
        metadata,
      });

      Alert.alert("Success", "Recording uploaded successfully!");
      setShowMetadataModal(false);
      handleReset();
    } catch (err) {
      Alert.alert(
        "Upload Error",
        err instanceof Error ? err.message : "Failed to upload recording. Please try again."
      );
      setRecordingState("adding-metadata");
    }
  };

  const handleReset = () => {
    reset();
    setRecordingState("inactive");
    setShowReviewModal(false);
    setShowMetadataModal(false);
  };

  return (
    <SafeView className="relative">
      <View className="flex h-full justify-between pb-14">
        <View className="mx-auto flex justify-between">
          <AppText className="mx-auto flex pb-3 pt-4 capitalize">
            {recordingState === "inactive" ? "Start new recording" : recordingState}
          </AppText>
          <AppTextBold className="p-1 text-6xl">{millisecondsToTime(duration)}</AppTextBold>
        </View>
        <Pressable
          onPressIn={handleStartRecording}
          onPressOut={handleStopRecording}
          className={clsx("mx-auto rounded-full border-2 border-black p-16", {
            "bg-rose-600/10": recordingState === "recording",
            "bg-gray-200": recordingState === "inactive",
            "bg-yellow-500/10": recordingState === "uploading",
          })}
        >
          <Mic size={80} strokeWidth={1.5} />
        </Pressable>
        <View className="mx-auto w-full rounded-2xl p-16">
          {(recordingState === "recording" || recordingState === "reviewing") && (
            <AudioWaveform amplitudes={amplitudes} isRecording={recordingState === "recording"} />
          )}
        </View>
      </View>

      {/* Audio Review Modal */}
      <AudioReviewModal
        visible={showReviewModal}
        fileUri={fileUri}
        duration={duration}
        onContinue={handleContinueFromReview}
        onReRecord={handleReRecord}
        onCancel={handleCancelReview}
      />

      {/* Reflection Metadata Modal */}
      <ReflectionMetadataModal
        visible={showMetadataModal}
        onSubmit={handleMetadataSubmit}
        onCancel={handleCancelMetadata}
        isUploading={uploadMutation.isPending}
      />
    </SafeView>
  );
}
