import axios from "axios";

export async function fetchMusic(songId: string) {
    try {
        const response = await axios.get(`https://saavn.dev/api/songs/${songId}`);
        const song: Song = response.data.data[0];
        return song;
    } catch (error) {
        console.log("Some error occured", error)
        return null;
    }
}