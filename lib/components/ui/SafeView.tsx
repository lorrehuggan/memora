import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeView({ ...rest }) {
  return <SafeAreaView className="h-screen bg-neutral-900 p-6" {...rest} />;
}
