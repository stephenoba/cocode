import React from "react";
import "./navbar.scss"

import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search"/>
                    <SearchIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageIcon className="icon"/>
                        English
                    </div>
                    <div className="item">
                        <NotificationsNoneIcon className="icon"/>
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineIcon className="icon"/>
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <DarkModeIcon className="icon"/>
                    </div>
                    { user ? (
                        <div className="item">
                            <button onClick={logoutUser}>Logout</button>
                        </div>
                    ) : (
                        <div></div>
                    ) }
                    <div className="item">
                        <img 
                        src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                        alt=""
                        className="avatar" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar