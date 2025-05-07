import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
import { fetchMusic } from "@/lib/music-fetcher";
import { useMusic } from "@/context/MusicContext";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const debouncedQuery = useDebounce(query, 500);
  const { setSong } = useMusic();

  useEffect(() => {
    const fetchSongs = async () => {
      if (!debouncedQuery) return setSongs([]);

      try {
        const res = await axios.get(
          `https://saavn.dev/api/search/songs?query=${debouncedQuery}`
        );
        setSongs(res.data.data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [debouncedQuery]);

  const handleSongPress = async (songId: string) => {
    const song = await fetchMusic(songId);
    if (song) {
      setSong(song);
    } else {
      console.log("Failed to play song");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for songs..."
        placeholderTextColor="#888"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />
      {songs.length === 0 ? (
        <Text style={styles.emptyText}>Start typing to find music</Text>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.songItem}
              // todo -> on press play the music
              onPress={() => handleSongPress(item.id)}
            >
              <Image
                source={{ uri: item.image[0]?.url }}
                style={styles.albumArt}
              />
              <View style={styles.songInfo}>
                <Text numberOfLines={1} style={styles.songName}>
                  {item.name.replace(/&quot;/g, '"')}
                </Text>
                <Text numberOfLines={1} style={styles.artistName}>
                  {item.artists.primary[0]?.name || "Unknown Artist"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Spotify black
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: "#121212",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 6,
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
  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: 40,
  },
});

export default SearchScreen;
