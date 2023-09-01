import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer, CDBBtn, CDBInput, CDBBox, CDBSelect} from 'cdbreact';


import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';



let PosttravelEmployee = () => {
    const [data, setData] = useState([{}])
    const [status, setStatus] = useState(false);
    


    useEffect(() => {
        
        axios({
            method: "GET",
            url: "http://localhost:8088/api/posttravel"
        }).then((response) => {
            setData(response.data.data)
            console.log()
        }).catch((error) => {
            console.log()
        })
    }, [status])
    
    
    {/* table */}
    const dataRows = data.map((x) => {
        return {
            posttravel_id: x.posttravel_id,
            employee: x?.employee?.name,
            departure: x.departure,
            duration: x.duration,
            go_back: x.go_back,
            destination: x.destination,
            transportation: x.transportation,
            remarks: x.remarks,
            status_manager: (
             <div>
                 {x.status_manager}{' '}
            {/* //     <CDBBtn color="success" variant="link" onClick={() => handleApprove(x)} circle style={{marginTop: "10px"}}>
            //         {/* <CDBIcon icon="magic" className="ms-1" /> */}
            {/* //             Approve */}
            {/* //     </CDBBtn> */}
            {/* //     <CDBBtn color="danger" variant="link" onClick={() => handleHr(x)} circle style={{marginTop: "10px"}}> */}
            {/* //         <CDBIcon icon="magic" className="me-1" /> */}
            {/* //             Reject */}
            {/* //     </CDBBtn> */} 
             </div>
            ),
            status_hr: (
            <div>
                {x.status_hr}{' '}
            {/* //     <CDBBtn color="success" variant="link" onClick={() => handleApprove(x)} circle style={{marginTop: "10px"}}>
            //         <CDBIcon icon="magic" className="ms-1" /> */}
            {/* //             Approve
            //     </CDBBtn> */}
            {/* //     <CDBBtn color="danger" variant="link" onClick={() => handleHr(x)} circle style={{marginTop: "10px"}}>
            //         {/* <CDBIcon icon="magic" className="me-1" /> */}
            {/* //             Reject
            //     </CDBBtn> */}
             </div>
             ),
            // actions: (
            // <div>
            //     <CDBBtn color="info" variant="link" onClick={() => handleReport(x)} circle size="large" style={{marginTop: "10px"}}>
            //     Add Report
            //     </CDBBtn>
            // </div>
            // ),
        };
    });
    const tableData = {
        columns: [
            { label: 'ID', field: 'posttravel_id'},
            { label: 'Employe Name', field: 'employee' },
            { label: 'Departure', field: 'departure' },
            { label: 'Duration', field: 'duration' },
            { label: 'Return', field: 'go_back' },
            { label: 'Destination', field: 'destination' },
            { label: 'Transportation', field: 'transportation' },
            { label: 'Remarks', field: 'remarks' },
            { label: 'Status Manager', field: 'status_manager' },
            { label: 'Status HR', field: 'status_hr' },
            // { label: 'Actions', field: 'actions' },
        ],
        rows: dataRows,
    };
                    
        // ...
    return (
    <>
        <Container className="mt-3" >
            <CDBContainer style={{margin: "10px"}}>
                <CDBCard >
                <CDBCardBody>
                    <CDBDataTable
                    striped
                    bordered
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={tableData}
                    sortable={false}
                    materialSearch={true}
                    />
                </CDBCardBody>
                </CDBCard>
            </CDBContainer>
        </Container>
        </>
);

};

export default PosttravelEmployee;