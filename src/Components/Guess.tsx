import {FaCaretDown, FaCaretUp} from "react-icons/fa";


interface props {
    color: string;
    onMakeGuess: Function;
}

const Guess = ({color, onMakeGuess}: props) => {
    return (
            <div className="guess">
                <button style={{backgroundColor: color}} onClick={() => onMakeGuess(true)} className="btn"
                        id="higherButton">Higher<FaCaretUp id="arrowUp" className="arrowUp" size={30}/></button>
                <button style={{backgroundColor: color}} onClick={() => onMakeGuess(false)} className="btn"
                        id="lowerButton">Lower<FaCaretDown id="arrowDown" className="arrowDown" size={30}/></button>
            </div>
    )
}

export default Guess;