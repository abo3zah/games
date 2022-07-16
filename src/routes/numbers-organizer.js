import React from 'react';
import { Link } from "react-router-dom";

function Square(props){
  let squareWidth = 40; 
  let squareHeight = 40; 
  let barHeight = 16;
  let fontSize = 16;

  return(
    <g transform={`translate(${props.randomX*(300-squareWidth)} ${props.randomY*(300-squareHeight-barHeight)+barHeight})`} onClick ={props.onClick} className={`cursor-pointer select-none hover:brightness-110 ${props.checked && "hidden "}`}>
      <rect width={`${squareWidth}px`} height={`${squareHeight}px`} fill={"rgb(253, 186, 116)"} rx={"5"} stroke={'black'} strokeWidth={'2px'}  />
      <text textAnchor={"middle"} fontSize={`${fontSize}px`} dy={`${fontSize+(squareHeight/4)}`} dx={`${squareWidth/2-1}`} fill={'white'}>{props.value}</text>
    </g>
  )
}

function GameOver(props){
  let fontSize = 30;
  let squareWidth = 300;
  let squareHeight = 300;

  return(
    <g transform={`translate(${squareWidth/2} ${squareHeight/3})`} className={`select-none`}>
      <rect fill={'white'} width="200px" height="50px" x={`-${squareWidth/3}px`} y={`-${fontSize+3}px`} rx='5px' stroke={'black'} />
      <text textAnchor={"middle"} fontSize={`${fontSize}px`} fill={'black'}>{props.gameStatus}</text>
    </g>
  )
}

class Board extends React.Component{
  renderSquare(i){
    return <Square value={i} onClick={()=> this.props.onClick(i)} randomX={this.props.randomX[i-1]} randomY={this.props.randomY[i-1]} checked={this.props.checked[i-1]} />
  }

  renderGameOver(gameStatus){
    return <GameOver gameStatus={gameStatus} />
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
        <text dy={'16px'}>{countStrike}</text>
        {squares}
      </React.Fragment>
    )
  }
}

export class NumbersOrganizer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lastNumber:3,
      countStrike:0,
      currentReading:1,
      randomX: Array.from({length: 3}, () => Math.random()),
      randomY: Array.from({length: 3}, () => Math.random()),
      checked: Array.from({length: 3}, () => false),
      gameFinished:false,
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
  
  render(){
      return(
          <div className='w-full grid justify-center items-center h-full'>
            <svg width={"300px"} height={"300px"} className='bg-gray-300 rounded outline outline-black'>
                <Board 
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
            <Link to="/" className="text-center self-start w-full bg-slate-100 border border-black rounded">
              🔙 Back
            </Link>
        </div>
      )
  }
}