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
                        <p>{sellerNIP}</p>
                    </div>
                    <div className="info">
                        <h3>Nabywca</h3>
                        <p>{buyer}</p>
                        <p>{buyerStreet}</p>
                        <p>{buyerZIP} {buyerCity}</p>
                        <p>{buyerNIP}</p>    
                    </div>    
                </div>
            </div>
            <Pdf targetRef={ref} filename="testowanko.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
            </Pdf>
        </>
    );
}

export default PDF;