import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/navbar/navbar';

import { pingServer } from '../../services/SpaceService';

import './dashboard.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
};

async function testAPI(data) {
    const res = await pingServer(data);
    return res.data.data;
}

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [codeInputValue, setCodeInputValue] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const handleCodeInputChange = (e) => {
        setCodeInputValue(e.target.value);
    }

    async function handleJoinSpace() {
        const code = await testAPI(codeInputValue);
        navigate(`/spaces/${code}`);
    }
    
    return (
        <div>
            <Navbar/>
            <div className='actions'>
                <Button variant='contained' onClick={handleOpen}>Join a Space</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" className='modal-title' variant="h6" component="h2">
                            Join a Space
                        </Typography>
                        <TextField fullWidth id="outlined-basic" label="Code" variant="outlined" onChange={handleCodeInputChange}/>
                        <Button type='submit' variant='outlined' color='success' onClick={handleJoinSpace}>Join</Button>
                    </Box>
                </Modal>
                <Button variant='outlined'>Create a Space</Button>
            </div>
        </div>
    )
};

export default Dashboard;