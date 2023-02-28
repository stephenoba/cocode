import React from 'react';
import "./codeeditor.scss";

import Editor from "@monaco-editor/react";

// turning off auto completions
// https://stackoverflow.com/questions/41581570/how-to-remove-autocompletions-for-monaco-editor-using-javascript


const CodeEditor = ({files, file, openedFiles, onOpen, onClose}) => {    
    function handleEditorChange(value, event) {
        console.log("here is the current model value:", value);
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
                  onChange={handleEditorChange}
                />
              ) : (
                <Editor
                  height="80vh"
                  theme='vs-dark'
                  path='file'
                  defaultValue=''
                  onChange={handleEditorChange}
                />
              )}
        </>
    )
}

export default CodeEditor;