import Quotes from "./components/Quotes/Quotes";
import Game from "./components/Game/Game";
import "./App.css";

function App() {
  return (
    <>
      <div className="game">
        <Game />
      </div>
      <div className="quotes">
        <Quotes />
      </div>
    </>
  );
}

export default App;
