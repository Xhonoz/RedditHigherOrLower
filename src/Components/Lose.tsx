interface props {
    score: number
    onPlayAgain: Function
}

const Lose = ({score, onPlayAgain}: props) => {
    return (
        <div className="loseBackground">
            <div className="lose">
                <h1>You scored: {score}</h1>
                <button className="btn" onClick={() => onPlayAgain()}>Play again</button>
            </div>
        </div>
    )
}

export default Lose;