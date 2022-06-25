import React from 'react';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './FormPopup.css'

const FormPopup = () => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
const [url, setUrl] = useState('')
const [description, setDescription] = useState('')

    const handleSubmit = (evt) => {
        evt.preventDefault()
        dispatch({
            type: "ADD_MOVIE",
            payload: {
                title: title,
                url: url,
                description: description
            }
        })
        
    }
    
    return (
        <Popup
        trigger={<button className="button"> Add Movie </button>}
        modal
        nested
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header">Add Movie</div>
            <div className="content">
                <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={evt => setTitle(evt.target.value)}/>
                <input type="text" name='url' onChange={evt => setUrl(evt.target.value)}/>
                <textarea id="w3review" name="w3review" rows="4" cols="50" onChange={evt => setDescription(evt.target.value) }/>
                <button
                className="button"
                type='submit'
              >
                Add Movie
              </button>
                </form>
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  console.log('modal closed ');
                  close();
                }}
              >
                close modal
              </button>
            </div>
          </div>
        )}
      </Popup>
    )
}

export default FormPopup;