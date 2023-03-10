import React from 'react';
import { useState } from 'react';
import "./space.scss"

import Navbar from '../../components/navbar/navbar';
import CodeEditor from '../../components/codeeditor/codeeditor';
import FileBrowser from '../../components/filebrowser/filebrowser';

import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';

const files = [
    {
        id: 2,
        name: "Home",
        language: null,
        value: null,
        size: 10,
        parent: null,
        children: [
            {
                id: 6,
                name: "c_files",
                language: null,
                value: null,
                size: 10,
                parent: 2,
                children: [
                    {
                        id: 7,
                        name: "main.c",
                        language: "c",
                        value: "int main(void){printf('%s', 'Hello World')}",
                        size: 10,
                        parent: 6,
                        children: [],
                        isOpen: false,
                        isDirectory: false,
                    }
                ],
                isOpen: false,
                isDirectory: true,
            },
            {
              id: 3,
              name: "script.js",
              language: "javascript",
              value: "console.log('Hello World')",
              size: 10,
              parent: 2,
              children: [],
              isOpen: false,
              isDirectory: false,
            },
            {
              id: 4,
              name: "style.css",
              language: "css",
              value: "div {border: 2px solid red;}",
              size: 10,
              parent: 2,
              children: [],
              isOpen: false,
              isDirectory: false,
            },
            {
              id: 5,
              name: "index.html",
              language: "html",
              value: "<div>Hello World</div>",
              size: 10,
              parent: 2,
              children: [],
              isOpen: false,
              isDirectory: false,
            },
        ],
        isOpen: false,
        isDirectory: true,
    },
];

const openedFiles = [];


const Space = () => {
    const [file, setFile] = useState(null);
    const [cwd, setCWD] = useState(files[0]);
    const [ spaceName, setSpaceName ] = useState(() => window.location.pathname.split("/")[2]);

    const handleOpenFile = (file) => {
        if (file.isDirectory) {
            setCWD(file);
        } else {
            if (!file.isOpen){
                file.isOpen = true;
                openedFiles.push(file);
            }
            const cachedFile = localStorage.getItem(spaceName + file.name)
            if (!cachedFile) {
                localStorage.setItem(spaceName + file.name, JSON.stringify(file))
            } else {
                file = JSON.parse(cachedFile)
            }
            setFile(file)
        }
    }

    const handleCoseFile = (file) => {
        setFile(null);
        file.isOpen = false;
    }

    return (
        <div className='space'>
            <div className='navbar-container'>
                <Navbar/>
            </div>
            <div className='environment'>
                <div className='editor-container'>
                    <div className='titlebar'>
                        <div className='space-info'><InfoIcon className='icon'/></div>
                        <div className='controls'>
                            <PeopleIcon className='icon'/>
                            <button>End/Leave</button>
                        </div>
                    </div>
                    <CodeEditor
                        files={files}
                        file={file}
                        openedFiles={openedFiles}
                        onOpen={handleOpenFile}
                        onClose={handleCoseFile}
                        spaceName={spaceName}
                    />
                </div>
                <div className='filetree-container'>
                    <FileBrowser
                        files={files}
                        onOpen={handleOpenFile}
                        className="filebrowser"
                        cwd={cwd}
                    />
                </div>
                <div className='chat-container'>
                    Chat
                </div>
            </div>
        </div>
    )
}

export default  Space;