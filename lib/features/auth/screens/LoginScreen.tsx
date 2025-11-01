import { useState } from "react";

import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

import { arktypeResolver } from "@hookform/resolvers/arktype";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import SafeView from "@/components/ui/SafeView";
import { type LoginForm, loginSchema } from "@/utils/schemas/auth";

import { authClient } from "../lib/client";

export default function LoginScreen() {
  const [loading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: arktypeResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      const { email, password } = data;

      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        Alert.alert("Sign In Error", result.error.message || "Failed to sign in");
      } else {
        // Navigation will be handled by your auth state management
        Alert.alert("Success", "Signed in successfully!");
      }
    } catch {
      // Log error for debugging
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center px-6 py-12">
            {/* Header */}
            <View className="mb-10 items-center">
              <View className="mb-6 h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Text className="text-2xl font-bold text-blue-600">P</Text>
              </View>
              <Text className="text-brand mb-2 text-3xl font-bold">Welcome back</Text>
              <Text className="text-center text-base text-gray-600">
                Sign in to your account to continue
              </Text>
            </View>
            {/* Header */}
            {/* Form */}
            <View className="mb-6">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="emailAddress"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    secureTextEntry
                    autoComplete="password"
                    textContentType="password"
                  />
                )}
              />

              <Button
                title="Sign In"
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
                disabled={isLoading}
                className="w-full"
                size="lg"
              />
            </View>

            {/* Footer */}
            <View className="items-center space-y-4">
              <Text className="text-sm text-gray-600">Forgot your password?</Text>
              <View className="flex-row items-center">
                <View className="h-px flex-1 bg-gray-300" />
                <Text className="mx-4 text-sm text-gray-500">OR</Text>
                <View className="h-px flex-1 bg-gray-300" />
              </View>
              <Text className="text-sm text-gray-600">
                Don't have an account? <Text className="font-semibold text-blue-600">Sign Up</Text>
              </Text>
            </View>
            {/* Form */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
}
