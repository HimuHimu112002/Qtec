import React, { useEffect, useState } from 'react'
import { Col, Container, Row,Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import RootLayOut from '../components/RootLayOut';
import { getDatabase, ref, onValue, push, set,update ,remove } from "firebase/database";
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2'

const Completed = () => {
  const db = getDatabase()
  const [UiShow, setUiShow] = useState([]);
  const [status, seStatus] = useState("");

  // Show All completed task
  useEffect(()=>{
    onValue(ref(db, 'completed/'), (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(), id:item.key})
      });
      setUiShow(arr);
      });
  }, [])

  let handleDelete = (id) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "Deleted your's task",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#162030',
      confirmButtonBorder: 'border-none',
      confirmButtonMarginTop: '10px',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      padding:"70px",
      }).then((result) => {
      if (result.isConfirmed) {
          remove(ref(db, 'completed/' + id))
          Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
          )
      }
      })
  }
  return (
    <>
    <RootLayOut/>
      <Container>
        <Row>
          {UiShow.map((item,i)=>(

            <Col key={i} className='py-3'>
              <Card style={{ width: 'auto' }}>
                <Card.Body>
                  <div className='blog__Heading'>
                    <h4>Task Discription</h4>
                      <h4 className='mx-2 bg-info px-4 text-white py-1 rounded'>Completed</h4>
                    <p onClick={()=>handleDelete(item.id)} className='TaskdeleteButton bg-danger px-3 py-1 m-auto text-white rounded'><AiFillDelete/></p>
                  </div>
                  <p>{item.title}</p>
                  <div className="d-flex">
                    {item.priority === "Low"?
                    <Button className="mx-1" variant="dark">{item.priority}</Button> :
                    item.priority === "medium"?
                    <Button className="mx-2" variant="primary">{item.priority}</Button>:
                    <Button className="mx-2" variant="danger">{item.priority}</Button>}
                    
                    <Button className='mx-2' variant="success">Incompleted</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Completed