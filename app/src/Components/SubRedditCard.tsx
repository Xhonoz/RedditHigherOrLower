import {Subreddit} from "../Models/Subreddit";
import {FaQuestionCircle} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";

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

    const [description, setDescription] = useState<string>(subreddit.public_description);
    const [descriptionSize, setDescriptionSize] = useState<number>(150);
    const prevSubReddit = usePrevious({subreddit});

    useEffect(() => {
            setDescription(getDescription(descriptionSize));
    });

    useEffect(() => { //Reset description size on loading new subreddit
        if(subreddit !== prevSubReddit)
            setDescriptionSize(150);
    }, [subreddit]);


    const getImgUrl = () =>{
        if(subreddit.icon_img !== "")
            return subreddit.icon_img;
        if(subreddit.community_icon !== "")
            return subreddit.community_icon;
        if(subreddit.header_img !== "")
            return subreddit.header_img;
       return "";
    }

    function truncate(str : string, n : number){
        return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    };

    const getDescription = (maxLength : number) =>{
            return truncate(subreddit.public_description, maxLength);
    };

    const toggleExpandDescription = () =>{
        if(descriptionSize > 200)
            setDescriptionSize(150);
        else
            setDescriptionSize(500);
    }

    const imgUrl = getImgUrl();

    return (
        <div className="card border">
            <a href={"https://www.reddit.com/" + subreddit.display_name_prefixed} target="_blank">
            {imgUrl !== "" && imgUrl !== undefined && imgUrl !== null ? <img src={getImgUrl()}/> : <FaQuestionCircle size={150}></FaQuestionCircle>}
            <h1 >{subreddit.display_name}</h1>
            </a>
            <p onClick={toggleExpandDescription}>{description}</p>
        </div>
    );
}

export default SubRedditCard;