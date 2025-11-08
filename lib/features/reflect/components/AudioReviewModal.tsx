import { useEffect } from "react";

import { Modal, Pressable, View } from "react-native";

import * as Haptics from "expo-haptics";

import { ArrowRight, Pause, Play, RotateCcw, X } from "lucide-react-native";

import AppText from "@/components/ui/appText";
import AppTextBold from "@/components/ui/appTextBold";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAudioPlayback } from "@/features/reflect/hooks/useAudioPlayback";
import { millisecondsToTime } from "@/utils/index";

interface AudioReviewModalProps {
  visible: boolean;
  fileUri: string | null;
  duration: number;
  onContinue: () => void;
  onReRecord: () => void;
  onCancel: () => void;
}

export default function AudioReviewModal({
  visible,
  fileUri,
  duration,
  onContinue,
  onReRecord,
  onCancel,
}: AudioReviewModalProps) {
  const { playing, play, pause, position, duration: playbackDuration } = useAudioPlayback(fileUri);

  // Calculate progress percentage
  const progress = playbackDuration > 0 ? (position / playbackDuration) * 100 : 0;

  useEffect(() => {
    // Cleanup when modal closes
    if (!visible && playing) {
      pause();
    }
  }, [visible, playing, pause]);

  const handlePlayPause = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (playing) {
      pause();
    } else {
      await play();
    }
  };

  const handleReRecord = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onReRecord();
  };

  const handleCancel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCancel();
  };

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onContinue();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      {/* Backdrop */}
      <Pressable className="flex-1 bg-black/50" onPress={onCancel}>
        {/* Modal Content */}
        <View className="flex-1 items-center justify-center px-6">
          <Pressable
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
            onPress={e => e.stopPropagation()}
          >
            {/* Header */}
            <View className="mb-6 flex-row items-center justify-between">
              <AppTextBold className="text-xl">Review Recording</AppTextBold>
              <Pressable onPress={handleCancel} className="rounded-full p-2">
                <X size={24} strokeWidth={2} className="text-gray-600 dark:text-gray-300" />
              </Pressable>
            </View>

            {/* Duration Display */}
            <View className="mb-8 items-center">
              <AppText className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Recording Duration
              </AppText>
              <AppTextBold className="text-4xl">{millisecondsToTime(duration)}</AppTextBold>
            </View>

            {/* Progress Bar */}
            <View className="mb-4">
              <View className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <View
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${progress}%` }}
                />
              </View>
              <View className="mt-2 flex-row justify-between">
                <AppText className="text-xs text-gray-500 dark:text-gray-400">
                  {millisecondsToTime(position * 1000)}
                </AppText>
                <AppText className="text-xs text-gray-500 dark:text-gray-400">
                  {millisecondsToTime(playbackDuration * 1000 || duration)}
                </AppText>
              </View>
            </View>

            {/* Play/Pause Button */}
            <View className="mb-8 items-center">
              <Pressable
                onPress={handlePlayPause}
                className="rounded-full bg-blue-500 p-4 active:bg-blue-600"
              >
                {playing ? (
                  <Pause size={32} strokeWidth={2} className="text-white" />
                ) : (
                  <Play size={32} strokeWidth={2} className="text-white" />
                )}
              </Pressable>
            </View>

            {/* Action Buttons */}
            <View className="gap-3">
              {/* Continue Button */}
              <Button onPress={handleContinue} variant="default" size="lg" className="w-full">
                <Text>Continue</Text>
                <ArrowRight size={20} strokeWidth={2} className="text-white" />
              </Button>

              {/* Re-record Button */}
              <Button onPress={handleReRecord} variant="outline" size="lg" className="w-full">
                <RotateCcw size={20} strokeWidth={2} />
                <Text>Re-record</Text>
              </Button>

              {/* Cancel Button */}
              <Button onPress={handleCancel} variant="ghost" size="lg" className="w-full">
                <Text>Cancel</Text>
              </Button>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
