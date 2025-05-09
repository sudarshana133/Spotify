import { AudioProvider } from "@/context/AudioPlayerContext";
import { MusicProvider } from "@/context/MusicContext";
import { Slot } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AudioProvider>
      <MusicProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
      </MusicProvider>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
