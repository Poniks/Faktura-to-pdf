import React from 'react';
import Pdf from 'react-to-pdf';

const ref = React.createRef();

const PDF = (props) => {
    return(
        <>
            <div className="Post" ref={ref}>
                <div className="title">
                    
                </div>  
            </div>
            <Pdf targetRef={ref} filename="testowanko.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
            </Pdf>
        </>
    );
}

export default PDF;