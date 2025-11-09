import { Tabs } from "expo-router";

import { BookOpen, Cookie, MessageSquare, Sparkles } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="(reflect)">
      <Tabs.Screen
        name="(reflect)"
        options={{
          title: "Reflect",
          headerShown: false,
          tabBarIcon: () => <Sparkles />,
        }}
      />
      <Tabs.Screen
        name="(journal)"
        options={{
          title: "Journal",
          headerShown: false,
          tabBarIcon: () => <BookOpen />,
        }}
      />
      <Tabs.Screen
        name="(ask)"
        options={{
          title: "Ask",
          headerShown: false,
          tabBarIcon: () => <MessageSquare />,
        }}
      />
      <Tabs.Screen
        name="(digest)"
        options={{
          title: "Digest",
          headerShown: false,
          tabBarIcon: () => <Cookie />,
        }}
      />
    </Tabs>
  );
}
