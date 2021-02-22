import React, { useState } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import PDF from './PDF'

const Post = () => {
    const [state, setState] = useState({
        title: '',
        content: '',
        postSubmitted: false,
        document: 'Faktura',
    });

    const handleChange = input => e => {
        setState({
            ...state,
            [input]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        if(!state.content || !state.title){
            alert('All fields are required!');
            e.preventDefault();
        } else {
            setState({
                ...state,
                postSubmitted: true,
            })
        }
    }

    const documents = [
        {
          value: 'Faktura',
        },
        {
          value: 'Faktura VAT',
        },
      ];


    return(
        <>  
            { !state.postSubmitted ?
                (<div className="box-inputs">
                    <div className="nwm">
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Dokument"
                            value={state.document}
                            onChange={handleChange}
                            variant="outlined"
                            size="medium"
                        >
                            {documents.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>)
                :
                (<PDF title={state.title} content={state.content} />)
            }
        </>
    )
}

export default Post;