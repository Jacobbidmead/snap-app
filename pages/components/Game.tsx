import { useState, useEffect } from "react";

type Card = {
  index: number;
  value: number;
};

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
  };

  useEffect(() => {
    randomIcons();
  }, []);

  const handleShowCard = (index: number) => {
    findMatch();
    // Check if card array contains an object with the given index
    if (card.some((card) => card.index === index)) {
      // Filter out cards with the specified index
      setCard((prev) => prev.filter((card) => card.index !== index));
    } else {
      // Add a new card object
      setCard((prev) => [...prev, { index: index, value: showIcons[index] }]);
    }
  };

  return (
    <>
      {" "}
      <div className="grid grid-cols-4 p-10 bg-black">
        {showIcons.map((icon, index) => (
          <div
            className="p-10 text-red-600 border-white border-[1px] m-4 rounded-md cursor-pointer"
            key={index}
            onClick={() => handleShowCard(index)}
          >
            {card.some((cardItem) => cardItem.index === index) ? (
              <div>{icon}</div>
            ) : null}
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
