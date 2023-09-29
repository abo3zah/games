import { useEffect, useState } from 'react';
import { ScoreBoard } from './scoreBoard';
import { ReturnButton } from '../commonComponent';
import { countriesFlagsData } from '../../data/countriesInfo';

export const CountriesFlags = () => {
    const [flags] = useState(countriesFlagsData);
    const [current, setCurrent] = useState({ countryCode: 'null' });
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [waitingFlage, setWaitingFlag] = useState(false);
    const [disableOptions, setDisabledOptions] = useState([]);
    const [turn, setTurn] = useState(true);
    const [score, setScore] = useState({ A: 0, B: 0 });
    const [history, setHistory] = useState([]);

    useEffect(() => {
        newQuestion();
    }, []);

    const newQuestion = () => {
        // Pick a random flag from the list
        var selectedFlag = Math.floor(Math.random() * flags.length);
        while (history.includes(selectedFlag)) {
            selectedFlag = Math.floor(Math.random() * flags.length);
        }
        setCurrent(flags[selectedFlag]);
    };

    useEffect(() => {
        // Clear the message
        setMessage('');

        // Generate four options, one of them being the correct answer
        var array = [current.country];

        // Pick three other random flags and add their names to the options
        while (array.length < 4) {
            var flag = flags[Math.floor(Math.random() * flags.length)];
            if (!array.includes(flag.country)) {
                array.push(flag.country);
            }
        }

        // Shuffle the options
        shuffle(array);
    }, [current]);

    const shuffle = (array) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        setOptions(array);
    };

    useEffect(() => {
        setWaitingFlag(false);
    }, [options]);

    const checkAnswer = (answer, index) => {
        if (current.country == answer) {
            let team = turn ? 'A' : 'B';

            setScore((prevState) => {
                return {
                    ...prevState,
                    [team]: prevState[team] + 1,
                };
            });

            setDisabledOptions([]);
        } else {
            setDisabledOptions([...disableOptions, index]);
            setTurn(!turn);
        }
    };

    useEffect(() => {
        setMessage(
            `الإجابة صحيحة وهي ${current.country} وعاصمتها ${current.Capital}`
        );

        setWaitingFlag(true);

        setHistory((prevState) => {
            if (!flags.includes(current)) return prevState;
            return [...prevState, current];
        });
    }, [score]);

    useEffect(() => {
        isFinished();
    }, [history]);

    const isFinished = () => {
        let winingScore = 5;

        let team = turn ? 'A' : 'B';

        if (score[team] >= winingScore) {
            setMessage(`الفريق الفائز هو ${team}`);
            console.log(team);
        } else {
            if (waitingFlage == true) {
                setTimeout(() => {
                    setTurn(!turn);
                    newQuestion();
                }, 3000);
            }
        }
    };

    return (
        <div className="w-full p-6 grid justify-items-center content-center gap-3 select-none">
            <div className="p-6 grid justify-items-center align-middle w-full bg-gray-50 gap-5 rounded outline outline-black">
                <div className={`grid gap-3 justify-center text-5xl`}>
                    الأعلام
                </div>
                <img
                    src={`${
                        current.countryCode == 'null'
                            ? ''
                            : `https://flagcdn.com/${current.countryCode.toLowerCase()}.svg`
                    }`}
                    alt="flag"
                    width="350px"
                    height="300px"
                    className="border border-black"
                />
                <div className="text-4xl font-bold font-mono text-red-700">
                    فريق {turn ? 'A' : 'B'} : خمن الدولة؟
                </div>
                {!waitingFlage ? (
                    <div dir="ltr" className="w-full grid grid-cols-2 gap-2">
                        {options.map((item, index) => (
                            <button
                                before={`${index + 1}`}
                                className={`tracking-wide w-full border relative border-black enabled:bg-gradient-to-br enabled:from-cyan-500 enabled:to-slate-200 disabled:bg-gray-600 rounded-full p-4 text-xl enabled:hover:brightness-110 before:content-[attr(before)] before:absolute before:left-5 before:rounded-2xl before:bg-slate-200 before:px-3`}
                                key={'button' + index}
                                onClick={() => checkAnswer(item, index)}
                                disabled={disableOptions.includes(index)}>
                                {item}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-2xl w-full text-center text-green-700">
                        {message}
                    </div>
                )}
                <hr className="border border-black w-full" />
                <ScoreBoard score={score} />
            </div>
            <div className="lg:w-1/3 w-full">
                <ReturnButton />
            </div>
        </div>
    );
};
