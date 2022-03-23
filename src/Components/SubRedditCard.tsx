import {Subreddit} from "../Models/Subreddit";
import {FaQuestionCircle} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import {truncate, getImgUrl} from '../Utils';
import styles from '../Styles/SubRedditCard.module.css'

interface Props {
    subreddit: Subreddit;
}

const SubRedditCard = ({subreddit}: Props) => {

    function usePrevious({subreddit} : Props) {
        const ref = useRef<Subreddit>();
        useEffect(() => {
                ref.current = subreddit;
        });
        return ref.current;
    }

    const getDescription = (maxLength : number) =>{
        return truncate(subreddit.public_description, maxLength);
    };

    const [description, setDescription] = useState<string>(subreddit.public_description);
    const [descriptionSize, setDescriptionSize] = useState<number>(150);
    const prevSubReddit = usePrevious({subreddit});

    useEffect(() => {
            setDescription(getDescription(descriptionSize));
    },  [getDescription, descriptionSize]);

    useEffect(() => { //Reset description size on loading new subreddit
        if(subreddit !== prevSubReddit)
            setDescriptionSize(150);
    }, [subreddit, prevSubReddit]);



    const toggleExpandDescription = () =>{
        if(descriptionSize > 200)
            setDescriptionSize(150);
        else
            setDescriptionSize(500);
    }

    const imgUrl = getImgUrl(subreddit);

    return (
        <div className={styles.card}>
            <a href={"https://www.reddit.com/" + subreddit.display_name_prefixed} target="_blank" rel={"noopener"}>
            {imgUrl !== "" && imgUrl !== undefined && imgUrl !== null ? <img alt={subreddit.display_name + " icon"} src={imgUrl}/> : <FaQuestionCircle></FaQuestionCircle>}
            <h1 >{subreddit.display_name_prefixed}</h1>
            </a>
            <p onClick={toggleExpandDescription}>{description}</p>
        </div>
    );
}

export default SubRedditCard;