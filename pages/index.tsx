import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showIcons, setShowIcons] = useState<number[]>([]);

  useEffect(() => {
    let icons: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

    const randomIcons = (): number[] => {
      for (let i = icons.length - 1; i > 0; i--) {
        // Generate a random index
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements
        [icons[i], icons[j]] = [icons[j], icons[i]];
      }
      return icons;
    };
    setShowIcons(randomIcons());
  }, []);

  return (
    <>
      <div>
        {showIcons.map((icon, index) => (
          <div key={index} className="grid grid-row-4">
            <div>{icon}</div>
          </div>
        ))}
      </div>
    </>
  );
}
