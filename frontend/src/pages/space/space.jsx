import React from 'react';
import "./space.scss"

import Editor from '../../components/editor/editor';
import ThemeSelect from '../../components/themeselect/themeselect';

const Space = () => {
    return (
        <div className='space'>
            <div className='navbar-container'>
                Navbar
            </div>
            <div className='environment'>
                <div className='editor-container'>
                    <div className='titlebar'>
                        <div className='breadcrumb'>{"This > is > a > breadcrumb"}</div>
                        <div className='theme-container'>
                            <ThemeSelect/>
                        </div>
                    </div>
                    <Editor/>
                </div>
                <div className='doctree-container'>
                    Document system
                </div>
                <div className='chat-container'>
                    Chat
                </div>
            </div>
        </div>
    )
}

export default  Space;