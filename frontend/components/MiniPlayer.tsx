import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlayer } from "@/context/AudioPlayerContext";
import { useEffect } from "react";

export default function MiniPlayer({
  onOpen,
  song,
  slideAnimation,
}: {
  onOpen: () => void;
  song: Song;
  slideAnimation: Animated.Value;
}) {
  const { isPlaying, setAudioSource, playSong } = usePlayer();
  const audioSource = song.downloadUrl[song.downloadUrl.length - 1].url;

  useEffect(() => {
    setAudioSource(audioSource);
  }, [audioSource, setAudioSource]);

  // Calculate transform for sliding effect
  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Slide down by 100 units when sheet is visible
  });

  // Calculate opacity for fade effect
  const opacity = slideAnimation.interpolate({
    inputRange: [0, 0.8],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onOpen}
        activeOpacity={0.9}
        style={styles.container}
      >
        <Image
          source={{ uri: song.image[song.image.length - 1].url }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {song.name}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {song.artists.primary.map((a) => a.name).join(", ")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            playSong();
          }}
        >
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={32}
            color="#1DB954"
            style={styles.icon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    position: "absolute",
    bottom: 48, // Tab bar height approx
    left: 0,
    right: 0,
    zIndex: 10, // Make sure it's on top
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#121212",
    padding: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#282828",
    width: "100%",
  },

  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  artist: {
    color: "#b3b3b3",
    fontSize: 12,
  },
  icon: {
    paddingHorizontal: 8,
  },
});
