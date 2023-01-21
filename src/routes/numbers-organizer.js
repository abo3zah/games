import React, { createContext, useContext } from 'react';
import { ReturnButton, arabicNumberCode } from './commonComponent';

const StateContext = createContext({});

const SVGDimensions = {
    width: 300,
    height: 400,
    padding: 4,
};

function Square(props) {
    let squareSideLength = 40;
    let barHeight = 30;
    let fontSize = 16;

    const stateCotext = useContext(StateContext);
    let locationX = stateCotext.random.X[props.value - 1];
    let locationY = stateCotext.random.Y[props.value - 1];
    let checked = stateCotext.random.checked[props.value - 1];
    let currentReading = stateCotext.currentReading;

    return (
        <g
            transform={`translate(${
                checked
                    ? 0
                    : locationX *
                      (SVGDimensions.width -
                          2 * SVGDimensions.padding -
                          squareSideLength)
            } ${
                checked
                    ? 0
                    : locationY *
                          (SVGDimensions.height -
                              2 * SVGDimensions.padding -
                              squareSideLength -
                              barHeight) +
                      barHeight
            })`}
            onClick={props.onClick}
            className={`transition-all ease-linear duration-300 ${
                !checked && 'hover:brightness-75 cursor-pointer'
            }`}>
            <rect
                width={`${!checked ? squareSideLength : barHeight}px`}
                height={`${!checked ? squareSideLength : barHeight}px`}
                fill={`${checked ? '#FF6900' : '#0096FF'}`}
                rx={'5'}
                stroke={'gray'}
                strokeWidth={'0.5px'}
            />
            <text
                textAnchor={'middle'}
                fontSize={`${
                    fontSize / (checked ? squareSideLength / barHeight : 1)
                }px`}
                dy={`${
                    (fontSize + squareSideLength / 4) /
                    (checked ? squareSideLength / barHeight : 1)
                }`}
                dx={`${
                    (squareSideLength / 2 - 1) /
                    (checked ? squareSideLength / barHeight : 1)
                }`}
                fill={'white'}
                fontWeight={'bold'}>
                {checked
                    ? (currentReading - 1)
                          .toString()
                          .replace(/\d(?=[^<>]*(<|$))/g, (x) =>
                              String.fromCharCode(arabicNumberCode[x])
                          )
                    : props.value
                          .toString()
                          .replace(/\d(?=[^<>]*(<|$))/g, (x) =>
                              String.fromCharCode(arabicNumberCode[x])
                          )}
            </text>
        </g>
    );
}

function GameOver(props) {
    let fontSize = 24;
    let xShift = SVGDimensions.width / 5;

    return (
        <g
            transform={`translate(${SVGDimensions.width / 2} ${
                SVGDimensions.height / 4
            })`}
            className={`select-none`}>
            <rect
                fill={'white'}
                width={`${SVGDimensions.width - xShift}px`}
                height={`${fontSize * 1.8}px`}
                x={`${-SVGDimensions.width / 2 + xShift / 2}px`}
                y={`${0}px`}
                rx='5px'
                stroke={'black'}
            />
            <text
                textAnchor={'middle'}
                y={`${fontSize * 1.2}`}
                fontSize={`${fontSize}px`}
                fill={'black'}>
                {props.gameStatus}
            </text>
        </g>
    );
}

class Board extends React.Component {
    static contextType = StateContext;

