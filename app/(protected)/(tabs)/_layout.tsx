import { Tabs } from "expo-router";

import { Home } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => <Home size={16} color="grey" />,
        }}
      />
    </Tabs>
  );
}
