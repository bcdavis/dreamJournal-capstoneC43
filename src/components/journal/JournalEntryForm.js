import React, { useEffect, useState, useContext, useRef }  from 'react';
import { DatePicker } from "react-datepicker";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import MicRecorder from "./audio/mic-recorder.js";
import { JournalContext } from "./JournalProvider.js"; // gives us entries, getEntries, addentries

export const JournalEntryForm = () => {
    console.log("--------- Journal Entry Form Page ------------");

    const { types, updateEntry, addEntry, getEntryById, getDreamTypes } = useContext(JournalContext)


// Recording audio: https://developers.google.com/web/fundamentals/media/recording-audio

    const [entryItem, setEntryItem] = useState({
        //Default Dream Entry -- Missing id because this default is for adding a new journal entry -- editing an entry will override this
        userId: localStorage.getItem("kennel_customer"), // get currently active user Id
        typeId: 1, // Default to dream
        title: "",
        text: "",
        context: "",
        audioFileLink: "",
        entryLastUpdatedDate: "",
        dreamdate: "", // before updating or adding entry, must convert date string from "yyyy-mm-dd" to "yyyy mm dd" with string.replace()
        isRecurrent: false,
        isLucid: false,
        isFavorite: false

    }); // entryItem is set if we are passing in one from the url to edit
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const {entryItemId} = useParams();

    const isLucidCheck = useRef(null);
    const isRecurrentCheck = useRef(null);



    

    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = ({ value, onClick }) => (
        <button className="example-custom-input" onClick={onClick}>
            {value}
        </button>
    );

    const dateVal = useRef(null);

    //const recorder = useRef(null); // read from this with the recorder.current property
    const player = useRef(null); // read from this with the player.current property


    const handleInputChange = (event) => {
        console.log("event.target.value: ", event.target.value);

        const newItemObj = { ...entryItem };

        if(event.target.id === "isLucid"){
            console.log("Changing isLucid");
            newItemObj[event.target.id] = newItemObj.isLucid ? false : true
        }
        else if(event.target.id === "isRecurrent"){
            console.log("Changing isRecurrent");
            newItemObj[event.target.id] = newItemObj.isRecurrent ? false : true
        }
        else if(event.target.id === "isFavorite"){
            console.log("Changing isFavorite");
            newItemObj[event.target.id] = newItemObj.isFavorite ? false : true
        }
        else if(event.target.id === "dreamdate"){
            console.log("Changing dreamdate");
            newItemObj[event.target.id] = event.target.value;
        }
        else {
            console.log("No changes to Favorite, Lucid, Recurrent, or dreamdate happened.");
            newItemObj[event.target.id] = event.target.value;
        }

        setEntryItem(newItemObj);
    }


    const handleDateChange = (event) => {
        const newItemObj = { ...entryItem };
        newItemObj[event.target.id] = event.target.value;
        setEntryItem(newItemObj);
    }

    const handleUpdateItem = () => {
        if(!entryItem.title){
            alert ("Please enter a title")
        }else {
            setIsLoading(true);
            const newItemObj = { ...entryItem } // entryItem here is the current entryItem in state 
            console.log("newItemObj: ", newItemObj);
            console.log("Old entryItem.dreamdate: ", newItemObj.dreamdate);
            newItemObj.dreamdate = entryItem.dreamdate.replace(/-/g, " ");
            console.log("New entryItem.dreamdate: ", newItemObj.dreamdate);
            if (entryItemId){
                // PUT -- update

                // before updating or adding entry, must convert date string from "yyyy-mm-dd" to "yyyy mm dd" with string.replace()
                
                updateEntry(newItemObj)
                    .then(response => history.push("/"))
                    .then(() => console.log("Updating Entry: ", entryItemId))
            }
            else {
                // POST -- add
                addEntry(newItemObj)
                    .then(response => history.push("/"))
                    .then(() => console.log("Adding new entry"))
            }
        }
    }


    const audiobutton = useRef(null);
    const recorder = new MicRecorder({
      bitRate: 128
    });


//     <Form.Group>
//     <Form.Label>Dream Type</Form.Label>
// {/* <Form.Label as="legend" column sm={2}>
//     Radios
// </Form.Label> */}
// <Col sm={10}>
//     <Form.Check
//     type="radio"
//     label="Dream"
//     name="dreamTypeRadios"
//     id="dream-radio"
//     value="1"
//     />
//     <Form.Check
//     type="radio"
//     label="Nightmare"
//     name="dreamTypeRadios"
//     id="nightmare-radio"
//     value="2"
//     />
// </Col>
// </Form.Group>

    

    function startRecording() {
      recorder.start().then(() => {
        audiobutton.current.textContent = 'Stop recording';
        audiobutton.current.classList.toggle('btn-danger');
        audiobutton.current.removeEventListener('click', startRecording);
        audiobutton.current.addEventListener('click', stopRecording);
      }).catch((e) => {
        console.error(e);
      });
    }

    function stopRecording() {
      recorder.stop().getMp3().then(([buffer, blob]) => {
        console.log(buffer, blob);
        const file = new File(buffer, 'music.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });

        const li = document.createElement('li');
        const player = new Audio(URL.createObjectURL(file));
        player.controls = true;
        li.appendChild(player);
        document.querySelector('#playlist').appendChild(li);

        audiobutton.textContent = 'Start recording';
        audiobutton.classList.toggle('btn-danger');
        audiobutton.removeEventListener('click', stopRecording);
        audiobutton.addEventListener('click', startRecording);
      }).catch((e) => {
        console.error(e);
      });
    }

    // // Run this function when the user clicks the microphone button
    // function checkPermission(permissionName, descriptor) {
    //     try {
    //     navigator.permissions.query(Object.assign({name: permissionName}, descriptor))
    //         .then(function (permission) {
    //             document.getElementById(permissionName + '-status').innerHTML = permission.state;
    //             permission.addEventListener('change', function (e) {
    //             document.getElementById(permissionName + '-status').innerHTML = permission.state;
    //             // handleChange(permissionName, permission.state);
    //             });
    //         });
    //         } 
    //     catch (e) { }
    // }

    // let noop = function () {};
    // navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    // function requestMicrophone() {
    //     navigator.getUserMedia({audio: true}, noop, noop)
    // }

    // const recorder = document.getElementById('recorder');
    // const player = document.getElementById('player');
    
    // const setupAudio = () => {
    //     recorder.addEventListener('change', function(e) {
    //         const file = e.target.files[0];
    //         const url = URL.createObjectURL(file);
    //         // Do something with the audio file.
    //         player.src = url;
    //     });
    //     console.log("Audio set up");
    //     console.log()
    // }



    
    useEffect(() => {
        getDreamTypes().then(() => {
            if (entryItemId){
                getEntryById(entryItemId)
                .then((entryItem) => {
                    setEntryItem(entryItem)
                    setIsLoading(false) // clickable button for editing entry
                })

            } else {
                setIsLoading(false) // clickable button for adding entry
            }

        })
    }, [])

    useEffect(() => {
        console.log("entryItem: ", entryItem);
    }, [entryItem])



    return (
    <>
        <Container fluid="xl">
            <Row>
                <Col className="m-2 entryForm" md={6}>
                    <h4 className="entryForm-Title">{entryItemId ? "Edit Entry" : "New Entry"}</h4>
                    <Form onChange={handleInputChange}>
                        {/* {
                            entryItemId ? 
                                <div className="dreamAudioPlayback"> Playback Dream Audio 
                                    <audio id="player" controls ref={player}></audio>
                                </div>
                                :
                                <div className="audioInputOptions">
                                    <h3>Record With Audio</h3>
                                    <div class="flex-row">
                                        <Button type="button" className="recordBtn">
                                            <i className="bi bi-mic-fill entryForm-mic-icon"></i>
                                        </Button>
                                        <div className="recordBtn-text">
                                            <p> Record new entry</p>
                                        </div>
                                    </div>
                                    <br></br>
                                    <input type="file" ref={recorder} accept="audio/*" capture id="recorder" />
                                </div>
                        } */}
                        <div class="container text-center">
                            <h1>Mic Recorder to Mp3 Example</h1>
                            <p>Check your web developer tool console.</p>

                            <hr />

                            <button class="btn btn-primary audioBtn" ref={audiobutton} onClick={startRecording}>Start recording</button>

                            <br />
                            <br />
                            <br />

                            <ul id="playlist"></ul>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required id="title" type="text" value={entryItem?.title}/>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Description</Form.Label>
                            <Form.Control id="text" as="textarea" rows={3} value={entryItem?.description}/>
                        </Form.Group>

                        <Form.Group >
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Dream Date</Form.Label>
                                        <div className="datepicker-with-icon">
                                            <input id="dreamdate" type="date" ref={dateVal} onChange={handleDateChange} value={entryItem?.dreamdate}></input>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Dream Type</Form.Label>
                                        <Form.Control as="select" id="type" custom>
                                            <option value="">Select One</option>
                                            {types.map(t => (
                                                <option key={t.id} value={t.id}>
                                                    {t.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                            </Row>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Label>Attributes</Form.Label>
                            <Form.Check type="checkbox" label="Lucid" id="isLucid" controlId="lucid-checkbox" checked={entryItem.isLucid}/>
                            <Form.Check type="checkbox" label="Recurrent" id="isRecurrent" controlId="recurr-checkbox" checked={entryItem.isRecurrent}/>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Context</Form.Label>
                            <Form.Control id="context" as="textarea" rows={3} value={entryItem?.context}/>
                        </Form.Group>

                        <Button disabled={isLoading} onClick={handleUpdateItem}>Save Changes</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
    )




}