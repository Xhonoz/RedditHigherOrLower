import {Subreddit} from "./Models/Subreddit";

export const colorTooDark = (c : string | undefined) : boolean =>{
    if(!c) return false;

    c = c.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    if (luma < 40) {
        return true;
    }
    return false;
}

export const colorTooLight = (c : string | undefined) : boolean =>{
    if(!c) return false;

    c = c.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    console.log(c);
    if (luma > 200) {
        console.log("too light " + luma);
        return true;
    }
    return false;
}

export const getBackgroundColor =( subreddit : Subreddit | undefined) : string =>{
    if(subreddit?.key_color && !colorTooDark(subreddit?.key_color))
        return subreddit.key_color;
    if(subreddit?.banner_background_color && !colorTooDark(subreddit?.banner_background_color))
        return subreddit.banner_background_color;
    return "";
}


export const getImgUrl = (subreddit: Subreddit) : string =>{
    if(subreddit.icon_img !== "")
        return subreddit.icon_img;
    if(subreddit.community_icon !== "")
        return subreddit.community_icon;
    if(subreddit.header_img !== "")
        return subreddit.header_img;
    return "";
}

export function truncate(str : string, n : number) : string{
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

