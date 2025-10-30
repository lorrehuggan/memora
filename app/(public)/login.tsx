import { Text } from "react-native";

import { useTranslation } from "react-i18next";

import SafeView from "@/components/ui/SafeView";

export default function LoginScreen() {
  const { t } = useTranslation();

  return (
    <SafeView>
      <Text className="text-orange-400">{t("common:login")}</Text>
    </SafeView>
  );
}
