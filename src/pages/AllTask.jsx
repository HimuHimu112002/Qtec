import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import RootLayOut from '../components/RootLayOut';
import { getDatabase, ref, onValue, push, set,update ,remove } from "firebase/database";
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2'
import InputGroup from 'react-bootstrap/InputGroup';
const AllTask = () => {

  const db = getDatabase()
  const [UiShow, setUiShow] = useState([]);
  const [CompletedUiShow, setCompletedDataUiShow] = useState([]);
  const [IncompletedUiShow, setIncompletedUiShow] = useState([]);
  const [status, seStatus] = useState("");
  let [SearchArray, setSearchArray] = useState([])
  console.log(SearchArray)
  // Show All task
  useEffect(()=>{
    onValue(ref(db, 'task/'), (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(), id:item.key})
      });
      setUiShow(arr);
      });
  }, [])


  // Show All completed task for count
  useEffect(()=>{
    onValue(ref(db, 'completed/'), (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(), id:item.key})
      });
      setCompletedDataUiShow(arr);
      });
  }, [])

  // Show All Incompleted task for count
  useEffect(()=>{
    onValue(ref(db, 'Incompleted/'), (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(), id:item.key})
      });
      setIncompletedUiShow(arr);
      });
  }, [])

  // Change Status to completed
  let handleComplete =(item)=>{
    update(ref(db, 'task/' + item.id), {
      status:"Completed",
    }).then(()=>{
        set(push(ref(db, 'completed')),{
          priority: item.priority,
          status: item.status,
          title: item.title
        })
      }).then(()=>{
        remove(ref(db, 'task/' + item.id))
      });
  }

  // Change Status to Incompleted
  let handleInComplete =(item)=>{
    update(ref(db, 'task/' + item.id), {
      status:"Incompleted",
    }).then(()=>{
      set(push(ref(db, 'Incompleted')),{
        priority: item.priority,
        status: item.status,
        title: item.title
      })
    }).then(()=>{
      remove(ref(db, 'task/' + item.id))
    });
  }


  // Delete task
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
          remove(ref(db, 'task/' + id))
          Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
          )
      }
      })
  }


  let handleUserListSearch=(e)=>{
    let SearchFilterArray = []
    if (e.target.value.length == 0) {
      setSearchArray([])
    }else{
      UiShow.filter((item)=>{
        if(item.priority.toLowerCase().includes(e.target.value.toLowerCase())){
            SearchFilterArray.push(item)
            setSearchArray(SearchFilterArray)
        }
      })
    }
  }
  return (
    <>
      <RootLayOut></RootLayOut>
      <Container>
        <Row>
          <Col md='3'>
            <Card className='mt-3' style={{ width: 'auto' }}>
              <Card.Body>
                <div className='blog__Heading'>
                  <h4>Total Task: {UiShow.length}</h4>
                </div>
              </Card.Body>
            </Card>

            <Card className='mt-3' style={{ width: 'auto' }}>
              <Card.Body>
                <div className='blog__Heading'>
                  <h4>Completed Task: {CompletedUiShow.length}</h4>
                </div>
              </Card.Body>
            </Card>

            <Card className='mt-3' style={{ width: 'auto' }}>
              <Card.Body>
                <div className='blog__Heading'>
                  <h4>InCompleted Task: {IncompletedUiShow.length}</h4>
                </div>
              </Card.Body>
            </Card>

          </Col>

          <Col md='9' className='py-3'>
          <h4>Search Here</h4>
          <input onChange={handleUserListSearch} className='mt-2 px-2 py-3' type="text" placeholder='Search'></input>

            {SearchArray.length > 0
            ?
            (UiShow.map((item,i)=>(
              <Card className='mt-3' key={i} style={{ width: 'auto' }}>
                <Card.Body>
                  <div className='blog__Heading'>
                    <h4>Task Discription</h4>
                    <h4 className='mx-2 bg-info px-2 py-1 rounded'>{item.status}</h4>
                    <p onClick={()=>handleDelete(item.id)} className='TaskdeleteButton bg-danger px-3 py-1 m-auto text-white rounded'><AiFillDelete/></p>
                  </div>

                  <p>{item.title}</p>
                  <div className="d-flex">
                    {item.priority === "Low"?
                    <Button className="mx-1" variant="dark">{item.priority}</Button> :
                    item.priority === "medium"?
                    <Button className="mx-2" variant="primary">{item.priority}</Button>:
                    <Button className="mx-2" variant="danger">{item.priority}</Button>}
                    
                    <Button onClick={()=>handleComplete(item)} variant="success">Completed</Button>
                    <Button className='mx-2' onClick={()=>handleInComplete(item)} variant="success">Incompleted</Button>
                  </div>

                </Card.Body>
              </Card>
            )))
            :
            (UiShow.map((item,i)=>(
                <Card className='mt-3' key={i} style={{ width: 'auto' }}>
                  <Card.Body>
                    <div className='blog__Heading'>
                      <h4>Task Discription</h4>
                      <h4 className='mx-2 bg-info px-2 py-1 rounded'>{item.status}</h4>
                      <p onClick={()=>handleDelete(item.id)} className='TaskdeleteButton bg-danger px-3 py-1 m-auto text-white rounded'><AiFillDelete/></p>
                    </div>

                    <p>{item.title}</p>
                    <div className="d-flex">
                      {item.priority === "Low"?
                      <Button className="mx-1" variant="dark">{item.priority}</Button> :
                      item.priority === "medium"?
                      <Button className="mx-2" variant="primary">{item.priority}</Button>:
                      <Button className="mx-2" variant="danger">{item.priority}</Button>}
                      
                      <Button onClick={()=>handleComplete(item)} variant="success">Completed</Button>
                      <Button className='mx-2' onClick={()=>handleInComplete(item)} variant="success">Incompleted</Button>
                    </div>

                  </Card.Body>
                </Card>
            )))
            }

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AllTask