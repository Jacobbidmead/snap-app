import { useState, useEffect } from "react";
import Image from "next/image";
import Scoreboard from "./scoreboard";
import { motion } from "framer-motion";

type Card = {
  index: number;
  value: number;
};

type ImageAsset = {
  id: number;
  url: string;
};

const imageAssets: ImageAsset[] = [
  { id: 1, url: "/photos/1.png" },
  { id: 2, url: "/photos/2.png" },
  { id: 3, url: "/photos/3.png" },
  { id: 4, url: "/photos/4.png" },
  { id: 5, url: "/photos/5.png" },
  { id: 6, url: "/photos/6.png" },
  { id: 7, url: "/photos/7.png" },
  { id: 8, url: "/photos/8.png" },
];

let icons: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

const GameScreen: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [showIcons, setShowIcons] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<string>("");

  //   Assign image url to icons element
  const getAssetUrl = (iconId: number): string => {
    const asset = imageAssets.find((asset) => asset.id === iconId);
    if (asset) return asset.url;
    return "/path/to/default/image.png"; // Fallback
  };

  useEffect(() => {
    // if the cards array is less than 2 in length, add one to moves
    if (cards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);
      const [firstCard, secondCard] = cards;
      //   cards are equal to an array of two elements that represent the cards clicked
      // If the first card is eqaul to the second card set the matched pairs array to their respective indicies
      if (firstCard.value === secondCard.value) {
        setMatchedPairs((prevMatchedPairs) => [
          ...prevMatchedPairs,
          firstCard.index,
          secondCard.index,
        ]);
        setScore((prevScore) => prevScore + 1);
        // then update score counter
      }
      setTimeout(() => setCards([]), 1000); // Clear cards after 1 second
    }
  }, [cards]);

  //  Randomise numbers in icons array.
  const randomIcons = () => {
    for (let i = icons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [icons[i], icons[j]] = [icons[j], icons[i]];
    }
    setShowIcons(icons);
    setCards([]);
    setMatchedPairs([]);
    setScore(0);
    setMoves(0);
    setGameStatus("");
  };

  useEffect(() => {
    randomIcons();
  }, []);

  const handleShowCard = (index: number) => {
    if (
      matchedPairs.includes(index) ||
      cards.some((card) => card.index === index)
    ) {
      return;
    }

    const newCard = { index, value: showIcons[index] };
    setCards((prev) => [...prev, newCard]);

    if (cards.length === 0) {
      // Only update moves when adding the first card
      setMoves((prevMoves) => prevMoves++);
    }
  };

  // Define the function inside useEffect if it's the only place it is used.
  useEffect(() => {
    const endGame = () => {
      setGameStatus(`Well done! You matched the shapes in ${moves} moves`);
      setCards([]);
    };

    if (matchedPairs.length === icons.length) {
      endGame();
    }
  }, [matchedPairs, moves]); // Include all dependencies used inside useEffect

  return (
    <>
      <div className="bg-black lg:grid lg:grid-cols-2  text-white ">
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="lg:text-6xl xs:text-4xl xs:pt-4 font-bold mb-2 text-custom-green">
            Match the shapes
          </h1>

          <Scoreboard score={score} moves={moves} />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={randomIcons}
            className="px-4 py-2 lg:mt-5 xs:mt-4 lg:text-2xl xs:text-[12px] border border-gray-300 rounded-3xl hover:bg-custom-green hover:text-custom-blue hover:border-transparent "
          >
            Restart Game
          </motion.button>

          <div>
            {gameStatus && (
              <div className="game-status-message text-custom-green pt-5 lg:text-2xl xs:text-[18px]">
                {gameStatus}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 xs:grid-cols-4 xs:gap-1 gap-6 h-screen p-2">
          {showIcons.map((icon, index) => (
            <div
              className="flip-card  text-black rounded-md cursor-pointer p-1 "
              key={index}
              onClick={() => handleShowCard(index)}
            >
              <div
                className={`flip-content ${
                  cards.some((cardItem) => cardItem.index === index) ||
                  matchedPairs.includes(index)
                    ? "flipped"
                    : ""
                }`}
              >
                <div className="card-front flex items-center justify-center">
                  <Image
                    src={"/photos/card.png"}
                    alt="Character"
                    layout="fill" // Changed to fill for responsive images
                    sizes="(max-width: 768px) 100vw"
                    objectFit="cover" // Ensures the image covers the card
                    className="rounded-md card-shadow"
                  />
                </div>
                <div className="card-back flex items-center justify-center">
                  <Image
                    src={getAssetUrl(icon)}
                    alt="Character"
                    layout="fill" // Changed to fill for responsive images
                    sizes="(max-width: 768px) 100vw"
                    objectFit="cover" // Ensures the image covers the card
                    className="rounded-md card-shadow"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameScreen;
