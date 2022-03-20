import {Subreddit} from "../Models/Subreddit";
import CountUp from "react-countup";

interface Props {
    subreddit: Subreddit;
    countUp : boolean;
}

const SubRedditCard = ({subreddit, countUp}: Props) => {

    return (
        <div className="subcount border">
            <h3>Has</h3>
            {countUp ?
            <h1><CountUp duration={1} end={subreddit.subscribers} separator=" " /></h1>
                :
            <h1>{subreddit.subscribers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h1>
            }
            <h3>Members</h3>
        </div>
    );
}

export default SubRedditCard;