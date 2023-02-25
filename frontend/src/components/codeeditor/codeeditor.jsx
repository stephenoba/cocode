import React from 'react';
import { useState } from 'react';
import "./codeeditor.scss";

import Editor from "@monaco-editor/react";

// turning off auto completions
// https://stackoverflow.com/questions/41581570/how-to-remove-autocompletions-for-monaco-editor-using-javascript

const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: "console.log('Hello World')",
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: "div {border: 2px solid red;}",
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: "<div>Hello World</div>",
    },
  }

const CodeEditor = () => {
    const [fileName, setFileName] = useState("script.js");

    const file = files[fileName];
    
    function handleEditorChange(value, event) {
        console.log("here is the current model value:", value);
    }

    return (
        <>
            <button disabled={fileName === "script.js"} onClick={() => setFileName("script.js")}>script.js</button>
            <button disabled={fileName === "style.css"} onClick={() => setFileName("style.css")}>style.css</button>
            <button disabled={fileName === "index.html"} onClick={() => setFileName("index.html")}>index.html</button>
            <Editor
                height="80vh"
                theme='vs-dark'
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                onChange={handleEditorChange}
            />
        </>
    )
}

export default CodeEditor;