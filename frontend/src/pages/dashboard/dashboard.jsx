import React from 'react';
import { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";

import Navbar from '../../components/navbar/navbar';

import { joinSpace } from '../../services/SpaceService';

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

async function join(data, token) {
    const res = await joinSpace(data, token);
    if (data === res.code) {
        return res.code;
    }
}

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [spaces, setSpaces] = useState(null)
    const [codeInputValue, setCodeInputValue] = useState('');
    const { authToken } = useContext(AuthContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    useEffect(() => {
        fetch('api/v1/spaces', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${authToken.token}`},
        })
        .then(resp => resp.json())
        .then(data => setSpaces(data))
    }, [authToken])

    const handleCodeInputChange = (e) => {
        setCodeInputValue(e.target.value);
    }
    
    async function handleJoinSpace(spaceCode) {
        const code = await join(spaceCode, authToken.token);
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
                        <Button type='submit' variant='outlined' color='success' onClick={() => (handleJoinSpace(codeInputValue))}>Join</Button>
                    </Box>
                </Modal>
                <Button variant='outlined'>Create a Space</Button>
            </div>
            <div>
                {
                    spaces ? (
                        spaces.map((space) => (
                            <Card variant='outlined' key={space.code} sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {space.owner}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {space.code}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={() => (handleJoinSpace(space.code))}
                                        size="small">Open</Button>
                                </CardActions>
                            </Card>
                        ))
                    ) : (
                        <h1>No Current Spaces</h1>
                    )
                }
            </div>
        </div>
    )
};

export default Dashboard;