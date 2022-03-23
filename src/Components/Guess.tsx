import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import styles from '../Styles/Guess.module.css';

interface props {
    color: string;
    onMakeGuess: Function;
    textColor: string
}

const Guess = ({color, textColor = "white", onMakeGuess}: props) => {
    return (
            <div className={styles.guess}>
                <button style={{backgroundColor: color, color: textColor}} onClick={() => onMakeGuess(true)} className="btn"
                        id="higherButton">Higher<FaCaretUp className={styles.arrowUp}/></button>
                <button style={{backgroundColor: color, color: textColor}} onClick={() => onMakeGuess(false)} className="btn"
                        id="lowerButton">Lower<FaCaretDown className={styles.arrowDown}/></button>
            </div>
    )
}

export default Guess;