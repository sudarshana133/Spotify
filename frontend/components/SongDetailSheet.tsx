import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useMusic } from "@/context/MusicContext";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react-native";

const SongDetailsSheet = () => {
  const { song } = useMusic();
  const [isPlaying, setIsPlaying] = useState(false);

  const audioSource = song?.downloadUrl[song.downloadUrl.length - 1].url ?? "";
  const player = useAudioPlayer(audioSource);

  useEffect(() => {
    player.pause();
    setIsPlaying(false);
  }, [audioSource]);

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!song) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: song.image[song.image.length - 1].url }}
        style={styles.coverImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.name}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artists.primary.map((artist) => artist.name).join(", ")}
        </Text>
      </View>
      <View style={styles.controls}>
        <Pressable onPress={handlePlayPause} style={styles.iconWrapper}>
          {isPlaying ? <PauseIcon size={36} /> : <PlayIcon size={36} />}
        </Pressable>
      </View>
    </View>
  );
};

export default SongDetailsSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  coverImage: {
    width: 300,
    height: 300,
    borderRadius: 16,
    marginBottom: 24,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  artist: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 4,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconWrapper: {
    padding: 16,
  },
});
