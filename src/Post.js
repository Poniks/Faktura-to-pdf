import React, { useState } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import PDF from './PDF'

const Post = () => {
    let newDate = new Date()
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    let newDay;
    if(day<10) {
        newDay = `0${day}`;
    } else newDay = day;

    let newMonth;
    if(month<10) {
        newMonth = `0${month}`;
    } else newMonth = month;

    const [state, setState] = useState({
        title: '',
        content: '',
        postSubmitted: false,
        document: 'Faktura',
        numer: '01/02/2021',
        city: '',
        dateSell: `${year}-${newMonth}-${newDay}`,
        dateIssue: `${year}-${newMonth}-${newDay}`,
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
                            onChange={handleChange('document')}
                            variant="outlined"
                            size="medium"
                        >
                            {documents.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Numer"
                            rowsMax={4}
                            value={state.numer}
                            onChange={handleChange('numer')}
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Miejsce wystawienia"
                            rowsMax={4}
                            value={state.city}
                            onChange={handleChange('city')}
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Data wystawienia"
                            rowsMax={4}
                            type='date'
                            value={state.dateIssue}
                            onChange={handleChange('dateIssue')}
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Data sprzedaży"
                            format="dd/mm/yyyy"
                            rowsMax={4}
                            type='date'
                            value={state.dateSell}
                            onChange={handleChange('dateSell')}
                            variant="outlined"
                        />
                    </div>
                </div>)
                :
                (<PDF title={state.title} content={state.content} />)
            }
        </>
    )
}

export default Post;