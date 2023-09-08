import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

let Login = () => {
    const [data, setData] = useState([{}])
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const  onSubmit = () => {


        let data = {
            "email": email,
            "password": password
        }

        axios({
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            url: "http://localhost:8088/api/user/login",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setStatus(true)
                console.log(response.data.data.role);
                let Role = response.data.data.role.role_id;
                if(Role === 1){
                navigate("/dashboardE");
                }else if(Role === 2){
                    navigate("/dashboardM");
                }else if(Role ===3 ){
                    navigate("/dashboardH");
                }
                // axios({
                //     method: "GET",
                //     url: "http://localhost:8088/api/user"
                // }).then((response) => {
                //     setData(response.data.data)
                //     console.log(response.data.data)
                // }).catch((error) => {
                //     console.log()
                // })
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setStatus(false)
        })
    }
    return (
        <>
            <Container>

                <Card style={{ width: '18rem' }} >    
                    <label for="email"> email:</label>
                    <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                        
                    <label for="password"> password:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} ></input>
                    <button onClick={onSubmit}>submit</button>
                </Card>

            </Container>
        </>
    )
}

export default Login