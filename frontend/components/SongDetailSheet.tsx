import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  View,
  Animated,
} from "react-native";
import { useMusic } from "@/context/MusicContext";
import { useEffect, useRef } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { usePlayer } from "@/context/AudioPlayerContext";

type SongDetailsSheetProps = {
  onClose?: () => void;
};

const SongDetailsSheet = ({ onClose }: SongDetailsSheetProps) => {
  const { song } = useMusic();
  const { setAudioSource, isPlaying, playSong } = usePlayer();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const audioSource = song?.downloadUrl[song.downloadUrl.length - 1].url ?? "";

  // ← NEW: only update the provider when audioSource changes,
  //     after the component has rendered
  useEffect(() => {
    if (audioSource) {
      setAudioSource(audioSource);
    }
  }, [audioSource, setAudioSource]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  if (!song) return null;

  return (
    <BottomSheetView style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
          width: "100%",
        }}
      >
        {/* Close button at the top right */}
        <View style={styles.header}>
          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Ionicons name="chevron-down" size={28} color="#fff" />
          </Pressable>
        </View>

        <Image
          source={{ uri: song.image[song.image.length - 1].url }}
          style={styles.coverImage}
        />
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.name}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artists.primary.map((artist) => artist.name).join(", ")}
        </Text>
        <Pressable onPress={playSong} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={60}
            color="#1DB954"
          />
        </Pressable>
      </Animated.View>
    </BottomSheetView>
  );
};

export default SongDetailsSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    zIndex: 1000,
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  closeButton: {
    padding: 5,
  },
  coverImage: {
    width: 300,
    height: 300,
    borderRadius: 16,
    marginBottom: 24,
  },
  songTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
  },
  artist: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 4,
    marginBottom: 30,
    textAlign: "center",
  },
  playButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
