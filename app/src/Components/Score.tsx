interface props {
    score : number
}

const Score = ({score} : props) => {
    return (
        <div className = "score border"><h3>Score: {score}</h3></div>
    )
}

export default Score;