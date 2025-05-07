import React, { createContext, useContext, useState, ReactNode } from "react";

type MusicContextType = {
  song: Song | null;
  setSong: (song: Song | null) => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [song, setSong] = useState<Song | null>(null);

  return (
    <MusicContext.Provider value={{ song, setSong }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
