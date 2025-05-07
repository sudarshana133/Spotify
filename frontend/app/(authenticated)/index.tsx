import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  getRandomPublicPlaylists,
  PlaylistFromApi,
} from "../../lib/public-playlist";
import { useRouter } from "expo-router";

export default function AuthHome() {
  const [playlists, setPlaylists] = useState<PlaylistFromApi[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      const data = await getRandomPublicPlaylists();
      setPlaylists(data);
      setLoading(false);
    };

    fetchPlaylists();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Welcome!</Text>
      <Text style={styles.subheading}>Discover Public Playlists</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1DB954" />
      ) : (
        <View style={styles.playlistContainer}>
          {playlists.map((playlist) => (
            <Pressable
              key={playlist.id}
              style={styles.card}
              onPress={() => {
                // handle navigation here
                router.push(`/(authenticated)/playlist/public-${playlist.id}`);
              }}
            >
              <Image
                source={{
                  uri:
                    playlist.image.find((img) => img.quality === "500x500")
                      ?.url || "https://via.placeholder.com/100",
                }}
                style={styles.playlistImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.playlistTitle}>{playlist.name}</Text>
                <Text style={styles.playlistMeta}>
                  {playlist.songCount} songs • {playlist.language.toUpperCase()}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: "#888",
    marginBottom: 24,
  },
  playlistContainer: {
    gap: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  playlistImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  playlistTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  playlistMeta: {
    color: "#AAA",
    fontSize: 12,
    marginTop: 4,
  },
});
