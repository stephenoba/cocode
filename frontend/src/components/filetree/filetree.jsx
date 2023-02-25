import React from 'react';
import './filetree.scss';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function FileTree() {
  return (
    <>
        <div className='menu'>Menu Bar</div>
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 290, flexGrow: 1, maxWidth: 500, overflowY: 'auto' }}
            className='filetree'
            >
            <TreeItem nodeId="1" label="Home">
                <TreeItem nodeId="2" label="Applications">
                    <TreeItem nodeId="3" label="Calendar" />
                </TreeItem>
                <TreeItem nodeId="4" label="Documents">
                    <TreeItem nodeId="10" label="OSS" />
                    <TreeItem nodeId="6" label="MUI">
                    <TreeItem nodeId="8" label="index.js" />
                    </TreeItem>
                </TreeItem>
            </TreeItem>
        </TreeView>
    </>
  );
}