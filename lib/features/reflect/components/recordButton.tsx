import React from "react";

import { Alert, Pressable, View } from "react-native";

import AppText from "@/components/ui/appText";
import { useRecording } from "@/features/recording/hooks/useRecording";

const RecordButton = () => {
  const { isRecording, startRecording, stopRecording } = useRecording();

  async function handleRecord() {
    if (isRecording) {
      await stopRecording();
      return Alert.alert("Recording stopped");
    } else {
      await startRecording();
      return Alert.alert("Recording started");
    }
  }
  async function handleStop() {
    if (isRecording) {
      await stopRecording();
      return Alert.alert("Recording stopped");
    }
  }
  return (
    <View className="mx-auto mt-8 flex flex-row gap-4">
      <Pressable onPress={handleRecord} className="bg-red-400 p-2">
        <AppText>Record</AppText>
      </Pressable>
      <Pressable onPress={handleStop} className="bg-slate-400 p-2">
        <AppText>Stop</AppText>
      </Pressable>
    </View>
  );
};

export default RecordButton;
