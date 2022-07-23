import React from 'react';
import { Link } from "react-router-dom";

function Square(props){
  let squareWidth = 40; 
  let squareHeight = 40; 
  let barHeight = 20;
  let fontSize = 16;

  return(
    <g transform={`translate(${props.randomX*(props.SVGWidth-(2*props.padding)-squareWidth)} ${props.randomY*(props.SVGHeight-(2*props.padding)-squareHeight-barHeight)+barHeight})`} onClick ={props.onClick} className={`cursor-pointer select-none hover:brightness-105 transition-all ease-linear duration-300 ${props.checked && ` scale-50 z-[${10*props.value}]`}`}>
      <rect width={`${squareWidth}px`} height={`${squareHeight}px`} fill={"rgb(253, 170, 110)"} rx={"5"} stroke={'white'} strokeWidth={'0.5px'}  />
      <text textAnchor={"middle"} fontSize={`${fontSize}px`} dy={`${fontSize+(squareHeight/4)}`} dx={`${squareWidth/2-1}`} fill={'white'}>{props.checked ? props.currentReading - 1 : props.value}</text>
    </g>
  )
}

function GameOver(props){
  let fontSize = 30;
  let xShift = props.SVGWidth/5;

  return(
    <g transform={`translate(${props.SVGWidth/2} ${props.SVGHeight/4})`} className={`select-none`}>
      <rect fill={'white'} width={`${props.SVGWidth-xShift}px`} height={`${fontSize*1.8}px`} x={`${-props.SVGWidth/2 + xShift/2}px`} y={`${0}px`} rx='5px' stroke={'black'} />
      <text textAnchor={"middle"} y={`${fontSize*1.2}`} fontSize={`${fontSize}px`} fill={'black'}>{props.gameStatus}</text>
    </g>
  )
}

class Board extends React.Component{

  renderSquare(i){
    return <Square 
              key={i.toString()}
              value={i}
              onClick={()=> this.props.onClick(i)}
              randomX={this.props.randomX[i-1]}
              randomY={this.props.randomY[i-1]}
              SVGHeight = {this.props.SVGHeight}
              SVGWidth = {this.props.SVGWidth}
              padding = {this.props.padding}
              checked={this.props.checked[i-1]}
              currentReading = {this.props.currentReading} />
  }

  renderGameOver(gameStatus){
    return <GameOver 
              SVGHeight = {this.props.SVGHeight}
              SVGWidth = {this.props.SVGWidth}
              padding = {this.props.padding}
              gameStatus={gameStatus} />
  }

  render(){
    let squares = [];
    let countStrike;
    let gameStatus;

    if (this.props.gameFinished === false){
      countStrike = Array.from({length: this.props.countStrike}, () => '❌').join('');
      for(let i = this.props.lastNumber; i > 0; i--){
        squares.push(this.renderSquare(i));
      }
    } else {
      countStrike = "";
      gameStatus = this.props.currentReading === this.props.lastNumber? "🙌You Won🙌" : "😭You Lost😭" 
      squares = this.renderGameOver(gameStatus);
    }

    return(
      <React.Fragment>
        <text dy={'16px'} x={`${this.props.SVGWidth-this.props.padding-(22*this.props.countStrike)}px`}>{countStrike}</text>
        {squares}
      </React.Fragment>
    )
  }
}

export class NumbersOrganizer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lastNumber:10,
      countStrike:0,
      currentReading:1,
      randomX: Array.from({length: 10}, () => Math.random()),
      randomY: Array.from({length: 10}, () => Math.random()),
      checked: Array.from({length: 10}, () => false),
      gameFinished:false,
      SVGWidth:300,
      SVGHeight:400,
      padding:4,
    }
  }

  handleClick(i){
    let checked = this.state.checked.slice();
    let countStrike = this.state.countStrike;
    if (this.state.currentReading===i){
      checked[i-1] = true;
      this.setState({
        currentReading:i===this.state.lastNumber?i:i+1,
        checked:checked,
        gameFinished:i===this.state.lastNumber,
      })
    } else {
      countStrike += 1;
      this.setState({
        countStrike:countStrike,
        gameFinished:countStrike===3,
      })

    }
  }

  resetClick(){
    this.setState({
      lastNumber:10,
      countStrike:0,
      currentReading:1,
      randomX: Array.from({length: 10}, () => Math.random()),
      randomY: Array.from({length: 10}, () => Math.random()),
      checked: Array.from({length: 10}, () => false),
      gameFinished:false,
    });
  }
  
  render(){
      return(
          <div className='w-full grid justify-center content-center h-full gap-3 select-none'>
            <svg width={`${this.state.SVGWidth}px`} height={`${this.state.SVGHeight}px`} className={`bg-gray-300 rounded border-black border-2 p-[${this.state.padding}px]`}>
                <Board 
                  SVGWidth = {this.state.SVGWidth}
                  SVGHeight = {this.state.SVGHeight}
                  padding = {this.state.padding}
                  lastNumber={this.state.lastNumber}
                  onClick = {(i) => this.handleClick(i)}
                  randomX = {this.state.randomX} 
                  randomY = {this.state.randomY}
                  checked = {this.state.checked}
                  countStrike = {this.state.countStrike}
                  gameFinished = {this.state.gameFinished}
                  currentReading = {this.state.currentReading}
                />
            </svg>
            <button className='border border-black h-10 bg-sky-700 rounded hover:bg-sky-600 active:bg-sky-500 text-white' onClick={() => this.resetClick()}>RESTART</button>
            <Link to="/" className="text-center self-start w-full bg-slate-100 border border-black rounded">
              🔙 Back
            </Link>
        </div>
      )
  }
}