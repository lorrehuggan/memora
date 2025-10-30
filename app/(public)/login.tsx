import { StyleSheet, Text, View } from "react-native";

import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <View>
        <Text style={text}>{t("common:login")}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
});

const text = StyleSheet.compose(styles.text, {
  fontSize: 30,
  color: "blue",
  margin: "auto",
});
