import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer, CDBBtn, CDBInput, CDBBox, CDBSelect} from 'cdbreact';

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';






let TravelEmployee = () => {
    const [data, setData] = useState([{}])
    const [status, setStatus] = useState(false);

    const [dataemployee, setDataemployee] = useState([{}])
    
    const [travel_id, setTravel_id] = useState(0)
    const [employee, setEmployee] = useState([{}])
    const [departure, setDeparture] = useState("")
    const [duration, setDuration] = useState("")
    const [go_back, setGo_back] = useState("")
    const [destination, setDestination] = useState("")
    const [transportation, setTransportation] = useState("")
    const [remarks, setRemarks] = useState("")
    const [status_manager, setStatus_manager] = useState("")
    const [status_hr, setStatus_hr] = useState("")

    const [employee_id, setEmployeeId] = useState(0)
    const [posttravel_id, setPostravel_id] = useState(0)


    
    useEffect(() => {
        
        axios({
            method: "GET",
            url: "http://localhost:8088/api/travel"
        }).then((response) => {
            setData(response.data.data)
            console.log()
        }).catch((error) => {
            console.log()
        })
    }, [status])

    //get all employee
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8088/api/employee"
        }).then((response) => {
            setDataemployee(response.data.data);
        }).catch((error) => {
            console.log(error)
        })
    }, [status])

    
    //add request

    const requestShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const  onSubmit = () => {
        handleClose();

        let data = {
            "travel_id": travel_id,
            "employee" : {"employee_id": employee_id},
            "departure": departure,
            "duration": duration,
            "go_back": go_back,
            "destination": destination,
            "transportation": transportation,
            "remarks": remarks,
            "status_manager": "pending",
            "status_hr": "pending"
        }

        axios({
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            url: "http://localhost:8088/api/travel",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setStatus(true)
                console.log(setStatus)
                
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setStatus(false)
        })
    }



    // modal add report
    const handleReport = (rowData) => {
        setPostravel_id(rowData.travel_id);
        setEmployee(rowData.employee)
        setDeparture(rowData.departure)
        setDuration(rowData.duration)
        setGo_back(rowData.go_back)
        setDestination(rowData.destination)
        setTransportation(rowData.transportation)
        setRemarks(rowData.remarks)
        setStatus_manager(rowData.status_manager);
        setStatus_hr(rowData.status_hr);

        reportShow();
    }
    const reportShow = () => setShow3(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);

    const  onReport = () => {
        handleClose3();

    let data = {
        "posttravel_id": posttravel_id,
        "employee": employee,
        "departure": departure,
        "duration": duration,
        "go_back": go_back,
        "destination": destination,
        "transportation": transportation,
        "remarks": remarks,
        "status_manager": "pending",
        "status_hr": "pending"
    }

        axios({
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            url: "http://localhost:8088/api/posttravel",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setStatus(true)
                console.log(setStatus)
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setStatus(false)
        })
    };


                {/* table */}
    const dataRows = data.map((x) => {
        return {
            travel_id: x.travel_id,
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
            </div>
            ),
            status_hr: (
            <div>
                {x.status_hr}{' '}
            </div>
            ),
            actions: (
            <div>
                <CDBBtn color="info" variant="link" onClick={() => handleReport(x)} circle size="small" style={{marginTop: "5px"}}>
                Add Report
                </CDBBtn>
            </div>
            ),
        };
    });
    const tableData = {
        columns: [
            { label: 'ID', field: 'travel_id'},
            { label: 'Employee Name', field: 'employee' },
            { label: 'Departure', field: 'departure' },
            { label: 'Duration', field: 'duration' },
            { label: 'Return', field: 'go_back' },
            { label: 'Destination', field: 'destination' },
            { label: 'Transportation', field: 'transportation' },
            { label: 'Remarks', field: 'remarks' },
            { label: 'Status Manager', field: 'status_manager' },
            { label: 'Status HR', field: 'status_hr' },
            { label: 'Actions', field: 'actions' },
        ],
        rows: dataRows,
    };
                    
    
    return (
    <>
        <Container className="mt-3" >
        <Button variant="primary" onClick={requestShow} style={{marginLeft: "25px"}}>
            Add Request
        </Button>
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
                    sortable={true}
                    />
                </CDBCardBody>
            </CDBCard>
        </Container>

        {/* modal add*/}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CDBInput type="text" id="travel_id" onChange={e => setTravel_id(e.target.value)} hidden />

                <select id="employee_id" onChange={e => setEmployeeId(e.target.value)} value={employee_id} style={{ marginBottom: '10px' }}>
                        <option value={0} selected disabled>- select employee -</option>
                    {dataemployee.map(x => (
                        <option key={x.employee_id} value={x.employee_id}>{x.name}</option>
                    ))}
                </select>
                <br></br>

                <label for="departure" style={{ marginTop: "10px" }}> Pick Your Departure Date:</label>
                <CDBInput type="datetime-local" id="departure" placeholder="Departure" onChange={e => setDeparture(e.target.value)} style={{ margin: '10px 0' }}/>

                <CDBInput type="text" id="destination" placeholder="Destination" onChange={e => setDestination(e.target.value)} style={{ margin: '10px 0' }}/>

                <CDBInput type="text" id="duration" placeholder="Duration" onChange={e => setDuration(e.target.value)} style={{ margin: '10px 0' }}/>
                
                <label for="go_back" style={{ marginTop: "10px" }}> Pick Your Return Date:</label>
                <CDBInput type="datetime-local" id="go_back" placeholder="Go Back" onChange={e => setGo_back(e.target.value)} style={{ margin: '10px 0' }}/>
                
                <CDBBox display="flex" alignItems="center" style={{ margin: '5px 0' }}>
                    <CDBInput type="checkbox" id="transportation-darat" checked={transportation === 'darat'} onChange={() => setTransportation('darat')} />
                    <label htmlFor="transportation-darat" style={{ marginLeft: '5px' }}>Darat</label>
                </CDBBox>

                <CDBBox display="flex" alignItems="center" style={{ margin: '10px 0' }}>
                    <CDBInput type="checkbox" id="transportation-laut" checked={transportation === 'laut'} onChange={() => setTransportation('laut')} />
                    <label htmlFor="transportation-laut" style={{ marginLeft: '5px' }}>Laut</label>
                </CDBBox>

                <CDBBox display="flex" alignItems="center" style={{ margin: '10px 0' }}>
                    <CDBInput type="checkbox" id="transportation-udara" checked={transportation === 'udara'} onChange={() => setTransportation('udara')} />
                    <label htmlFor="transportation-udara" style={{ marginLeft: '5px' }}>Udara</label>
                </CDBBox>

                <CDBInput type="text" id="remarks" placeholder="Remarks" onChange={e => setRemarks(e.target.value)} />

                <CDBInput type="text" id="status_manager" onChange={e => setStatus_manager(e.target.value)} hidden />
                <CDBInput type="text" id="status_hr" onChange={e => setStatus_hr(e.target.value)} hidden />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={onSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        {/* end modal add */}


        {/* modal add Reporting */}
        <Modal show={show3} onHide={handleClose3}>
            <Modal.Header closeButton>
            <Modal.Title>Add Reporting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CDBInput type="text" id="travel_id"  value={travel_id} onChange={e => setTravel_id(e.target.value)} hidden />
                
                <input type="text" id="employee"  value={employee} onChange={e => setEmployee(e.target.value)} hidden></input>

                <CDBInput type="datetime-local" id="departure"  value={departure} onChange={e => setDeparture(e.target.value)} hidden />
                
                <label for="destination"> Destination:</label>
                <CDBInput type="text" id="destination"  value={destination} onChange={e => setDestination(e.target.value)} />
                
                <label for="duration"> Duration:</label>
                <CDBInput type="text" id="duration"  value={duration} onChange={e => setDuration(e.target.value)} />

                <label for="Return"> Return :</label>
                <CDBInput type="datetime-local" id="go_back"  value={go_back} onChange={e => setGo_back(e.target.value)} />

                <CDBInput type="text" id="transportation"  value={transportation} onChange={e => setTransportation(e.target.value)} hidden />

                <label for="remarks"> Remarks:</label>
                <CDBInput type="text" id="remarks"  value={remarks} onChange={e => setRemarks(e.target.value)} readOnly />

                <input type="text" id="status_manager"  value={status_manager} onChange={e => setStatus_manager(e.target.value)}hidden></input>
                <input type="text" id="status_hr"  value={status_hr} onChange={e => setStatus_hr(e.target.value)}hidden></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose3}>
                Close
            </Button>
            <Button variant="primary" onClick={onReport}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
);
};

export default TravelEmployee;