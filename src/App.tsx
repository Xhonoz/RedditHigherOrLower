import React, {useEffect, useState} from 'react';
import './App.css';
import {Subreddit} from "./Models/Subreddit";
import SubRedditCard from "./Components/SubRedditCard";
import Subcount from "./Components/Subcount";
import Guess from "./Components/Guess";
import Score from "./Components/Score";
import {Route, Routes, useNavigate} from "react-router-dom";
import Lose from "./Components/Lose";
import MiddleCircle from "./Components/MiddleCircle";
import colorTooDark from "./Utils";

const App = () => {

    const [leftSubreddit, setLeftSubreddit] = useState<Subreddit>();
    const [rightSubreddit, setRightSubreddit] = useState<Subreddit>();
    const [nextSubreddit, setNextSubreddit] = useState<Subreddit>();
    const [prevSubreddit, setPrevSubreddit] = useState<Subreddit>();

    const navigate = useNavigate();

    const [score, setScore] = useState<number>(0);
    const [readyForGuess, setReadyForGuess] = useState<boolean>(true);
    const [winning, setWinning] = useState<boolean>(false)
    const [losing, setLosing] = useState<boolean>(false)

    useEffect(() => {
        const init = async () => {
            if (!leftSubreddit) setLeftSubreddit(await getRandomSubreddit());
            if (!rightSubreddit) setRightSubreddit(await getRandomSubreddit());
            if (!nextSubreddit) setNextSubreddit(await getRandomSubreddit());
        }
        init();
    }, [leftSubreddit, rightSubreddit, nextSubreddit]);


    const getRandomSubreddit = async (): Promise<Subreddit> => {
        const res = await fetch('https://reddit-api-2s4nznz6h-xhonoz.vercel.app/Random',{
            headers: {
            'Content-Type': 'application/json'
        }},);
        return (await res.json()).data.data;
    }

    const setNewSubreddit = async () => {
        setPrevSubreddit(leftSubreddit);
        setLeftSubreddit(rightSubreddit);
        setRightSubreddit(nextSubreddit);
        const newSub = await getRandomSubreddit();
        setNextSubreddit(newSub);
    }

    const playAgain = () => {
        setScore(0);
        navigate('/');
    }

    const makeGuess = (higher: boolean) => {
        if (rightSubreddit && leftSubreddit) {
            setReadyForGuess(false);
            if ((higher && (rightSubreddit?.subscribers >= leftSubreddit?.subscribers)) || (!higher && ((rightSubreddit?.subscribers <= leftSubreddit?.subscribers)))) {
                setScore(score + 1);
                setTimeout(function () {
                    setWinning(true);

                }, 1500);
                setTimeout(function () {
                    setWinning(false);
                    setReadyForGuess(true);
                    setNewSubreddit();
                }, 2500);
            } else {
                setTimeout(function () {
                    setLosing(true);
                }, 1500);
                setTimeout(function () {
                    setLosing(false);
                    setNewSubreddit();
                    setReadyForGuess(true);
                    navigate('/lose');
                }, 2500);
            }
        }
    }

    const getBackgroundColor =( subreddit : Subreddit | undefined) =>{
        if(subreddit?.key_color && !colorTooDark(subreddit?.key_color))
            return subreddit.key_color;
        if(subreddit?.banner_background_color && !colorTooDark(subreddit?.banner_background_color))
            return subreddit.banner_background_color;
        return "";
    }

    return (
        <>
            <div>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <>
                                <div style={{backgroundColor: getBackgroundColor(prevSubreddit)}} className="split left prev">
                                    <div className="section">
                                        {prevSubreddit && <SubRedditCard subreddit={prevSubreddit}></SubRedditCard>}
                                        {prevSubreddit && <Subcount subreddit={prevSubreddit} countUp={false}></Subcount>}
                                    </div>
                                </div>
                                <div style={{backgroundColor: getBackgroundColor(leftSubreddit)}}
                                     className={
                                         "split left " +
                                         (readyForGuess && prevSubreddit ? "movingCard " : "")
                                     }>
                                    <div className="section">
                                        {leftSubreddit && <SubRedditCard subreddit={leftSubreddit}></SubRedditCard>}
                                        {leftSubreddit && <Subcount subreddit={leftSubreddit} countUp={false}></Subcount>}
                                    </div>
                                </div>
                                <div style={{backgroundColor: getBackgroundColor(rightSubreddit)}}
                                     className="split right">
                                    <div className="section">
                                        {rightSubreddit && <SubRedditCard subreddit={rightSubreddit}></SubRedditCard>}
                                        {readyForGuess ?
                                            (rightSubreddit &&
                                                <Guess color={rightSubreddit.primary_color} onMakeGuess={makeGuess}/>)
                                            : (rightSubreddit && <Subcount subreddit={rightSubreddit} countUp={true}></Subcount>)}
                                    </div>
                                </div>
                                <Score score={score}/>
                                <MiddleCircle win={winning} lose={losing}/>
                            </>
                        }/>
                    <Route path='/lose' element={<Lose score={score} onPlayAgain={playAgain}/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
