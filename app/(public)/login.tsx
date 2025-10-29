import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text style={text}>Login Screen</Text>
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
