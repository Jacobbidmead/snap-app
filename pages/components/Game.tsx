import { useState, useEffect } from "react";

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

  let icons: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

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
  };

  useEffect(() => {
    randomIcons();
  }, []);

  const handleShowCard = (index: number) => {
    findMatch();
    if (
      matchedPairs.includes(index) ||
      card.some((cardItem) => cardItem.index === index)
    ) {
      return;
    }
    // Check if card array contains an object with the given index
    if (card.some((card) => card.index === index)) {
      // Filter out cards with the specified index
      setCard((prev) => prev.filter((card) => card.index !== index));
    } else {
      // Add a new card object
      setCard((prev) => [...prev, { index: index, value: showIcons[index] }]);
    }
  };

  //   Reset game when max score is reached
  if (score === 8) {
    setScore(0), setCard([]), setMatchedPairs([]);
  }

  return (
    <>
      {" "}
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
              <div className="card-front bg-gray-200 flex items-center justify-center">
                ?
              </div>
              <div className="card-back bg-red-200 flex items-center justify-center">
                {icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          randomIcons();
        }}
      >
        Randomise
      </button>
      <div>{score}</div>
    </>
  );
};

export default Game;
