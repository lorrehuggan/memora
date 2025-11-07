import { useState } from "react";

import { Alert, View } from "react-native";

import { Mic } from "lucide-react-native";
import { useForm } from "react-hook-form";

import AppText from "@/components/ui/appText";
import AppTextBold from "@/components/ui/appTextBold";
import SafeView from "@/components/ui/safeView";
import { useRecording } from "@/features/recording/hooks/useRecording";
import type { RecordingState } from "@/features/recording/types";
import { useAudioUpload } from "@/features/reflect/hooks/useReflections";
import type { ReflectionMetadata } from "@/features/reflect/types";

export default function ReflectScreen() {
  const [recordingState, setRecordingState] = useState<RecordingState>("inactive");
  const [savedMetadata, setSavedMetadata] = useState<ReflectionMetadata | undefined>();

  const {
    isRecording,
    duration,
    fileUri,
    error: recordingError,
    startRecording,
    stopRecording,
    reset,
  } = useRecording();
  const uploadMutation = useAudioUpload();

  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<ReflectionMetadata>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleMetadataSubmit = handleSubmit(async (metadata: ReflectionMetadata) => {
    setSavedMetadata(metadata);
    setRecordingState("inactive");
  });

  const handleStartRecording = async () => {
    try {
      await startRecording();
      setRecordingState("recording");
    } catch (err) {
      Alert.alert("Error", err instanceof Error ? err.message : "Failed to start recording");
    }
  };

  const handleStopRecording = async () => {
    try {
      setRecordingState("uploading");
      const recordingUri = await stopRecording();

      if (recordingUri && !recordingError) {
        // Upload the recording with metadata
        await uploadMutation.mutateAsync({
          fileUri: recordingUri,
          metadata: savedMetadata,
        });

        Alert.alert("Success", "Recording uploaded successfully!");
        handleReset();
      }
    } catch (err) {
      Alert.alert(
        "Error",
        err instanceof Error ? err.message : "Failed to stop recording or upload"
      );
      setRecordingState("recording");
    }
  };

  const handleReset = () => {
    reset();
    resetForm();
    setSavedMetadata(undefined);
    setRecordingState("inactive");
  };

  return (
    <SafeView className="relative">
      <View className="flex h-full justify-between pb-14">
        <View className="mx-auto flex justify-between">
          <AppText className="mx-auto flex pb-3 pt-4 capitalize">
            {recordingState === "inactive" ? "Start new recording" : recordingState}
          </AppText>
          <AppTextBold className="p-1 text-6xl">00:32:05</AppTextBold>
        </View>
        <View className="mx-auto rounded-full border-2 border-black bg-violet-600/10 p-16">
          <Mic size={80} strokeWidth={1.5} />
        </View>
        <View className="mx-auto w-full rounded-2xl bg-black/10 p-16"></View>
      </View>
    </SafeView>
  );
}
