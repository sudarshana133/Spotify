import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMusic } from "@/context/MusicContext";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, { useRef, useMemo } from "react";
import MiniPlayer from "@/components/MiniPlayer";
import SongDetailsSheet from "@/components/SongDetailSheet";

export default function AuthenticatedLayout() {
  const { song } = useMusic();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["45%", "90%"], []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        {song !== null && (
          <MiniPlayer
            onOpen={() => bottomSheetRef.current?.present()}
            song={song}
          />
        )}

        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#121212" }}
          handleIndicatorStyle={{ backgroundColor: "#888" }}
        >
          <SongDetailsSheet />
        </BottomSheetModal>

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "black",
              borderTopColor: "#222",
            },
            tabBarActiveTintColor: "#1DB954",
            tabBarInactiveTintColor: "#888",
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="home" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="search" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="library"
            options={{
              title: "Your Library",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="book" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen name="playlist" options={{ href: null }} />
        </Tabs>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}
