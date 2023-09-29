export const TeamScoreBoard = ({ team, score }) => (
    <div className="grid w-full justify-center">
        <div className="w-full text-center text-xl font-bold">
            الفريق {team}
        </div>
        <p className="w-full text-center text-xl text-green-700">{score}</p>
    </div>
);
