import { Tabs } from "expo-router";
import { SafeAreaView, View, Animated } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMusic } from "@/context/MusicContext";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
} from "react";
import MiniPlayer from "@/components/MiniPlayer";
import SongDetailsSheet from "@/components/SongDetailSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AuthenticatedLayout() {
  const { song } = useMusic();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Animation value for mini player slide
  const slideAnimation = useRef(new Animated.Value(0)).current;

  // Handle the bottom sheet visibility changes
  const handleSheetChanges = useCallback(
    (index: number) => {
      const isVisible = index >= 0;
      setIsBottomSheetVisible(isVisible);

      // Animate the mini player
      Animated.timing(slideAnimation, {
        toValue: isVisible ? 1 : 0,
        duration: 300, // Match bottom sheet animation duration
        useNativeDriver: true,
      }).start();
    },
    [slideAnimation]
  );

  // Function to present the bottom sheet
  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  // Function to dismiss the bottom sheet
  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <View style={{ flex: 1 }}>
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

            {/* Show mini player with animation */}
            {song !== null && (
              <MiniPlayer
                onOpen={openBottomSheet}
                song={song}
                slideAnimation={slideAnimation}
              />
            )}
          </View>

          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: "#121212" }}
            handleIndicatorStyle={{ backgroundColor: "#888" }}
            onChange={handleSheetChanges}
            onDismiss={() => setIsBottomSheetVisible(false)}
          >
            <SongDetailsSheet onClose={closeBottomSheet} />
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
