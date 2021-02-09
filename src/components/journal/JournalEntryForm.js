import React, { useEffect, useState }  from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { JournalContext } from "./JournalProvider.js" // gives us entries, getEntries, addentries

export const JournalEntryForm = () => {
//     console.log("--------- Journal Entry Form Page ------------");

//     const { updateEntry } = useContext(JournalContext)

// // Recording audio: https://developers.google.com/web/fundamentals/media/recording-audio

//     const [entryItem, setEntryItem] = useState({});
//     const history = useHistory();
//     const {entryItemId} = useParams();

//     const handleInputChange = (event) => {
//     const newItemObj = { ...entryItem };
//     newItemObj[event.target.id] = event.target.value;
//     setEntryItem(newItemObj);
//     }

//     const handleUpdateItem = () => {
//     if(!entryItem.title){
//         alert ("Please enter a title")
//     }else {
//     const newItemObj = { ...entryItem }
//     newItemObj["fbid"] = entryItemId;
//     updateItem(newItemObj)
//         .then(response => history.push("/"))
//     }
//     }

//     useEffect(() => {
//     getOneItem(entryItemId)
//     .then((entryItem) => {
//         setEntryItem(entryItem)})
//     }, [entryItemId])


//     return (
//     <>
//     <Container fluid="xl">
//     <Row>
//         <Col className="m-2" md={6}>
//         <h4>Edit This Item</h4>
//         <Form onChange={handleInputChange}>
//             <Form.Group controlId="title" className="mb-3">
//             <Form.Label>Title</Form.Label>
//             <Form.Control type="text" value={entryItem?.title}/>
//         </Form.Group>

//         <Form.Group controlId="Description">
//             <Form.Label>Description</Form.Label>
//             <Form.Control as="textarea" rows={3} value={entryItem?.details}/>
//         </Form.Group>

//         <Form.Group controlId="dream-type">
//             <Form.Label>Dream Type</Form.Label>
//             <Form.Control as="select" custom>
//             <option>Dream</option>
//             <option>Nightmare</option>
//             </Form.Control>
//         </Form.Group>

//             <Button onClick={handleUpdateItem}>Save Changes</Button>
//         </Form>
//         </Col>
//         </Row>
//         </Container>
//     </>
//     )




}