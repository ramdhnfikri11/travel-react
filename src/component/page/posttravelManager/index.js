import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer, CDBBtn, CDBIcon} from 'cdbreact';

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';



let PosttravelManager = () => {
    const [data, setData] = useState([{}])
    const [status, setStatus] = useState(false);


    useEffect(() => {
        fetchData()
    }, [status]);
    
    const fetchData = () =>{
        axios
        .get('http://localhost:8088/api/posttravel')
        .then((response) => {
          const data = response.data.data.filter(
            (posttravel) => posttravel.status_manager === 'pending'
          );
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }


    //approve travel
    let approvePosttravel=(posttravel_id)=>{
        axios({
          method:"GET",
          url:`http://localhost:8088/api/posttravel/${posttravel_id}`
        }).then((response)=>{
              let Rowdata={
                "posttravel_id": response.data.data.posttravel_id,
                "employee" : {"employee_id": response.data.data.employee.employee_id},
                "departure": response.data.data.departure,
                "duration": response.data.data.duration,
                "go_back": response.data.data.go_back,
                "destination": response.data.data.destination,
                "transportation": response.data.data.transportation,
                "remarks": response.data.data.remarks,
                "status_manager": "approved",
                "status_hr": response.data.data.status_hr
            }
            
            axios({
              method:"POST",
              url:`http://localhost:8088/api/posttravel`,
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

      const approve = (posttravel_id) => {
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
            approvePosttravel(posttravel_id);
            Swal.fire({
                text:"request has been approved",
                icon: "success",
                });
          }
        });
      };

    
    //reject travel
        let rejectPosttravel=(posttravel_id)=>{
        axios({
          method:"GET",
          url:`http://localhost:8088/api/posttravel/${posttravel_id}`
        }).then((response)=>{
              let Rowdata={
                "posttravel_id": response.data.data.posttravel_id,
                "employee" : {"employee_id": response.data.data.employee.employee_id},
                "departure": response.data.data.departure,
                "duration": response.data.data.duration,
                "go_back": response.data.data.go_back,
                "destination": response.data.data.destination,
                "transportation": response.data.data.transportation,
                "remarks": response.data.data.remarks,
                "status_manager": "rejected",
                "status_hr": response.data.data.status_hr
            }
            
            axios({
              method:"POST",
              url:`http://localhost:8088/api/posttravel`,
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

      const reject = (posttravel_id) => {
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
            rejectPosttravel(posttravel_id);
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
                <CDBBtn color="success" variant="link" onClick={() => approve(x.posttravel_id)}>
                        Approve
                </CDBBtn>
                <CDBBtn color="danger" variant="link" onClick={() => reject(x.posttravel_id)}>
                    Reject
                </CDBBtn>
            </div>
            ),
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

export default PosttravelManager;