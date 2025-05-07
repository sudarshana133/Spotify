import { SafeAreaView, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

function _layout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex items-center justify-center h-screen bg-black">
        <Text className="text-xl text-emerald-500">Hello World!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default _layout;
