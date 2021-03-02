import React, { useState } from 'react';
import { TextField, Button, MenuItem, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table, IconButton } from '@material-ui/core';
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
        inputList: [['', 'usł.', '1', '0.00', '0.00', '23%', '0.00', '0.00']],
        inputListRecountVat: [['0.00','23%','0.00','0.00']],
        sumNet: '0.00',
        sumVat: '0.00',
        sumGross: '0.00',
    });

    const handleInputChange = (e, index, innerIndex) => {
        const { value } = e.target;
        const list = [...state.inputList];
        list[index][innerIndex] = value;
        setState({ ...state, inputList: list });
    };

    const handleRemoveClick = (index, vat) => {
        const listVat = [...state.inputListRecountVat];
        const list = [...state.inputList];
        list.splice(index, 1);

        let arrFinishVat = listVat.map((line, i) => (
            line[1]
        ))
        let arrInputVat = list.map((line, i) => (
            line[5]
        ))

        for(let i = listVat.length-1; i >= 0; i--){
            if(!arrInputVat.includes(arrFinishVat[i])) {   
                listVat.splice(i, 1);           
             }
        }

        let arrNet = [];
        let arrVat = [];
        let arrGross = [];

        let arrNetVat = [];
        let arrGrossVat = [];
        let arrPriceVat = [];

        list.map((input, i) => {
            arrNet.push(parseFloat(input[3], 10));
            arrVat.push(parseFloat(input[6], 10));
            arrGross.push(parseFloat(input[7], 10));

            if(input.includes(vat)){
                arrNetVat.push(parseFloat(input[3], 10));
                arrPriceVat.push(parseFloat(input[6], 10));
                arrGrossVat.push(parseFloat(input[7], 10));
            }
            return i;
        });

        let indexVat;

        for(let i = listVat.length-1; i >= 0; i--){
            if(arrFinishVat[i].includes(vat)){
                indexVat = i;
            }
        }

        if(arrNetVat.length > 0){
            listVat[indexVat][0] = (arrNetVat.reduce((a, b) => a + b)).toFixed(2);
            listVat[indexVat][2] = (arrPriceVat.reduce((a, b) => a + b)).toFixed(2);
            listVat[indexVat][3] = (arrGrossVat.reduce((a, b) => a + b)).toFixed(2);
        }
        
        setState({ 
            ...state, 
            inputList: list,
            inputListRecountVat: listVat,
            sumNet: (arrNet.reduce((a, b) => a + b)).toFixed(2),
            sumVat: (arrVat.reduce((a, b) => a + b)).toFixed(2),
            sumGross: (arrGross.reduce((a, b) => a + b)).toFixed(2),
        });
    };

    const handleAddClick = () => {
        let arrFinishVat = state.inputListRecountVat.map((line, i) => (
            line[1]
        ))

        if(arrFinishVat.includes('23%')){
            setState({
                ...state,
                inputList: [...state.inputList, ['', 'usł.', '1', '0.00', '0.00', '23%', '0.00', '0.00']],     
            });
        } else {
            setState({
                ...state,
                inputList: [...state.inputList, ['', 'usł.', '1', '0.00', '0.00', '23%', '0.00', '0.00']],
                inputListRecountVat: [...state.inputListRecountVat, ['0.00','23%','0.00','0.00']],
            });
        }
        
    };

    const handleNewResultVat = (e, newLineNet, newLineVat, newLineGross) => {
        let arrFinishVat = state.inputListRecountVat.map((line, i) => (
            line[1]
        ))
        let arrVat = state.inputList.map((line, i) => (
            line[5]
        ))

        const list = [...state.inputListRecountVat];

        for(let i = state.inputListRecountVat.length-1; i >= 0; i--){
            if(!arrVat.includes(arrFinishVat[i])) {   
                list.splice(i, 1);             
             } 
        }

        let arrNet = [];
        let arrPrVat = [];
        let arrGross = [];

        let test = [];

        state.inputList.map((input, i) => {
            arrNet.push(parseFloat(input[3], 10));
            arrPrVat.push(parseFloat(input[6], 10));
            arrGross.push(parseFloat(input[7], 10));

            console.log(input)
            test.push([input[3], input[5], input[6], input[6]])

            return i;
        });
        console.log(test);

        let netVat = (arrNet.reduce((a, b) => a + b)).toFixed(2);
        let priceVat = (arrPrVat.reduce((a, b) => a + b)).toFixed(2);
        let grossVat = (arrGross.reduce((a, b) => a + b)).toFixed(2);


        if(!arrFinishVat.includes(e.target.value)){
            setState({
                ...state,
                inputListRecountVat: [...list, [newLineNet, e.target.value, newLineVat, newLineGross]],  
                sumNet: netVat,
                sumVat: priceVat,
                sumGross: grossVat,      
            });
        } else {
            setState({ 
                ...state, 
                inputListRecountVat: list,
                sumNet: netVat,
                sumVat: priceVat,
                sumGross: grossVat,   
            });  
        }
    };

    const handleChange = input => e => {
        setState({
            ...state,
            [input]: e.target.value,
        });
    };

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
    };

    const recountSum = () => {
        let arrNet = [];
        let arrVat = [];
        let arrGross = [];

        arrNet.push(state.inputList.map((input, i) => {
            let number = parseFloat(input[3], 10);
            return number;
        }));

        arrVat.push(state.inputList.map((input, i) => {
            let number = parseFloat(input[6], 10);
            return number;
        }));

        arrGross.push(state.inputList.map((input, i) => {
            let number = parseFloat(input[7], 10);
            return number;
        }));

        setState({
            ...state,
            sumNet: (arrNet[0].reduce((a, b) => a + b)).toFixed(2),
            sumVat: (arrVat[0].reduce((a, b) => a + b)).toFixed(2),
            sumGross: (arrGross[0].reduce((a, b) => a + b)).toFixed(2),
        })
    };

    const recountVat = (vat) => {
        let arrNet = [];
        let arrVat = [];
        let arrGross = [];

        let arrNetVat = [];
        let arrGrossVat = [];
        let arrPriceVat = [];

        state.inputList.map((input, i) => {
            arrNet.push(parseFloat(input[3], 10));
            arrVat.push(parseFloat(input[6], 10));
            arrGross.push(parseFloat(input[7], 10));

            if(input.includes(vat)){
                arrNetVat.push(parseFloat(input[3], 10));
                arrPriceVat.push(parseFloat(input[6], 10));
                arrGrossVat.push(parseFloat(input[7], 10));
            }
            return i;
        });

        let arrFinishVat = state.inputListRecountVat.map((line, i) => (
            line[1]
        ))

        let index;

        for(let i = state.inputListRecountVat.length-1; i >= 0; i--){
            if(arrFinishVat[i].includes(vat)){
                index = i;
            }
        }

        const list = [...state.inputListRecountVat];

        list[index][0] = (arrNetVat.reduce((a, b) => a + b)).toFixed(2);
        list[index][2] = (arrPriceVat.reduce((a, b) => a + b)).toFixed(2);
        list[index][3] = (arrGrossVat.reduce((a, b) => a + b)).toFixed(2);

        setState({ 
            ...state, 
            inputListRecountVat: list,
            sumNet: (arrNet.reduce((a, b) => a + b)).toFixed(2),
            sumVat: (arrVat.reduce((a, b) => a + b)).toFixed(2),
            sumGross: (arrGross.reduce((a, b) => a + b)).toFixed(2),
        }); 
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
                                                        onClick={() => {
                                                            handleRemoveClick(i,input[5]);          
                                                        }}
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
                                                    onChange={(e) => {
                                                        handleInputChange(e, i, 3);
                                                        const list = [...state.inputList];
                                                        const vat = parseFloat(input[5],10)/100*e.target.value;
                                                        const gross = parseFloat(e.target.value) + vat;
                                                        const net = parseFloat(e.target.value,10)
                                                        list[i][6] = (vat).toFixed(2);
                                                        list[i][4] = (net).toFixed(2);
                                                        list[i][7] = (gross).toFixed(2);
                                                        setState({ ...state, inputList: list });                                                                 
                                                    }}
                                                    onBlur={(e) => {
                                                        const list = [...state.inputList];
                                                        list[i][3] = (parseFloat(e.target.value,10)).toFixed(2);
                                                        setState({ ...state, inputList: list });
                                                        recountVat(input[5]); 
                                                    }}
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
                                                    onChange={(e) => {
                                                        handleInputChange(e, i, 5);
                                                        const list = [...state.inputList];
                                                        const vat = parseFloat(input[5],10)/100*input[3];
                                                        const brutto = parseFloat(input[3]) + vat;
                                                        list[i][6] = (vat).toFixed(2);
                                                        list[i][7] = (brutto).toFixed(2);
                                                        setState({ ...state, inputList: list });
                                                        handleNewResultVat(e, input[4], input[6], input[7],);
                                                    }}
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
                                                    onChange={(e) => {
                                                        handleInputChange(e, i, 7);
                                                        const list = [...state.inputList];
                                                        const vat = (input[7]/(100+parseFloat(input[5],10)))*parseFloat(input[5],10);
                                                        list[i][6] = (vat).toFixed(2);
                                                        list[i][4] = (input[7] - vat).toFixed(2);
                                                        list[i][3] = (input[7] - vat).toFixed(2);
                                                        setState({ ...state, inputList: list });
                                                    }}
                                                    onBlur={(e) => {
                                                        const list = [...state.inputList];
                                                        list[i][7] = (parseFloat(e.target.value,10)).toFixed(2);
                                                        setState({ ...state, inputList: list });
                                                        recountSum();
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
                                        <TableCell rowSpan={1 + state.inputListRecountVat.length} colspan={3}/> 
                                        <TableCell>Razem</TableCell>
                                        <TableCell>{state.sumNet}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{state.sumVat}</TableCell>
                                        <TableCell>{state.sumGross}</TableCell>
                                    </TableRow>
                                    {state.inputListRecountVat.map((input,i) => (
                                        <TableRow row key={i}>
                                            <TableCell></TableCell>
                                            <TableCell>W tym</TableCell>
                                            <TableCell>{input[0]}</TableCell>
                                            <TableCell>{input[1]}</TableCell>
                                            <TableCell>{input[2]}</TableCell>
                                            <TableCell>{input[3]}</TableCell>
                                        </TableRow>
                                    ))}
                                    
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