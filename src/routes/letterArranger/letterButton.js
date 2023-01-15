export const LetterButton = ({ letter, action }) =>  {
     return (
          <button className='border p-2 border-black rounded text-center font-bold text-lg w-10 bg-slate-100 hover:brightness-110 active:brightness-90' onClick={() => action(letter)}>{letter}</button>
     )
}