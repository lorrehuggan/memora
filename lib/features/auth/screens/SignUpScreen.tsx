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
import { type SignUpForm, signUpSchema } from "@/utils/schemas/auth";

import { authClient } from "../lib/client";

export default function SignUpScreen() {
  const [loading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: arktypeResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const watchedPassword = watch("password");

  const onSubmit = async (data: SignUpForm) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const { email, password, name } = data;

      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        Alert.alert("Sign Up Error", result.error.message || "Failed to create account");
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
                {t("auth:sign_up_message")}{" "}
              </AppText>
            </View>
            {/* Header */}

            {/* Form */}
            <View className="mb-6">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="mb-4"
                    placeholder={t("auth:enter_name")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    autoComplete="name"
                    textContentType="name"
                  />
                )}
              />

              {errors.name && (
                <AppText className="mb-2 text-xs text-destructive">{errors.name.message}</AppText>
              )}

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="mb-4"
                    placeholder={t("auth:enter_email")}
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
                    placeholder={t("auth:enter_password")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoComplete="new-password"
                    textContentType="newPassword"
                  />
                )}
              />

              {errors.password && (
                <AppText className="mb-2 text-xs text-destructive">
                  {errors.password.message}
                </AppText>
              )}

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="mb-4"
                    placeholder={t("auth:confirm_password")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoComplete="new-password"
                    textContentType="newPassword"
                  />
                )}
              />

              {errors.confirmPassword && (
                <AppText className="mb-2 text-xs text-destructive">
                  {errors.confirmPassword.message}
                </AppText>
              )}

              {watchedPassword && watchedPassword.length > 0 && (
                <View className="mb-4">
                  <AppText className="text-xs text-gray-600">
                    Password must be at least 7 characters long
                  </AppText>
                </View>
              )}

              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                <AppText className="text-background">{t("login:create_account")}</AppText>
              </Button>
            </View>

            {/* Footer */}
            <View className="items-center">
              <View className="flex-row items-center">
                <View className="h-px flex-1 bg-gray-300" />
                <AppText className="mx-4 text-sm text-gray-500">OR</AppText>
                <View className="h-px flex-1 bg-gray-300" />
              </View>
              <AppText className="text-sm text-gray-600">
                {t("auth:have_account")}{" "}
                <Link href="/login" asChild>
                  <AppTextBold className="font-semibold text-indigo-700">
                    {t("auth:sign_in")}
                  </AppTextBold>
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
