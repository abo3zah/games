import { Link } from "react-router-dom";
import ticTacToe from "./routeSVGs/Tic-Tac-Toe.svg"

export default function App() {
  return (
    <div className="w-full h-full bg-slate-100">
      <h1 className="text-2xl w-full text-center font-bold">🎮Games🎮</h1>
      <div className="p-6 flex flex-wrap gap-3">
        <Link to="/Tic-Tac-Toe" className="grid justify-center">
            <img src={ticTacToe} className="App-logo" alt="logo" />
            <span className="text-center">Tic-Tac-Toe</span>
        </Link>
        <Link to="/Number-Organizer" className="grid justify-center">
            <span className="text-center">Number-Organizer</span>
        </Link>
      </div>
    </div>
  );
}