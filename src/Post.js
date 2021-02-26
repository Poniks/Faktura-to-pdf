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
        inputList: [['', 'usł.', '1', '', '0.00', '23%', '0.00', 0]],
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
          inputList: [...state.inputList, ['', 'usł.', '1', '', '0.00', '23%', '0.00', 0]],
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

    const unit = [
        {
            value: 'usł.',
        },
        {
            value: 'szt.',
        },
    ];

    const vat = [
        {
            value: '27%',
        },
        {
            value: '26%',
        },
        {
            value: '25%',
        },
        {
            value: '24%',
        },
        {
            value: '23%',
        },
        {
            value: '22%',
        },
        {
            value: '21%',
        },
        {
            value: '20%',
        },
        {
            value: '19%',
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
                                        <TableCell colspan={2} align="center">Nazwa towaru lub usługi</TableCell>
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
                                    {state.inputList.map((input, i) => (
                                        <TableRow row key={i}>
                                            {state.inputList.length > 1 ? (
                                                <TableCell className="deleteCell">
                                                    <IconButton
                                                        onClick={() => handleRemoveClick(i)}
                                                        variant="contained"
                                                        className="deleteIcon"
                                                        >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            )
                                            : <TableCell className="deleteCell"></TableCell>
                                            }
                                            <TableCell className="productCell">
                                                <TextField
                                                    variant="outlined"
                                                    value={input[0]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 0)}
                                                    className="product"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    value={input[1]}
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => handleInputChange(e, i, 1)}
                                                    className="unit"
                                                >
                                                    {unit.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                        {option.value}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    value={input[2]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 2)}
                                                    className="piece"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    value={input[3]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 3)}
                                                    className="price"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    disabled
                                                    value={input[4]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 4)}
                                                    className="price"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    value={input[5]}
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => handleInputChange(e, i, 5)}
                                                    className="vat-rate"
                                                >
                                                    {vat.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                        {option.value}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    disabled
                                                    value={input[6]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    onChange={(e) => handleInputChange(e, i, 6)}
                                                    className="price"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"     
                                                    value={input[7]}
                                                    name="key"
                                                    size="small"
                                                    autoComplete="off"
                                                    margin="dense"
                                                    type="number"
                                                    onChange={(e) => {
                                                        handleInputChange(e, i, 7);
                                                        const list = [...state.inputList];
                                                        const vat = (input[7]/(100+parseInt(input[5],10)))*parseInt(input[5],10);
                                                        list[i][6] = (vat).toFixed(2);
                                                        list[i][4] = (input[7] - vat).toFixed(2)
                                                        setState({ ...state, inputList: list });
                                                    }}
                                                    className="price"
                                                />
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    <TableRow>                                    
                                        <Button
                                            onClick={handleAddClick}
                                            color="primary"
                                            variant="contained"
                                            className="addIcon"
                                        >
                                            <IconButton >
                                                <AddIcon />
                                            </IconButton>
                                        </Button>
                                        <TableCell rowSpan={2} colspan={3}/>
                                        <TableCell>Razem</TableCell>
                                        <TableCell>3000</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>1000</TableCell>
                                        <TableCell>4000</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell></TableCell>
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