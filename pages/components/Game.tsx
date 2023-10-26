import { useState, useEffect } from "react";

const Game: React.FC = () => {
  const [card, setCard] = useState<number[]>([]);
  const [showIcons, setShowIcons] = useState<number[]>([]);

  let icons: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

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
    if (card.includes(index)) {
      setCard((prev) => prev.filter((i) => i !== index));
    } else {
      setCard((prev) => [...prev, index]);
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
            {card.includes(index) ? <div>{icon}</div> : null}
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
    </>
  );
};

export default Game;
