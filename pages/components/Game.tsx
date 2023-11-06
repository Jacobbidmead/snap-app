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
  { id: 1, url: "/photos/guard.png" },
  { id: 2, url: "/photos/kingL.png" },
  { id: 3, url: "/photos/kingV.png" },
  { id: 4, url: "/photos/largeria.png" },
  { id: 5, url: "/photos/princeL.png" },
  { id: 6, url: "/photos/princeV.png" },
  { id: 7, url: "/photos/queenL.png" },
  { id: 8, url: "/photos/queenV.png" },
];

const Game: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [showIcons, setShowIcons] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(0);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);

  let icons: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

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
    startGame();
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

  const getAssetUrl = (iconId: number): string => {
    const asset = imageAssets.find((asset) => asset.id === iconId);
    if (asset) return asset.url;
    return "/path/to/default/image.png"; // Fallback
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isGameActive) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGameActive, startTime]);

  // Use this function to start the game
  const startGame = () => {
    if (!isGameActive) {
      setStartTime(Date.now());
      setIsGameActive(true);
    }
  };

  // Use this function to end the game
  const endGame = () => {
    setIsGameActive(false);
    setEndTime(Date.now());
    setCards([]);
    setScore(0);
    setMoves(0);
    setStartTime(0);
  };
  // Reset the game when the game ends
  useEffect(() => {
    if (matchedPairs.length === icons.length) {
      endGame();
    }
  }, [matchedPairs, icons.length]);

  return (
    <>
      <div className="grid grid-cols-4 p-10 ">
        {showIcons.map((icon, index) => (
          <div
            className="flip-card p-10 text-red-600 border-white border-[1px] m-4 rounded-md cursor-pointer"
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
                  width={500}
                  height={400}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={randomIcons}>Restart Game</button>
      <Scoreboard score={score} moves={moves} elapsedTime={elapsedTime} />
    </>
  );
};

export default Game;
