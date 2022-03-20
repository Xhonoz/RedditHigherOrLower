import {FaCheck, FaTimes} from "react-icons/fa";

interface props {
    win: boolean,
    lose: boolean
}

const MiddleCircle = ({win, lose} : props) => {

    if(win)
        return (<span className="center dot winDot"><FaCheck className="check" size={50}/></span>)
    if(lose)
        return (<span className="center dot loseDot"><FaTimes className="times" size={50}/></span>)
    return (
    <span className="center dot"><h1>VS</h1></span>
    )
}

export default MiddleCircle;