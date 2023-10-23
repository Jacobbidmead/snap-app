interface Props {
  showIcons: number[];
  shuffleIcons: () => void;
}

const Game: React.FC<Props> = ({ showIcons, shuffleIcons }) => {
  return (
    <>
      {" "}
      <div className="grid grid-cols-4 p-10 bg-black">
        {showIcons.map((icon, index) => (
          <div
            className="p-10 text-red-600 border-white border-[1px] m-4 rounded-md cursor-pointer"
            key={index}
          >
            <div>{icon}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          const newIcons = shuffleIcons();
        }}
      >
        Randomise
      </button>
    </>
  );
};

export default Game;
