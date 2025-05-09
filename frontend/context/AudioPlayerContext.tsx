import { AudioPlayer, useAudioPlayer } from "expo-audio";
import { createContext, ReactNode, useContext, useState } from "react";

type AudioPlayerContextType = {
  player: AudioPlayer;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSource: string | null;
  setAudioSource: React.Dispatch<React.SetStateAction<string | null>>;
  playSong: () => void;
};
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const player = useAudioPlayer(audioSource);
  const playSong = () => {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      if (player.currentTime >= player.duration) {
        player.seekTo(0);
      }
      player.play();
      setIsPlaying(true);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        player,
        audioSource,
        setAudioSource,
        isPlaying,
        setIsPlaying,
        playSong,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
export const usePlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a AudioPlayer");
  }
  return context;
};
