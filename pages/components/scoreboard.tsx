import { useState } from "react";

interface Props {
  score: number;
  moves: number;
  elapsedTime: number;
}

const Scoreboard: React.FC<Props> = ({ score, moves, elapsedTime }) => {
  const [leaderboard, setLeaderboard] = useState<number[]>([]);

  const updateLeaderboard = (newScore: number) => {
    const updatedScores = [...leaderboard, newScore]
      .sort((a, b) => b - a)
      .slice(0, 10);
    setLeaderboard(updatedScores);
  };

  return (
    <>
      {" "}
      <div>Score: {score}</div>
      <div>Moves: {moves}</div>
      <div>
        Time Elapsed: {new Date(elapsedTime).toISOString().slice(11, 16)}
      </div>
    </>
  );
};

export default Scoreboard;
