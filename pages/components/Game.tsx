import { useState, useEffect } from "react";
import Image from "next/image";
import Scoreboard from "./scoreboard";

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

const Game: React.FC = () => {
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

  // Use this function to end the game
  const endGame = () => {
    setGameStatus(`You win!! you finished the game in ${moves} moves`);
    setCards([]);
  };

  // Reset the game when the game ends
  useEffect(() => {
    if (matchedPairs.length === icons.length) {
      endGame();
    }
  }, [matchedPairs, icons.length]);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-2">Snap Memory Game</h1>
      </div>

      <div className="grid grid-cols-4 p-10 ">
        {showIcons.map((icon, index) => (
          <div
            className="flip-card p-10 text-black border-white border-[1px] m-4 rounded-md cursor-pointer"
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
              <div className="card-front bg-black flex items-center justify-center">
                ?
              </div>
              <div className="card-back flex items-center justify-center">
                <Image
                  src={getAssetUrl(icon)}
                  alt="Character"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={randomIcons}>Restart Game</button>
      <Scoreboard score={score} moves={moves} />
      <div>
        {gameStatus && <div className="game-status-message">{gameStatus}</div>}
      </div>
    </>
  );
};

export default Game;
