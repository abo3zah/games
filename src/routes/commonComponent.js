import { Link } from "react-router-dom";

export function ReturnButton(){
     return(
       <Link to="/" className="text-center self-start w-full bg-slate-100 border border-black rounded h-10 grid items-center">
         Back to Home
       </Link>
     )
}