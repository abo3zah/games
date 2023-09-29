import { TeamScoreBoard } from './teamScoreBoard';

export const ScoreBoard = ({ score }) => (
    <div className={`w-full flex justify-center`}>
        <TeamScoreBoard team="A" score={score.A} />
        <TeamScoreBoard team="B" score={score.B} />
    </div>
);
