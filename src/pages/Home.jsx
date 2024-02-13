import React, { useState } from 'react'
import RootLayOut from '../components/RootLayOut'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getDatabase, push, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const navigate = useNavigate()
    const db = getDatabase()
    let [title, setTitle] = useState("")
    let [titleerror, setTitleerror] = useState("")
    let [priority, setPriority] = useState("")
    let [priorityeerror, setPriorityeerror] = useState("")

    let handleUserListSearch =(e)=>{
        setPriority(e.target.value)
        setPriorityeerror("")
    }
    let handleTask = (e)=>{
        setTitle(e.target.value)
        setTitleerror("")
    }

    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today. getDate();
    const currentDate = month + "/" + date + "/" + year;
      
    let handleSubmit =()=>{
        if(!priority){
            setPriorityeerror("Please Select Task Priority")
        }
        else if(!title){
            setTitleerror("Please Write Some Text")
        }else{
        toast.success("Task Create Success")
        set(push(ref(db, "task")),{
        title:title,
        priority:priority,
        status: "Pending",
        time: currentDate
        }).then(()=>{
            setTimeout(()=>{
                navigate("/all")
            },1000)
            
        })
    }
    }

    
  return (
    <>
        <ToastContainer position="top-right" theme="dark"/>
        <RootLayOut/>
        <Container>
        <Row>
            <Col className='py-3'>
            <Form>
                <Form.Label>Task priority</Form.Label>

                <Form.Select onChange={handleUserListSearch} aria-label="Default select example">
                    <option>select task priority{priority}</option>
                    <option value="Low">Low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </Form.Select>
                <p className='text-danger'>{priorityeerror}</p>

                <Form.Group onChange={handleTask} className="mb-3 mt-4" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task Discription</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <p className='text-danger'>{titleerror}</p>
            </Form>
            <Button onClick={handleSubmit} variant="success">Add task</Button>
            </Col>
        </Row>
        </Container>
    </>
  )
}
export default Home