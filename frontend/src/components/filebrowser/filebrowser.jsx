import React from 'react';
import './filebrowser.scss';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const renderFileBrowserTree = (files, onOpen) => {
    return files.map(file => {
        let children = undefined;
        if (file.children && file.children.length > 0) {
          children = renderFileBrowserTree(file.children, onOpen);
        }
        if (file.isDirectory) {
            return (
                <TreeItem
                    key={file.id}
                    nodeId={file.id.toString()}
                    onClick={() => onOpen(file)}
                    label={file.name}
                    children={children}
                />
            );
        } else {
            return (
                <TreeItem 
                    key={ file.id }
                    onDoubleClick={() => onOpen(file)} 
                    label={file.name} 
                    nodeId={file.id.toString()}
                />
            );
        }
    });
};

// temp to track id
let _id = 18;


export default function FileBrowser({files, onOpen, cwd}) {
    function addNewDirectory() {
        console.log("Pushed");
        _id++;
        const newDir = {
            id: _id,
            name: "new_folder",
            language: null,
            value: null,
            size: 10,
            children: [],
            isOpen: false,
            isDirectory: true,
        };
        cwd.children.push(newDir);
    }

    return (
        <>
            <div className='menu'>
                <PostAddIcon/>
                <CreateNewFolderIcon onClick={addNewDirectory}/>
                <DeleteForeverIcon/>            
            </div>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 250, flexGrow: 1, maxWidth: 500, overflowY: 'auto' }}
                className='filebrowser'
                >
                {renderFileBrowserTree(files, onOpen)}
            </TreeView>
        </>
    );
}