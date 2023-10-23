interface Props {
  showIcons: number[];
}

const Game: React.FC<Props> = ({ showIcons }) => {
  return (
    <>
      {" "}
      <div>
        {showIcons.map((icon, index) => (
          <div key={index} className="grid grid-row-4 text-green">
            <div>{icon}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;
