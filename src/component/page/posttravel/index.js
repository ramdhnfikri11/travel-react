import axios from "axios";
import { Container } from "react-bootstrap"
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



let PostTravel = () => {
    const [data, setData] = useState([{}])
    const [status, setStatus] = useState(false);

    const [posttravel_id, setPosttravel_id] = useState(0)
    const [employee, setEmployee] = useState([{}])
    const [departure, setDeparture] = useState("")
    const [duration, setDuration] = useState("")
    const [go_back, setGo_back] = useState("")
    const [destination, setDestination] = useState("")
    const [transportation, setTransportation] = useState("")
    const [remarks, setRemarks] = useState("")
    const [status_manager, setStatus_manager] = useState("")
    const [status_hr, setStatus_hr] = useState("")
    const [pending_value, setPendingValue] = useState("")

    //get all
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8088/api/posttravel"
        }).then((response) => {
            // console.log(response.data.data)
            setData(response.data.data);
            // console.log(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [status])

    // approval manager
    const handleManager = (rowData) => {
        setPosttravel_id(rowData.posttravel_id);
        setEmployee(rowData.employee)
        setDeparture(rowData.departure)
        setDuration(rowData.duration)
        setGo_back(rowData.go_back)
        setDestination(rowData.destination)
        setTransportation(rowData.transportation)
        setRemarks(rowData.remarks)
        setStatus_manager(rowData.status_manager);
        setStatus_hr(rowData.status_hr);

        managerShow();
    }
    const managerShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    
    // approval hr
    const handleHr = (rowData) => {
        setPosttravel_id(rowData.posttravel_id);
        setEmployee(rowData.employee)
        setDeparture(rowData.departure)
        setDuration(rowData.duration)
        setGo_back(rowData.go_back)
        setDestination(rowData.destination)
        setTransportation(rowData.transportation)
        setRemarks(rowData.remarks)
        setStatus_manager(rowData.status_manager);
        setStatus_hr(rowData.status_hr);

        hrShow();
    }
    const hrShow = () => setShow2(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);

     // modal approve
     const  onUpdate = () => {
        handleClose();
        handleClose2();

        let data = {
            "posttravel_id": posttravel_id,
            "employee": employee,
            "departure": departure,
            "duration": duration,
            "go_back": go_back,
            "destination": destination,
            "transportation": transportation,
            "remarks": remarks,
            "status_manager": status_manager,
            "status_hr": status_hr
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
    }


    return (
        <>
            <Container className="mt-3">
                 {/* table */}
                 <table className="table">
                    <thead>
                        <th>id</th>
                        <th>employe name</th>
                        <th>Departure</th>
                        <th>Duration</th>
                        <th>Return</th>
                        <th>Destination</th>
                        <th>Transportation</th>
                        <th>Remarks</th>
                        <th>Status Manager</th>
                        <th>Status HR</th>
                    </thead>
                    <tbody>
                        {data.map(x => {
                            return (
                                <tr key={x.posttravel_id}>
                                    <td>{x.posttravel_id}</td>
                                    <td>{x?.employee?.name}</td>
                                    <td>{x.departure}</td>
                                    <td>{x.duration}</td>
                                    <td>{x.go_back}</td>
                                    <td>{x.destination}</td>
                                    <td>{x.transportation}</td>
                                    <td>{x.remarks}</td>
                                    <td>
                                        {x.status_manager}  <a href="#" onClick={() => handleManager(x)}> edit</a>
                                    </td>
                                    <td>
                                        {x.status_hr} <a href="#" onClick={() => handleHr(x)}> edit</a>
                                    </td> 
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* end table */}

                                {/* modal approve manager */}
                                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Approve manager</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" id="posttravel_id"  value={posttravel_id} onChange={e => setPosttravel_id(e.target.value)} hidden></input>
                        <input type="text" id="employee"  value={employee} onChange={e => setEmployee(e.target.value)} hidden></input>
                        <input type="datetime-local" id="departure"  value={departure} onChange={e => setDeparture(e.target.value)} hidden></input>
                        <input type="text" id="duration"  value={duration} onChange={e => setDuration(e.target.value)} hidden></input>
                        <input type="datetime-local" id="go_back"  value={go_back} onChange={e => setGo_back(e.target.value)} hidden></input>
                        <input type="text" id="destination"  value={destination} onChange={e => setDestination(e.target.value)} hidden></input>
                        <input type="text" id="transportation"  value={transportation} onChange={e => setTransportation(e.target.value)} hidden></input>
                        <input type="text" id="remarks"  value={remarks} onChange={e => setRemarks(e.target.value)} hidden></input>
                        <select id="status_manager"  onChange={e => setStatus_manager(e.target.value)} value={status_manager}>
                        <option value="pending" selected>pending</option>
                            <option value="accept">accept</option>
                            <option value="reject">reject</option>
                        </select>
                        <input type="text" id="status_hr"  value={status_hr} onChange={e => setStatus_hr(e.target.value)} hidden></input>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onUpdate}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

                
                {/* modal approve hr*/}
                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                    <Modal.Title>Approve HR</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <input type="text" id="posttravel_id"  value={posttravel_id} onChange={e => setPosttravel_id(e.target.value)} hidden></input>
                        <input type="text" id="employee"  value={employee} onChange={e => setEmployee(e.target.value)} hidden></input>
                        <input type="datetime-local" id="departure"  value={departure} onChange={e => setDeparture(e.target.value)} hidden></input>
                        <input type="text" id="duration"  value={duration} onChange={e => setDuration(e.target.value)} hidden></input>
                        <input type="datetime-local" id="go_back"  value={go_back} onChange={e => setGo_back(e.target.value)} hidden></input>
                        <input type="text" id="destination"  value={destination} onChange={e => setDestination(e.target.value)} hidden></input>
                        <input type="text" id="transportation"  value={transportation} onChange={e => setTransportation(e.target.value)} hidden></input>
                        <input type="text" id="remarks"  value={remarks} onChange={e => setRemarks(e.target.value)} hidden></input>
                        <input type="text" id="status_manager"  value={status_manager} onChange={e => setStatus_manager(e.target.value)}hidden></input>
                        <select id="status_hr"  onChange={e => setStatus_hr(e.target.value)} value={status_hr}>
                        <option value="pending" selected>pending</option>
                            <option value="accept">accept</option>
                            <option value="reject">reject</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onUpdate}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default PostTravel