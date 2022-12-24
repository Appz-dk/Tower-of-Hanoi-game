import { useEffect, useState } from "react";
import "./App.css";

const AMOUNT_OF_DICS = 5;

function App() {
  const [towers, setTowers] = useState<number[][]>([[], [], []]);
  const [selectedTowerIndex, setSelectedTowerIndex] = useState<number | undefined>();

  // Starts game with amount of disc at first tower
  useEffect(() => {
    const startDiscArray = Array.from({ length: AMOUNT_OF_DICS }, (_, i) => i + 1);
    setTowers([[...startDiscArray], [], []]);
  }, []);

  // Game logic (tower select & dics move)
  function handleTowerSelect(clickedTowerIndex: number) {
    if (selectedTowerIndex != undefined) {
      // Copy tower state
      const newTowers = [...towers];

      // Cannot move dics from an already empty tower
      if (newTowers[selectedTowerIndex].length == 0) {
        setSelectedTowerIndex(undefined);
        return;
      }

      // Guard clause to ensure a higher numbered disc cannot be placed on a lower numbered disc
      if (newTowers[selectedTowerIndex][0] > newTowers[clickedTowerIndex][0]) {
        return;
      }

      const discToMove = newTowers[selectedTowerIndex].shift();
      // Guard clause to ensure discToMove is never undefined
      if (!discToMove) {
        setSelectedTowerIndex(undefined);
        return;
      }

      // Handles game logic if all guard clauses passes
      newTowers[clickedTowerIndex].unshift(discToMove);
      setTowers(newTowers);
      setSelectedTowerIndex(undefined);
    } else {
      // First time a tower is clicked
      setSelectedTowerIndex(clickedTowerIndex);
    }

    // Winning condition with timeout delay to ensure react can re-render before alert
    if (towers[towers.length - 1].length === AMOUNT_OF_DICS) {
      setTimeout(() => {
        alert("You won!");
      }, 300);
    }
  }

  return (
    <div className="App">
      <div className="title">
        <h1>Tower Of Hanoi</h1>
      </div>
      <div className="container">
        {towers.map((disc, towerIndex) => (
          <div
            className={selectedTowerIndex == towerIndex ? "tower selected" : "tower"}
            key={towerIndex}
            onClick={() => {
              handleTowerSelect(towerIndex);
            }}
          >
            <div className="line"></div>
            <div className="discs">
              {disc.map((discNumber) => (
                <div key={discNumber} className="disc" style={{ width: `${discNumber * 20 + 20}px` }}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
