import {FaCheck, FaTimes} from "react-icons/fa";
import styles from '../Styles/MiddleCircle.module.css';

interface props {
    win: boolean,
    lose: boolean
}

const MiddleCircle = ({win, lose} : props) => {

    if(win)
        return (<span className={`${styles.center} ${styles.dot} ${styles.winDot}`}><FaCheck className={styles.check}/></span>)
    if(lose)
        return (<span className={`${styles.center} ${styles.dot} ${styles.loseDot}`}><FaTimes className={styles.times}/></span>)
    return (
    <span className={`${styles.center} ${styles.dot}`}><h1>VS</h1></span>
    )
}

export default MiddleCircle;