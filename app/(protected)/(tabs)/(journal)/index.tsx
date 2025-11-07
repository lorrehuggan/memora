import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "@/components/ui/appText";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/lib/Provider";
import { logout } from "@/utils/index";

export default function IndexScreen() {
  const { session, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Journal</Text>
        <Button variant="ghost" onPress={logout}>
          <Text>Logout</Text>
        </Button>
        <AppText>{session?.user.name}</AppText>
      </View>
    </SafeAreaView>
  );
}
