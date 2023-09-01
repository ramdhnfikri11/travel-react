import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer, CDBBtn, CDBIcon} from 'cdbreact';

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';



let TravelHR = () => {
    const [data, setData] = useState([{}])
    const [status, setStatus] = useState(false);
    
    useEffect(() => {
        fetchData()
    }, [status]);
    
    const fetchData = () =>{
        axios
        .get('http://localhost:8088/api/travel')
        .then((response) => {
          const data = response.data.data.filter(
            (travel) => travel.status_manager === 'approved' && travel.status_hr === 'pending'
          );
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

     //approve travel
    let approveTravel=(travel_id)=>{
        axios({
          method:"GET",
          url:`http://localhost:8088/api/travel/${travel_id}`
        }).then((response)=>{
              let Rowdata={
                "travel_id": response.data.data.travel_id,
                "employee" : {"employee_id": response.data.data.employee.employee_id},
                "departure": response.data.data.departure,
                "duration": response.data.data.duration,
                "go_back": response.data.data.go_back,
                "destination": response.data.data.destination,
                "transportation": response.data.data.transportation,
                "remarks": response.data.data.remarks,
                "status_manager": response.data.data.status_manager,
                "status_hr": "approved"
            }
            
            axios({
              method:"POST",
              url:`http://localhost:8088/api/travel`,
              headers: {
                'Content-Type' : 'application/json',
              },
              data:JSON.stringify(Rowdata),
            }).then((response)=>{
                  setStatus(true)
                
            }).catch((eror)=>{
              console.log(eror)
            })
            
        })
        .catch((eror)=>{
          console.log(eror)
        })
      }

      const approve = (travel_id) => {
        Swal.fire({
          title: 'Approve Request',
          text: 'Are you sure you want to approve this request?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, approve it!',
        }).then((result) => {
          if (result.isConfirmed) {
            approveTravel(travel_id);
            Swal.fire({
                text:"request has been approved",
                icon: "success",
                });
          }
        });
      };

    
    //reject travel
        let rejectTravel=(travel_id)=>{
        axios({
          method:"GET",
          url:`http://localhost:8088/api/travel/${travel_id}`
        }).then((response)=>{
              let Rowdata={
                "travel_id": response.data.data.travel_id,
                "employee" : {"employee_id": response.data.data.employee.employee_id},
                "departure": response.data.data.departure,
                "duration": response.data.data.duration,
                "go_back": response.data.data.go_back,
                "destination": response.data.data.destination,
                "transportation": response.data.data.transportation,
                "remarks": response.data.data.remarks,
                "status_manager": response.data.data.status_manager,
                "status_hr": "rejected"
            }
            
            axios({
              method:"POST",
              url:`http://localhost:8088/api/travel`,
              headers: {
                'Content-Type' : 'application/json',
              },
              data:JSON.stringify(Rowdata),
            }).then((response)=>{
                  setStatus(true)
                
            }).catch((eror)=>{
              console.log(eror)
            })
            
        })
        .catch((eror)=>{
          console.log(eror)
        })
      }

      const reject = (travel_id) => {
        Swal.fire({
          title: 'Reject Request',
          text: 'Are you sure you want to reject this request?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, reject it!',
        }).then((result) => {
          if (result.isConfirmed) {
            rejectTravel(travel_id);
            Swal.fire({
                text:"request has been rejected",
                icon: "success",
                });
          }
        });
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
            status_hr: (
            <div>
                <CDBBtn color="success" variant="link" onClick={() => approve(x.travel_id)} circle style={{marginTop: "10px"}}>
                        Approve
                </CDBBtn>
                <CDBBtn color="danger" variant="link" onClick={() => reject(x.travel_id)} circle style={{marginTop: "10px"}}>
                    Reject
                </CDBBtn>
            </div>
            ),
        };
    });
    const tableData = {
        columns: [
            { label: 'ID', field: 'travel_id'},
            { label: 'Employe Name', field: 'employee' },
            { label: 'Departure', field: 'departure' },
            { label: 'Duration', field: 'duration' },
            { label: 'Return', field: 'go_back' },
            { label: 'Destination', field: 'destination' },
            { label: 'Transportation', field: 'transportation' },
            { label: 'Remarks', field: 'remarks' },
            { label: 'Status HR', field: 'status_hr' },
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

export default TravelHR;