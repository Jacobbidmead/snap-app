import { useState, useEffect } from "react";
import Image from "next/image";

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
  const [card, setCard] = useState<Card[]>([]);
  const [showIcons, setShowIcons] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<number[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  let icons: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (startTime !== null && endTime === null) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [startTime, endTime]);

  const findMatch = () => {
    if (card.length === 2) {
      const [firstCard, secondCard] = card;
      if (firstCard.value === secondCard.value) {
        setMatchedPairs([...matchedPairs, firstCard.index, secondCard.index]);
        setCard([]);
        setScore((prevScore) => prevScore + 1);
      } else setCard([]);
    }
  };

  const randomIcons = () => {
    for (let i = icons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [icons[i], icons[j]] = [icons[j], icons[i]];
    }
    setShowIcons(icons);
    setCard([]);
    setMatchedPairs([]);
  };

  useEffect(() => {
    randomIcons();
  }, []);

  const handleShowCard = (index: number) => {
    if (
      matchedPairs.includes(index) ||
      card.some((cardItem) => cardItem.index === index)
    ) {
      return;
    }

    if (card.some((card) => card.index === index)) {
      setCard((prev) => prev.filter((card) => card.index !== index));
    } else {
      setCard((prev) => [...prev, { index: index, value: showIcons[index] }]);
    }

    if (moves === 0 && startTime === null) {
      setStartTime(Date.now());
    }

    if (card.length === 1) {
      setMoves((prevMoves) => prevMoves + 1);
    }

    findMatch();
  };

  const getAssetUrl = (iconId: number): string => {
    const asset = imageAssets.find((asset) => asset.id === iconId);
    if (asset) return asset.url;
    return "/path/to/default/image.png"; // Fallback
  };

  const calculateScore = () => {
    const timeTaken = (endTime! - startTime!) / 1000;
    const baseScore = icons.length * 10;
    return baseScore - (moves + timeTaken);
  };

  const updateLeaderboard = (newScore: number) => {
    const updatedScores = [...leaderboard, newScore]
      .sort((a, b) => b - a)
      .slice(0, 10);
    setLeaderboard(updatedScores);
  };

  useEffect(() => {
    if (score === 8) {
      setEndTime(Date.now());
      const finalScore = calculateScore();
      updateLeaderboard(finalScore);
    }
  }, [score]);

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
                card.some((cardItem) => cardItem.index === index) ||
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
      <button onClick={randomIcons}>New Game</button>
      <div>Score: {score}</div>
      <div>Moves: {moves}</div>
      <div>
        Time Elapsed: {new Date(elapsedTime).toISOString().substr(14, 5)}
      </div>
      <div>
        Game Started: {startTime && new Date(startTime).toLocaleTimeString()}
      </div>
      <div>Game Ended: {endTime && new Date(endTime).toLocaleTimeString()}</div>
    </>
  );
};

export default Game;
