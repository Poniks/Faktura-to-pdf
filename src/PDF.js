import React from 'react';
import Pdf from 'react-to-pdf';

const ref = React.createRef();

const PDF = ( props ) => {
    const { 
        document,
        numer,
        city,
        dateSell,
        dateIssue,
        seller,
        sellerNIP,
        sellerStreet,
        sellerCity,
        sellerZIP,
        buyer,
        buyerNIP,
        buyerStreet,
        buyerCity,
        buyerZIP,
        inputList,
        inputListRecountVat,
        sumNet,
        sumVat,
        sumGross,
        currency,
        payment,
        paymentDeadline,
        accountNumber,
        verbalAmount } = props;

    console.log(props)

    return(
        <>
            <div className="Post" ref={ref}>
                <div className="title">
                    <h3>{document}</h3>
                    <h3>numer: {numer}</h3>
                </div>
                <div className="issueInfo">
                    <p>Miejsce wystawienia: {city}</p>
                    <p>Data wystawienia: {dateIssue}</p>
                    <p>Data sprzedaży: {dateSell}</p>
                </div>  
                <div className="information">
                    <div className="info">
                        <h3>Sprzedawca</h3>
                        <p>{seller}</p>
                        <p>{sellerStreet}</p>
                        <p>{sellerZIP} {sellerCity}</p>
                        <p>NIP: {sellerNIP}</p>
                    </div>
                    <div className="info">
                        <h3>Nabywca</h3>
                        <p>{buyer}</p>
                        <p>{buyerStreet}</p>
                        <p>{buyerZIP} {buyerCity}</p>
                        <p>NIP: {buyerNIP}</p>    
                    </div>    
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <td align="center"><th>Lp.</th></td>
                                <td colspan={2} align="center"><th>Nazwa towaru lub usługi</th></td>
                                <td align="center"><th>Jm.</th></td>
                                <td align="center"><th>Ilość</th></td>
                                <td align="center"><th>Cena netto</th></td>
                                <td align="center"><th>Wartość netto</th></td>
                                <td align="center"><th>Stawka VAT</th></td>
                                <td align="center"><th>Kwota VAT</th></td>
                                <td align="center"><th>Wartość brutto</th></td>
                            </tr>
                        </thead>
                        <tbody>
                            {inputList.map((input, i) => (
                                <tr key={i}>
                                    <td align="center">{i+1}</td>
                                    <td colspan={2}>{input[0]}</td>
                                    <td align="center">{input[1]}</td>
                                    <td align="center">{input[2]}</td>
                                    <td align="right">{input[3]}</td>
                                    <td align="right">{input[4]}</td>
                                    <td align="center">{input[5]}</td>
                                    <td align="right">{input[6]}</td>
                                    <td align="right">{input[7]}</td>
                                </tr>
                            ))}
                            <tr>
                                <td rowspan={3 + inputListRecountVat.length} colspan={5} className="clr"></td>
                                <td>Razem</td>
                                <td align="right">{sumNet}</td>
                                <td></td>
                                <td align="right">{sumVat}</td>
                                <td align="right">{sumGross}</td>
                            </tr>
                            {inputListRecountVat.map((input, i) => (
                                <tr key={i}>
                                    <td>W tym</td>
                                    <td align="right">{input[0]}</td>
                                    <td align="center">{input[1]}</td>
                                    <td align="right">{input[2]}</td>
                                    <td align="right">{input[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pdf targetRef={ref} filename="testowanko.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
            </Pdf>
        </>
    );
}

export default PDF;