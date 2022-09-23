import { Link } from "react-router-dom";
import ticTacToe from "./routeSVGs/Tic-Tac-Toe.svg"
import numberOrganizer from "./routeSVGs/Number-Organizer.svg"

export default function App() {
  return (
    <div className="w-full h-full bg-slate-100">
      <h1 className="text-2xl w-full text-center font-bold">🎮ألعاب🎮</h1>
      <div className="p-6 flex flex-wrap gap-5">
        <Link to="/Tic-Tac-Toe" className="grid justify-items-center">
            <img src={ticTacToe} className="App-logo" alt="logo" />
            <span className="text-center font-bold">لعبة ضرب و دائرة</span>
        </Link>
        <Link to="/Number-Organizer" className="grid justify-items-center">
            <img src={numberOrganizer} className="App-logo" alt="logo" />
            <span className="text-center font-bold">ترتيب الأرقام</span>
        </Link>
        <Link to="/Letter-Arranger" className="grid justify-items-center">
            <img src={numberOrganizer} className="App-logo" alt="logo" />
            <span className="text-center font-bold">ترتيب الأحرف</span>
        </Link>
      </div>
    </div>
  );
}