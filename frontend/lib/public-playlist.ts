import axios from "axios";

export interface PlaylistFromApi {
    id: string;
    name: string;
    type: string;
    image: { quality: string; url: string }[];
    url: string;
    songCount: number;
    language: string;
    explicitContent: boolean;
}

const queries = [
    "arrahman",
    "bollywood hits",
    "punjabi songs",
    "party mix",
    "romantic songs",
    "top 50 india",
    "indie music",
    "devotional songs",
    "workout playlist",
    "retro classics",
    "anirudh ravichander",
];

export const getRandomPublicPlaylists = async (): Promise<PlaylistFromApi[]> => {
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    try {
        const { data } = await axios.get(
            `https://saavn.dev/api/search/playlists?query=${randomQuery}`
        );
        return data.data.results || [];
    } catch (error) {
        console.error("Error fetching playlists:", error);
        return [];
    }
};
