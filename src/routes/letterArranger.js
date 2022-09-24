import React from 'react';
import { ReturnButton } from './commonComponent';
import { letterArrangerData } from '../data/letterArrangerData';
import errorSounds from '../sounds/error-sound.mp3'
import correctSounds from '../sounds/correctSound.mp3'
import celebrationSounds from '../sounds/celebration.mp3'

function LetterPuzzelComponent({checks, letter}){
  return(
    <div className='border p-2 border-black rounded text-center font-bold text-lg w-10'>{checks?letter:"🔒"}</div>
  )
}

function LetterComponent({letter, action}){
  return(
    <button className='border p-2 border-black rounded text-center font-bold text-lg w-10 bg-slate-100 hover:brightness-110 active:brightness-90' onClick={()=> action(letter)}>{letter}</button>
  )
}

export class LetterArranger extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      score:0,
      levels:letterArrangerData,
      selectedItem:0,
      checks: Array.from({length: 3}, () => false),
      letters:[],
      allLetters:[],
      pause:false,
      mistake:0
    }
  }

  changeCheck(letter){
    let tempcheck = this.state.checks;
    let selectedItem = this.state.selectedItem
    let levels = this.state.levels
    let index = levels[selectedItem].word.indexOf(letter)
    const errorSound = new Audio(errorSounds)
    const celebrationSound = new Audio(celebrationSounds)
    const correctSound = new Audio(correctSounds)


    if (tempcheck[index] === true){
      index = levels[selectedItem].word.indexOf(letter, index+1)
    }


    if (index>=0){

      tempcheck[index] = true;
      this.setState({
        checks:tempcheck
      })

      this.updatePuzzle();

      if(tempcheck.indexOf(false) === -1){
        if (selectedItem === levels.length - 1){

          celebrationSound.play();

          this.setState({
            pause:true
          })

        } else {

          celebrationSound.play();

          this.setState({
            pause:true
          })

          setTimeout(()=>{

            this.setState({
              selectedItem: selectedItem+1
            })

          },3000)
          

        }
      }else{

        correctSound.play()

      }
      
    }else{

      let mistake = this.state.mistake;
      errorSound.play();
      this.setState({
        mistake: mistake+1
      })
      console.log("wrong Letter")

    }
  }

  updatePuzzle(){
    let tempLetters = [];
    let word = this.state.levels[this.state.selectedItem].word

    for(let i = 0; i < word.length; i++){
      tempLetters.push(<LetterPuzzelComponent key={i} checks={this.state.checks[i]} value={i} letter={word[i]} />);
    }

    this.setState({
      letters:tempLetters
    })
  }

  componentDidMount(){
    let tempLetters = [];
    let str = "أبتثجحخدذرزسشصضطظعغفقكلمنهويةا"

    for (let i = 0; i < str.length; i++) {
      tempLetters.push(<LetterComponent key={i} letter={str[i]} action={(i) => this.changeCheck(i)} />);
    }

    this.setState({
      allLetters:tempLetters
    })

    this.updatePuzzle();
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.checks !== this.state.checks){
      this.updatePuzzle();
    }

    if(prevState.selectedItem !== this.state.selectedItem){

      this.setState({
        pause:false
      })

      this.updatePuzzle()

      this.setState({
        checks: Array.from({length: this.state.levels[this.state.selectedItem].word.length}, () => false)
      })
    }

  }

  render(){
    return(
      <div className='w-full grid justify-items-center content-center gap-3 select-none'>
        <div className='p-6 grid justify-items-center align-middle md:w-1/3 w-full bg-gray-50 gap-3 rounded outline outline-black'>
            <div className='w-full text-left font-bold'>❌:{this.state.mistake}</div>
            <img src={this.state.levels[this.state.selectedItem].image} className="w-1/2 h-50" alt={this.state.levels[this.state.selectedItem].word}></img>
            <div className={`flex flex-wrap gap-3 justify-center`}>
              {this.state.letters}
            </div>
            <hr className='border border-black w-full' />
            <div className={`flex flex-wrap gap-3 justify-center`}>
              {
                this.state.pause?
                <div className='text-4xl font-bold'>
                  {this.state.selectedItem === this.state.levels.length-1? "🎉 أحسنت تم حل كل الألغاز 🎉" : "🎉 أحسنت 🎉"}
                </div>:
                this.state.allLetters
              }
            </div>
        </div>
        <div className='lg:w-1/3 w-full'>
          <ReturnButton />
        </div>
      </div>
    );
  }
}
