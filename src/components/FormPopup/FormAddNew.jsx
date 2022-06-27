import { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
  

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
    m: 3
  };
const FormAddNew = () => {
    useEffect(() => {
        dispatch({ type: "FETCH_GENRES"});
      }, []);
    const genres = useSelector(store => store.genres)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')

    const clearForm = () => {
        setTitle('')
        setUrl('')
        setDescription('')
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        dispatch({
            type: "ADD_MOVIE",
            payload: {
                title: title,
                poster: url,
                description: description
            }
        })
        handleClose();
        clearForm()
    }


    console.log(genres)
    return (
        <div>
                <Button variant="text" onClick={handleOpen}>Add New Movie</Button>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    
                    <Box sx={style} component="form" onSubmit={(evt) => {handleSubmit(evt)}}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            Add New Movie
                        </Typography>
                    <TextField className="form-input" id="outlined-basic" label="Title" variant="outlined" onChange={evt => setTitle(evt.target.value)}/>
                    
                    <TextField className="form-input" id="outlined-basic" label="Image URL" variant="outlined" onChange={evt => setUrl(evt.target.value)}/>

                    <TextField
                    className="form-input"
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    
                    onChange={evt => setDescription(evt.target.value)}
                    />
                    <Button variant="text" type='submit' className="form-input">
                    Add Movie
                    </Button>
                    </Box> 
                  
                </Modal>

            </div>
       
    )
}

export default FormAddNew