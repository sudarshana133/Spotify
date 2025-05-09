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
import Slider from "@react-native-community/slider";
import { useAudioPlayerStatus } from "expo-audio";
import { formatSecToMin } from "@/utils/formatTimer";

type SongDetailsSheetProps = {
  onClose?: () => void;
};

const SongDetailsSheet = ({ onClose }: SongDetailsSheetProps) => {
  const { song } = useMusic();
  const { setAudioSource, isPlaying, playSong, player, setIsPlaying } =
    usePlayer();
  const audioStatus = useAudioPlayerStatus(player);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const audioSource = song?.downloadUrl[song.downloadUrl.length - 1].url ?? "";

  useEffect(() => {
    if (audioSource) {
      setAudioSource(audioSource);
    }
  }, [audioSource, setAudioSource]);

  useEffect(() => {
    if (
      audioStatus &&
      audioStatus.currentTime >= audioStatus.duration &&
      audioStatus.duration > 0
    ) {
      player.seekTo(0);
      player.play();
      setIsPlaying(true);
    }
  }, [audioStatus.currentTime, audioStatus.duration]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleValueChange = (payload: number) => {
    player.seekTo(payload);
  };

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
          alignItems: "center",
        }}
      >
        {/* Header with close button */}
        <View style={styles.header}>
          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Ionicons name="chevron-down" size={28} color="#fff" />
          </Pressable>
        </View>

        {/* Album artwork */}
        <Image
          source={{ uri: song.image[song.image.length - 1].url }}
          style={styles.coverImage}
        />

        {/* Song info */}
        <View style={styles.songInfoContainer}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {song.name}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {song.artists.primary.map((artist) => artist.name).join(", ")}
          </Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={audioStatus.duration}
            value={audioStatus.currentTime}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#5E5E5E"
            thumbTintColor="#FFFFFF"
            onSlidingComplete={(e) => handleValueChange(e)}
          />

          <View style={styles.timeContainer}>
            <Text style={styles.time}>
              {formatSecToMin(audioStatus.currentTime.toFixed(2))}
            </Text>
            <Text style={styles.time}>
              {formatSecToMin(audioStatus.duration.toFixed(2))}
            </Text>
          </View>
        </View>

        {/* Playback controls */}
        <View style={styles.controlsContainer}>
          {/* Previous song button */}
          <Pressable style={styles.songNavButton}>
            <Ionicons name="play-skip-back" size={28} color="#fff" />
          </Pressable>

          {/* Play/Pause button */}
          <Pressable onPress={playSong} style={styles.playButton}>
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={64}
              color="#1DB954"
            />
          </Pressable>

          {/* Next song button */}
          <Pressable style={styles.songNavButton}>
            <Ionicons name="play-skip-forward" size={28} color="#fff" />
          </Pressable>
        </View>
      </Animated.View>
    </BottomSheetView>
  );
};

export default SongDetailsSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  coverImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  songInfoContainer: {
    alignItems: "center",
    width: "100%",
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
    color: "#a7a7a7",
    marginTop: 6,
    textAlign: "center",
  },
  progressContainer: {
    width: "100%",
    marginBottom: 24,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
  },
  time: {
    color: "#a7a7a7",
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10,
  },
  songNavButton: {
    padding: 16,
  },
  playButton: {
    marginHorizontal: 24,
  },
});
