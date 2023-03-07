import React from 'react';
import "./codeeditor.scss";

import Editor from "@monaco-editor/react";
import useWebSocket from 'react-use-websocket';

import { WS_URL } from '../../services/BaseService';

// turning off auto completions
// https://stackoverflow.com/questions/41581570/how-to-remove-autocompletions-for-monaco-editor-using-javascript


const CodeEditor = ({files, file, openedFiles, onOpen, onClose, spaceName}) => {
  const fileToEdit = file || {name: "", value: ""};
  const roomName = spaceName + "/" + fileToEdit.name;
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL + roomName, {
    share: true
  });

  let code = lastJsonMessage?.message || fileToEdit.value;

  function handleEditorChange(value, event) {
    const cachedFile = JSON.parse(localStorage.getItem(spaceName + fileToEdit.name))
    cachedFile.value = value
    localStorage.setItem(spaceName + fileToEdit.name, JSON.stringify(cachedFile))
    onOpen(cachedFile)
    sendJsonMessage({
      type: 'content_change',
      content: value,
    });
  }

  return (
      <>
          {
              openedFiles.map(
                  (f) => (
                    <button
                      className='code-tab'
                      key={f.id}
                      disabled={f.name === file.name}
                      onClick={() => onOpen(f)}>
                        {f.name}
                        {/* <span className='close' onClick={(e) => {e.preventDefault(); onClose(f.name)}}>X</span> */}
                    </button>
                  )
              )
          }
          {
            file ? (
            <Editor
                height="80vh"
                theme='vs-dark'
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                value={code}
                onChange={handleEditorChange}
              />
            ) : (
              <Editor
                height="80vh"
                theme='vs-dark'
                path='file'
                defaultValue=''
                value={code}
                onChange={handleEditorChange}
              />
            )}
      </>
  )
}

export default CodeEditor;