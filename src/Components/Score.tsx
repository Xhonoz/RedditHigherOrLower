import styles from '../Styles/Score.module.css'

interface props {
    score : number
}

const Score = ({score} : props) => {
    return (
        <div className = {styles.score}><h3>Score: {score}</h3></div>
    )
}

export default Score;