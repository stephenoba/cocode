import React from 'react';
import "./space.scss"

import Navbar from '../../components/navbar/navbar';
import CodeEditor from '../../components/codeeditor/codeeditor';
import FileTree from '../../components/filetree/filetree';

const Space = () => {
    return (
        <div className='space'>
            <div className='navbar-container'>
                <Navbar/>
            </div>
            <div className='environment'>
                <div className='editor-container'>
                    <div className='controls'>Environment Controls</div>
                    <CodeEditor/>
                </div>
                <div className='filetree-container'>
                    <FileTree className="filetree"/>
                </div>
                <div className='chat-container'>
                    Chat
                </div>
            </div>
        </div>
    )
}

export default  Space;