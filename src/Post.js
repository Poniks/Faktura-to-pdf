import React, { useState } from 'react';
import { TextField, Button, MenuItem, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table, FormGroup, IconButton } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
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
        title: 'Faktura',
        content: 'milion dolaruuf',
        postSubmitted: false,
        document: 'Faktura',
        numer: '01/02/2021',
        city: '',
        dateSell: `${year}-${newMonth}-${newDay}`,
        dateIssue: `${year}-${newMonth}-${newDay}`,
        inputList: [['', '']],
    });

    const handleInputChange = (e, index, innerIndex) => {
        const { value } = e.target;
        const list = [...state.inputList];
        list[index][innerIndex] = value;
        setState({ ...state, inputList: list });
      };

    const handleRemoveClick = (index) => {
        const list = [...state.inputList];
        list.splice(index, 1);
    
        setState({ ...state, inputList: list });
      };

    const handleAddClick = () => {
        setState({
          ...state,
          inputList: [...state.inputList, ['', '']],
        });
      };

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
                    <div className="nwm1">
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
                            label="Data wystawienia"
                            rowsMax={4}
                            type='date'
                            value={state.dateIssue}
                            onChange={handleChange('dateIssue')}
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
                            label="Data sprzedaży"
                            rowsMax={4}
                            type='date'
                            value={state.dateSell}
                            onChange={handleChange('dateSell')}
                            variant="outlined"
                        />
                    </div>
                    <div className="nwm2">
                        <div className="items">
                            <div className="item">
                                <p>Sprzedawca</p>
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                /> 
                            </div>
                            <div className="item">
                                <p>NIP</p>
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                /> 
                            </div>
                            <div className="item">
                                <p>Ulica</p>
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                /> 
                            </div>
                            <div className="item">
                                <p>Miasto / kod</p>
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                    className="test2"
                                />
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                    className="test1"
                                />      
                            </div>       
                        </div> 
                        <div className="items">
                            <div className="item">
                                <p>Nabywca</p>
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                /> 
                            </div>
                            <div className="item">
                                <p>NIP</p>
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                /> 
                            </div>
                            <div className="item">
                                <p>Ulica</p>
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                /> 
                            </div>
                            <div className="item">
                                <p>Miasto / kod</p>
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                    className="test2"
                                />
                                <TextField
                                    id="outlined-size-normal"
                                    variant="outlined"
                                    className="test1"
                                />      
                            </div>     
                        </div>                         
                    </div>
                    <div className="nwm3">
                        <TableContainer component={Paper}>
                            <Table aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nazwa towaru lub usługi</TableCell>
                                        <TableCell align="center">Jm.</TableCell>
                                        <TableCell align="center">Ilość</TableCell>
                                        <TableCell align="center">Cena netto</TableCell>
                                        <TableCell align="center">Wartość netto</TableCell>
                                        <TableCell align="center">Stawka VAT</TableCell>
                                        <TableCell align="center">Kwota VAT</TableCell>
                                        <TableCell align="center">Wartość brutto</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Button
                                        onClick={handleAddClick}
                                        color="primary"
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                    ></Button>
                                    {state.inputList.map((input, i) => (
                                        <TableRow row key={i}>
                                            {state.inputList.length > 1 ? (
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => handleRemoveClick(i)}
                                                        variant="contained"
                                                        >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            )
                                            : <TableCell></TableCell>
                                            }
                                            <TableCell>
                                                <TextField
                                                    label="data name"
                                                    variant="outlined"
                                                    value={input[0]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 0)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="data value"
                                                    variant="outlined"
                                                    value={input[1]}
                                                    name="value"
                                                    size="small"
                                                    margin="dense"
                                                    autoComplete="off"
                                                    onChange={(e) => handleInputChange(e, i, 1)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="data name"
                                                    variant="outlined"
                                                    value={input[0]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 0)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="data name"
                                                    variant="outlined"
                                                    value={input[0]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 0)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="data name"
                                                    variant="outlined"
                                                    value={input[0]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 0)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="data name"
                                                    variant="outlined"
                                                    value={input[0]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 0)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="data name"
                                                    variant="outlined"
                                                    value={input[0]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 0)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    <TableRow>
                                        <TableCell rowSpan={2} colspan={3}/>
                                        <TableCell>Razem</TableCell>
                                        <TableCell>3000</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>1000</TableCell>
                                        <TableCell>4000</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>W tym</TableCell>
                                        <TableCell>3000%</TableCell>
                                        <TableCell>23%</TableCell>
                                        <TableCell>1000</TableCell>
                                        <TableCell>4000</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>)
                :
                (<PDF title={state.title} content={state.content} />)
            }
        </>
    )
}

export default Post;