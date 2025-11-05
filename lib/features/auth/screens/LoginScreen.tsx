import { useState } from "react";

import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { Link } from "expo-router";

import { arktypeResolver } from "@hookform/resolvers/arktype";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import AppText from "@/components/ui/appText";
import AppTextBold from "@/components/ui/appTextBold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SafeView from "@/components/ui/safeView";
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
          <View className="flex-1 justify-center">
            {/* Header */}
            <View className="mb-8 items-center">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <AppText>M</AppText>
              </View>
              <AppTextBold className="text-brand tracking-tightest mb-2 text-3xl font-bold">
                {t("common:app_name")}
              </AppTextBold>
              <AppText className="text-center text-base text-gray-600">
                {t("auth:sign_in_message")}{" "}
              </AppText>
            </View>
            {/* Header */}
            {/* Form */}
            <View className="mb-6">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="mb-4"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="emailAddress"
                  />
                )}
              />

              {errors.email && (
                <AppText className="mb-2 text-xs text-destructive">{errors.email.message}</AppText>
              )}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="mb-4"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoComplete="password"
                    textContentType="password"
                  />
                )}
              />
              {errors.password && (
                <AppText className="mb-2 text-xs text-destructive">
                  {errors.password.message}
                </AppText>
              )}

              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                <AppText className="text-background">Login</AppText>
              </Button>
            </View>

            {/* Footer */}
            <View className="items-center">
              <AppText className="text-sm text-gray-600">Forgot your password?</AppText>
              <View className="flex-row items-center">
                <View className="h-px flex-1 bg-gray-300" />
                <AppText className="mx-4 text-sm text-gray-500">OR</AppText>
                <View className="h-px flex-1 bg-gray-300" />
              </View>
              <AppText className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" asChild>
                  <AppTextBold className="font-semibold text-indigo-700">Sign Up</AppTextBold>
                </Link>
              </AppText>
            </View>
            {/* Form */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
}
