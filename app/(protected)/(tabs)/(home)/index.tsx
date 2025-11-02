import { Alert, Text, View } from "react-native";

import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/lib/client";

export default function IndexScreen() {
  const logout = async () => {
    const { data, error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          "Content-Type": "application/json",
          Origin: "http://192.168.1.88:8081",
        },
      },
    });
    if (data?.success) {
      Alert.alert(data.success === true ? "Logout successful" : "Logout failed");
      return router.replace("/login");
    } else if (error) {
      Alert.alert(`Logout failed ${error.message}`);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Hello, World!</Text>
        <Button variant="ghost" onPress={logout}>
          <Text>Logout</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
