import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useAudioPlayer } from "expo-audio";
import { Ionicons } from "@expo/vector-icons";

export default function MiniPlayer({
  onOpen,
  song,
}: {
  onOpen: () => void;
  song: Song;
}) {
  const audioSource = song.downloadUrl[song.downloadUrl.length - 1].url;
  const player = useAudioPlayer(audioSource);

  const isPlaying = player.playing;

  return (
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
          isPlaying ? player.pause() : player.play();
        }}
      >
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={28}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#121212",
    padding: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#282828",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