    renderSquare(i) {
        return (
            <Square
                key={i.toString()}
                value={i}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderGameOver(gameStatus) {
        return <GameOver gameStatus={gameStatus} />;
    }

    render() {
        let squares = [];
        let countStrike = this.context.countStrike;
        let gameStatus = this.context.gameStatus;
        let lastNumber = this.context.lastNumber;
        let currentReading = this.context.currentReading;
        let gameFinished = this.context.gameFinished;
        let strikeText;

        if (!gameFinished) {
            strikeText = '❌'.repeat(countStrike);
            for (let i = lastNumber; i > 0; i--) {
                squares.push(this.renderSquare(i));
            }
        } else {
            strikeText = '';
            gameStatus =
                currentReading === lastNumber
                    ? '🙌مبروووك🙌'
                    : '😭حاول مرة أخرى😭';
            squares = this.renderGameOver(gameStatus);
        }

        return (
            <React.Fragment>
                <text
                    dy={'16px'}
                    x={`${
                        SVGDimensions.width -
                        SVGDimensions.padding -
                        countStrike
                    }px`}>
                    {strikeText}
                </text>
                {squares}
            </React.Fragment>
        );
    }
}

export class NumbersOrganizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastNumber: 10,
            countStrike: 0,
            currentReading: 1,
            random: {
                X: Array.from({ length: 10 }, () => Math.random()),
                Y: Array.from({ length: 10 }, () => Math.random()),
                checked: Array.from({ length: 10 }, () => false),
            },
            gameFinished: false,
            SVGWidth: 300,
            SVGHeight: 400,
            padding: 4,
        };
    }

    renderReturnButton() {
        return <ReturnButton />;
    }

    handleClick(i) {
        let checked = this.state.random.checked.slice();
        let countStrike = this.state.countStrike;
        if (this.state.currentReading === i) {
            checked[i - 1] = true;
            this.setState({
                currentReading: i === this.state.lastNumber ? i : i + 1,
                random: { ...this.state.random, checked },
                gameFinished: i === this.state.lastNumber,
            });
        } else {
            countStrike += 1;
            this.setState({
                countStrike,
                gameFinished: countStrike === 3,
            });
        }
    }

    changeLastNumber(e) {
        this.setState({
            lastNumber: parseInt(e.target.value),
            random: {
                X: Array.from({ length: e.target.value }, () => Math.random()),
                Y: Array.from({ length: e.target.value }, () => Math.random()),
                checked: Array.from({ length: e.target.value }, () => false),
            },
        });
        this.resetClick(e.target.value);
    }

    resetClick(lastNumber = null) {
        lastNumber = lastNumber == null ? this.state.lastNumber : lastNumber;
        this.setState({
            countStrike: 0,
            currentReading: 1,
            random: {
                X: Array.from({ length: lastNumber }, () => Math.random()),
                Y: Array.from({ length: lastNumber }, () => Math.random()),
                checked: Array.from({ length: lastNumber }, () => false),
            },
            gameFinished: false,
        });
    }

    render() {
        return (
            <div className='w-full grid justify-center content-center h-full gap-3 select-none'>
                <div className='w-full grid content-center gap-1 select-none'>
                    <label
                        className={
                            'w-full text-center bg-gray-200 font-bold rounded'
                        }>
                        العد إلى{' '}
                        {this.state.lastNumber
                            .toString()
                            .replace(/\d(?=[^<>]*(<|$))/g, (x) =>
                                String.fromCharCode(arabicNumberCode[x])
                            )}
                    </label>
                    <input
                        type='range'
                        min='1'
                        max='40'
                        value={this.state.lastNumber}
                        onChange={(e) => this.changeLastNumber(e)}
                        className={`border border-black w-full text-center rounded`}
                    />
                </div>
                <svg
                    width={`${SVGDimensions.width}px`}
                    height={`${SVGDimensions.height}px`}
                    className={`bg-gray-50 rounded border-black border-2 p-[${SVGDimensions.padding}px]`}>
                    <StateContext.Provider value={this.state}>
                        <Board onClick={(i) => this.handleClick(i)} />
                    </StateContext.Provider>
                </svg>
                <button
                    className='border border-black h-10 bg-sky-700 rounded hover:bg-sky-600 active:bg-sky-500 text-white'
                    onClick={() => this.resetClick()}>
                    إعادة اللعبة
                </button>
                {this.renderReturnButton()}
            </div>
        );
    }
}
