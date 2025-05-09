import { useAudioPlayer } from "expo-audio";
import { createContext, ReactNode, useContext, useState } from "react";

type AudioPlayerContextType = {
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
    } else {
      player.play();
    }
    setIsPlaying(player.playing);
  };
  return (
    <AudioPlayerContext.Provider
      value={{ audioSource, setAudioSource, isPlaying, setIsPlaying, playSong }}
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
