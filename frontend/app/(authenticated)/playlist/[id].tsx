import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const PlaylistScreen = () => {
  const { id } = useLocalSearchParams();
  const [playlist, setPlaylist] = useState<any>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        let response;
        if (typeof id === "string" && id?.startsWith("album-")) {
          const albumId = id.replace("album-", "");
          response = await axios.get(
            `https://saavn.dev/api/albums?id=${albumId}`
          );
        } else if (typeof id === "string" && id?.startsWith("public-")) {
          const playlistId = id.replace("public-", "");
          response = await axios.get(
            `https://saavn.dev/api/playlists?id=${playlistId}`
          );
        } else {
          // fallback for custom playlists (if your backend supports it)
          response = await axios.get(
            `https://your-backend.com/api/playlists/${id}`
          );
        }

        const data = response.data.data;
        setPlaylist(data);
        setSongs(data.songs || []);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  const renderSong = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.songItem}>
      <Image source={{ uri: item.image[0]?.url }} style={styles.albumArt} />
      <View style={styles.songInfo}>
        <Text numberOfLines={1} style={styles.songName}>
          {item.name.replace(/&quot;/g, '"')}
        </Text>
        <Text numberOfLines={1} style={styles.artistName}>
          {item.artists.primary[0]?.name || "Unknown Artist"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  if (!playlist) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load playlist</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        {playlist.image ? (
          <Image
            source={{ uri: playlist.image[playlist.image.length - 1].url }}
            style={styles.coverImage}
          />
        ) : (
          <Text style={styles.fallbackImage}>{playlist.name?.charAt(0)}</Text>
        )}
        <Text style={styles.title}>{playlist.name || playlist.title}</Text>
      </View>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderSong}
        contentContainerStyle={{ paddingBottom: 100 }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Spotify black
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  coverImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  fallbackImage: {
    fontSize: 48,
    color: "#fff",
    backgroundColor: "#333",
    width: 160,
    height: 160,
    textAlign: "center",
    lineHeight: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  artistName: {
    color: "#aaa",
    fontSize: 14,
  },
  center: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#ccc",
    fontSize: 16,
  },
});

export default PlaylistScreen;
