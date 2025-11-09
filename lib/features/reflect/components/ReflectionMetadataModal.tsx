import { Modal, Pressable, View, TextInput, ActivityIndicator } from "react-native";

import * as Haptics from "expo-haptics";

import { Controller, useForm } from "react-hook-form";

import AppText from "@/components/ui/appText";
import AppTextBold from "@/components/ui/appTextBold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import type { ReflectionMetadata } from "@/features/reflect/types";

interface ReflectionMetadataModalProps {
  visible: boolean;
  onSubmit: (metadata: ReflectionMetadata) => void;
  onCancel: () => void;
  isUploading: boolean;
}

export default function ReflectionMetadataModal({
  visible,
  onSubmit,
  onCancel,
  isUploading,
}: ReflectionMetadataModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReflectionMetadata>({
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  const handleCancel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    reset();
    onCancel();
  };

  const handleFormSubmit = handleSubmit((data) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSubmit(data);
  });

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleCancel}>
      {/* Backdrop */}
      <Pressable className="flex-1 bg-black/50" onPress={isUploading ? undefined : handleCancel}>
        {/* Modal Content */}
        <View className="flex-1 items-center justify-center px-6">
          <Pressable
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View className="mb-6">
              <AppTextBold className="text-xl">Add Details</AppTextBold>
              <AppText className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Add information about your reflection
              </AppText>
            </View>

            {/* Form */}
            <View className="gap-4">
              {/* Title Field */}
              <View>
                <AppText className="mb-2 text-sm font-medium">
                  Title <AppText className="text-red-500">*</AppText>
                </AppText>
                <Controller
                  control={control}
                  name="title"
                  rules={{
                    required: "Title is required",
                    minLength: {
                      value: 1,
                      message: "Title must not be empty",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Enter a title for your reflection"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={!isUploading}
                      className={errors.title ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.title && (
                  <AppText className="mt-1 text-xs text-red-500">{errors.title.message}</AppText>
                )}
              </View>

              {/* Description Field */}
              <View>
                <AppText className="mb-2 text-sm font-medium">Description</AppText>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Add a description (optional)"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={!isUploading}
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                      className="dark:bg-input/30 border-input bg-background text-foreground min-h-24 w-full rounded-md border px-3 py-2 text-base shadow-sm shadow-black/5"
                    />
                  )}
                />
              </View>

              {/* Tags Field */}
              <View>
                <AppText className="mb-2 text-sm font-medium">Tags</AppText>
                <Controller
                  control={control}
                  name="tags"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Add tags separated by commas (optional)"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={!isUploading}
                    />
                  )}
                />
                <AppText className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Example: work, meeting, ideas
                </AppText>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="mt-6 gap-3">
              {/* Submit Button */}
              <Button
                onPress={handleFormSubmit}
                variant="default"
                size="lg"
                className="w-full"
                disabled={isUploading}
              >
                {isUploading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text>Submit</Text>
                )}
              </Button>

              {/* Cancel Button */}
              <Button
                onPress={handleCancel}
                variant="ghost"
                size="lg"
                className="w-full"
                disabled={isUploading}
              >
                <Text>Cancel</Text>
              </Button>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
