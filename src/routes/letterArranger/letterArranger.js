import { useEffect, useState, useContext } from 'react';
import { ReturnButton } from '../commonComponent';
import { letterArrangerData } from '../../data/letterArrangerData';
import errorSounds from '../../sounds/error-sound.mp3';
import correctSounds from '../../sounds/correctSound.mp3';
import { Keyboard } from './keybord';

function LetterPuzzelComponent({ checks, letter }) {
    return <>{checks ? letter : '🔒'}</>;
}

export const LetterArranger = () => {
    // const [score, setScore] = useState(0)
    const [levels, setLevels] = useState(letterArrangerData);
    const [selectedItem, setSelectedItem] = useState(0);
    const [checks, setChecks] = useState(
        Array.from({ length: 3 }, () => false)
    );
    const [letters, setLetters] = useState([]);
    const [pause, setPause] = useState(false);
    const [mistake, SetMistake] = useState(0);

    const changeCheck = (letter) => {
        let index = levels[selectedItem].word.indexOf(letter);
        const errorSound = new Audio(errorSounds);
        const correctSound = new Audio(correctSounds);

        if (checks[index] === true) {
            index = levels[selectedItem].word.indexOf(letter, index + 1);
        }

        if (index >= 0) {
            checks[index] = true;
            setChecks(checks);
            updatePuzzle();
            if (checks.indexOf(false) === -1) {
                if (selectedItem === levels.length - 1) {
                    setPause(true);
                } else {
                    setPause(true);
                    setTimeout(() => {
                        setSelectedItem(selectedItem + 1);
                    }, 3000);
                }
            } else {
                correctSound.play();
            }
        } else {
            errorSound.play();
            SetMistake(mistake + 1);
        }
    };

    const updatePuzzle = () => {
        let tempLetters = [];
        let word = levels[selectedItem].word;

        for (let i = 0; i < word.length; i++) {
            tempLetters.push(
                <LetterPuzzelComponent
                    key={i}
                    checks={checks[i]}
                    value={i}
                    letter={word[i]}
                />
            );
        }

        setLetters(tempLetters);
    };

    useEffect(() => {
        updatePuzzle();
    }, [checks]);

    useEffect(() => {
        setPause(false);
        updatePuzzle();
        setChecks(
            Array.from(
                { length: levels[selectedItem].word.length },
                () => false
            )
        );
    }, [selectedItem]);

    return (
        <div className='w-full p-6 grid justify-items-center content-center gap-3 select-none'>
            <div className='p-6 grid justify-items-center align-middle md:w-1/3 w-full bg-gray-50 gap-3 rounded outline outline-black'>
                <div className='w-full text-left font-bold'>❌:{mistake}</div>
                <img
                    src={levels[selectedItem].image}
                    className='w-1/2 h-50'
                    alt={levels[selectedItem].word}></img>
                <div className={`flex flex-wrap gap-3 justify-center text-5xl`}>
                    {letters}
                </div>
                <hr className='border border-black w-full' />
                <Keyboard
                    pause={pause}
                    selectedItem={selectedItem}
                    levels={levels}
                    changeCheck={changeCheck}
                />
            </div>
            <div className='lg:w-1/3 w-full'>
                <ReturnButton />
            </div>
        </div>
    );
};
