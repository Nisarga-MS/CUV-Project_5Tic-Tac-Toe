import React, { useEffect, useState } from "react";
import HomePage from "../HomePage/HomePage";
import Symbol from "../Symbol";
import PlayArea from "../Play/PlayArea";
import GameOver from "../GameOver/GameOver";
import "./Game.css";

let gameOverProps = {};
function Game() {
  const [player, setPlayer] = useState("O");
  const [start, setStart] = useState(false);
  const [showPlayArea, setShowPlayArea] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({
    user: 0,
    tie: 0,
    cpu: 0,
  });

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("scores"));
    const gamePlayer = localStorage.getItem("player");
    const gameStart = localStorage.getItem("gameStart");
    if (gameStart) {
      setStart(true);
      setShowPlayArea(true);
    }

    if (gamePlayer) setPlayer(gamePlayer);

    if (scores) setScores(scores);
  }, []);

  const handleQuit = () => {
    localStorage.clear();
    gameOverProps.clearBoxes();
    setScores({ user: 0, tie: 0, cpu: 0 });
    setGameOver(false);
    setStart(false);
    setShowPlayArea(false);
    setPlayer("O");
  };

  const handlePlayAgain = () => {
    setGameOver(false);
    gameOverProps.clearBoxes();
  };

  const handleNewGame = () => {
    handlePlayAgain();
    localStorage.removeItem("scores");
    setScores({ user: 0, tie: 0, cpu: 0 });
  };

  const handleGameOver = (gameOverData) => {
    gameOverProps = gameOverData;
    setGameOver(true);
  };

  const updateScores = (winner) => {
    localStorage.setItem(
      "scores",
      JSON.stringify({ ...scores, [winner]: scores[winner] + 1 })
    );
    setScores((prevScores) => ({
      ...prevScores,
      [winner]: prevScores[winner] + 1,
    }));
  };
  return (
    <div className="game-box">
      <div
        className="symbol"
        style={
          start && !showPlayArea
            ? { animation: "slide-text linear both 0.7s" }
            : start && showPlayArea
            ? { left: "3.5rem" }
            : null
        }
      >
        <Symbol>X</Symbol>
        {"  "}
        <Symbol>O</Symbol>
      </div>
      {!start ? (
        <HomePage
          player={player}
          swapPlayer={(player) => setPlayer(player)}
          gameStarts={() => {
            setStart(true);
            localStorage.setItem("player", player);
            localStorage.setItem("gameStart", true);
            setTimeout(() => setShowPlayArea(true), 1000);
          }}
        />
      ) : (
        showPlayArea && (
          <PlayArea
            player={player}
            scores={scores}
            updateScores={updateScores}
            handleGameOver={handleGameOver}
          />
        )
      )}

      {gameOver && (
        <div className=" blur-bg game-over-box">
          <GameOver
            {...gameOverProps}
            handleQuit={handleQuit}
            handlePlayAgain={
              gameOverProps.refresh ? handleNewGame : handlePlayAgain
            }
            handleClosePopup={() => setGameOver(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Game;
