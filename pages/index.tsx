import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Game from "./components/game";

export default function Home() {
  const [showIcons, setShowIcons] = useState<number[]>([]);

  const randomIcons = () => {
    let icons: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    for (let i = icons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [icons[i], icons[j]] = [icons[j], icons[i]];
    }
    setShowIcons(icons);
  };

  useEffect(() => {
    randomIcons();
  }, []);

  return <Game showIcons={showIcons} shuffleIcons={randomIcons} />;
}
