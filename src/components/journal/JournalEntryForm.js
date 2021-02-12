import React, { Component, useEffect, useState, useContext, useRef }  from 'react';
// import { DatePicker } from "react-datepicker";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import MicRecorder from "./audio/mic-recorder.js";
import { JournalContext } from "./JournalProvider.js"; // gives us entries, getEntries, addentries

// import {DragAndDrop} from "./DragAndDrop.js";

export const JournalEntryForm = () => {
    console.log("--------- Journal Entry Form Page ------------");

    const { types, updateEntry, addEntry, getEntryById, getDreamTypes } = useContext(JournalContext)



// Recording audio: https://developers.google.com/web/fundamentals/media/recording-audio

    // const audioPlayer2 = useRef();

        // From <input> node


    const [entryItem, setEntryItem] = useState({
        //Default Dream Entry -- Missing id because this default is for adding a new journal entry -- editing an entry will override this
        userId: localStorage.getItem("kennel_customer"), // get currently active user Id
        typeId: "1", // Default to dream
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

    const [ isRecording, setIsRecording ] = useState(false);

     // initial timer state
    //  const [recTimer, setRecTimer] = useState(0)


    const [audioLink, setAudioLink] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = ({ value, onClick }) => (
        <button className="example-custom-input" onClick={onClick}>
            {value}
        </button>
    );

    const dateVal = useRef(null);

    //const recorder = useRef(null); // read from this with the recorder.current property
    const entryPlayer = useRef(null); // read from this with the player.current property


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
                    .then(response => history.push("/journalList"))
                    .then(() => console.log("Updating Entry: ", entryItemId))
            }
            else {
                // POST -- add
                const newDate = new Date();
                newItemObj.dreamdate = newDate.toLocaleDateString().replace(/ \//g, "-" )
                addEntry(newItemObj)
                    .then(response => history.push("/journalList"))
                    .then(() => console.log("Adding new entry"))
            }
        }
    }


    const audiobutton = useRef(null);
    const recorder = new MicRecorder({
      bitRate: 128
    });

    // useEffect(() => {
    //     console.log("isRecording useEffect: ", isRecording);
    //     if(isRecording){
    //         updateAudioBtn(isRecording); // param = true
    //     }
    //     else {
    //         updateAudioBtn(isRecording); // param = false
    //     }

    // }, [isRecording])

    // const updateAudioBtn = (bool) => {
    //     if(bool){
    //         // started recording
    //         // audiobutton.current.textContent = 'Stop recording';
    //         audiobutton.current.classList.toggle('btn-danger');
    //         audiobutton.current.removeEventListener('click', startRecording);
    //         audiobutton.current.addEventListener('click', stopRecording);
    //     }
    //     else {
    //         // audiobutton.current.textContent = 'Start recording';
    //         audiobutton.current.classList.toggle('btn-danger');
    //         audiobutton.current.removeEventListener('click', stopRecording);
    //         audiobutton.current.addEventListener('click', startRecording);
    //     }
    // }




    const renderAudio = (srcURL) => {
        return (
            <audio id="audioPlayer" src={srcURL}></audio>
        )
    }



    function startRecording() {
        recorder.start().then(() => {
            audiobutton.current.removeEventListener('click', startRecording);
            console.log("removed startRecording click");
            audiobutton.current.addEventListener('click', stopRecording);
            console.log("added stopRecording click");
            // audiobutton.current.textContent = 'Stop recording';
            // console.log("changed button text to Stop");
            audiobutton.current.classList.toggle('btn-danger');
            console.log("toggle btn-danger (turn on)");
            setIsRecording(true);
        }).catch((e) => {
            console.error(e);
        });
    }

    function stopRecording() {
        recorder.stop().getMp3().then(([buffer, blob]) => {
            console.log(buffer, blob);
            const file = new File(buffer, 'dream.mp3', {
                type: blob.type,
                lastModified: Date.now()
            });
            setIsRecording(false);

            ///const li = document.createElement('li');
            let audioURL = URL.createObjectURL(file);
            console.log("audioURL: ", audioURL);
            // setAudioLink(audioURL);
            const player = new Audio(audioURL);
            player.controls = true;
            player.id = "audioPlayer";
            document.querySelector("#playlist").appendChild(player);

            console.log("isRecording: ", isRecording);

            audiobutton.current.removeEventListener('click', stopRecording);
            console.log("removed stopRecording click");
            audiobutton.current.addEventListener('click', startRecording);
            console.log("added startRecording click");
            audiobutton.current.classList.toggle('btn-danger');
            console.log("toggle btn-danger (turn off)");

        }).catch((e) => {
            console.error(e);
        });
    }

    

    

    
    useEffect(() => {
        getDreamTypes().then(() => {
            if (entryItemId){
                getEntryById(entryItemId)
                .then((entryItem) => {
                    const newItem = entryItem;
                    console.log("entryItem -- input -- dreamdate: ", newItem.dreamdate);
                    newItem.dreamdate = entryItem.dreamdate.replace(/ /g, "-");
                    console.log("newItem -- input -- dreamdate: ", newItem.dreamdate);
                    setEntryItem(entryItem)
                    setIsLoading(false) // clickable button for editing entry
                })

            } else {
                setIsLoading(false) // clickable button for adding entry
            }

        })
        handleClose();
        audiobutton.current.addEventListener('click', startRecording); 
        setIsRecording(false);

    }, [])

    useEffect(() => {
        console.log("entryItem: ", entryItem);

    }, [entryItem])


        const defaultDate = () => {
            let d = new Date();
            let d2 = d.toISOString();
            console.log("d2: ", d2);

            let res = d2.substring(0, 10);
            console.log("res: ", res);
            return res

        
        }

        const convertDate = (dateStr) => {
            let a = new Date(dateStr);
            let a2 = a.toISOString();
            console.log("a2: ", a2);

            let res = a2.substring(0, 10);
            console.log("res: ", res);

            return res
        }
    
   

    const instructions = () => {
        return (
            <>
                <div className="instructions">
                    <h4>How to save your recorded audio dream: </h4>
                    <ul>
                        <li className="margin-bottom-1em">
                            <p>Record your voice by pressing the <i className="bi bi-mic-fill entryForm-mic-icon-inst"></i> button below.</p>
                        </li>
                        <li className="margin-bottom-1em">
                            <p>Once recording is complete, click the <i className="bi bi-three-dots-vertical"></i> button on the audio player and select 'Download'.</p>
                        </li>                      
                    
                        <li className="margin-bottom-1em">
                            <p>Click the 'Choose File' button and select input the audio file you jsut downloaded.</p>
                        </li>
                    </ul>
                </div>
            </>
        )
    }



    return (
    <>
        <Container fluid="xl">
            {/* <audio id="player2" controls></audio>
            <input type="file" accept="audio/*" capture id="recorder" onChange={function(e){
                const player = document.getElementById('player2');
                const file = e.target.files[0];
                const url = URL.createObjectURL(file);
                // Do something with the audio file.
                player.src = url;
            }}/> */}
            <Row>
                <Col className=" entryForm" md={7}>
                    <div className="flex-row entryForm-top">
                        <h4 className="entryForm-Title">{entryItemId ? "Edit Entry" : "New Entry"}</h4>
                        <Button type="button" className="backToHome-btn" onClick={() => {history.push("/journalList")}}>Cancel</Button>
                    </div>
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
                            <hr />

                            <div className="biggerAudioContainer">

                                <h5>{entryItem.audioFileLink ? "" : instructions()}   
                                </h5>
                                <div className="audioContainer">
                                    <button class="btn btn-primary audioBtn" type="button" ref={audiobutton}>
                                        <i className="bi bi-mic-fill entryForm-mic-icon"></i>
                                    </button>

                                    <Form.Group className="audioFileInputForm">

                                        <Form.Control type="file" className="audioFileInput" accept="audio/*" capture id="audioFileLink"></Form.Control>
                                    </Form.Group>

                                </div>
                            </div>



                            <br />
                            <br />
                            <br />

                            <div id="playlist">
                            
                            </div>
                            {/* <div id="output"
                                ondragenter="document.getElementById('output').textContent = ''; event.stopPropagation(); event.preventDefault();"
                                ondragover="event.stopPropagation(); event.preventDefault();"
                                ondrop="event.stopPropagation(); event.preventDefault();
                                dodrop(event);">
                                DROP FILES HERE FROM FINDER OR EXPLORER
                            </div> */}
                            {/* <div className="div1" id="dropzone">add file here</div>
                            <div className="div2" id="play" >PLAY</div>
                            <div className="div3" id="pause" >PAUSE</div>
                            <div className="div4" id="progress" >
                                <div id="time"></div>
                            </div> */}
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
                                            <input id="dreamdate" type="date" ref={dateVal} onChange={handleDateChange} value={entryItem.dreamdate ? convertDate(entryItem.dreamdate) : defaultDate() }></input>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Dream Type</Form.Label>
                                        <Form.Control as="select" id="typeId" custom>
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
        <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="audioRecordModal"
            >
                <Modal.Body>
                   <div className="redPill">RECORDING</div>

                    <Button className="authModal-closeBtn" variant="primary" onClick={handleClose}>Ok</Button>
                </Modal.Body>
		    </Modal>
    </>
    )




}





// useEffect (() => {
    //     console.log("IsRecording: " , isRecording);
    //     if(isRecording){
    //         timerToggle(true);
    //     }
    //     else {
    //         timerToggle(false);
    //     }
    // }, [isRecording])

    // function dodrop(event){
    //     var dt = event.dataTransfer;
    //     var files = dt.files;

    //     var count = files.length;
    //     output("File Count: " + count + "\n");

    //         for (var i = 0; i < files.length; i++) {
    //         output(" File " + i + ":\n(" + (typeof files[i]) + ") : <" + files[i] + " > " + files[i].name + " " + files[i].size + "\n");
    //         }
    //     }

    // function output(text){
    //     document.getElementById("output").textContent += text;
    // //dump(text);
    // }

    // let context = new AudioContext()

    // window.addEventListener('load', function() {
    //     var dropzone = document.querySelector('#dropzone');
    //     dropzone.addEventListener('drop', handleDrop, false)
    //     dropzone.addEventListener('dragover', handleDragOver, false)
    // })

    // const handleDragOver = function(e) {
    //     e.preventDefault()
    //     e.stopPropagation()
    // }

    // const handleDrop = function(e) {
    //     e.preventDefault()
    //     e.stopPropagation()

    //     let files = e.dataTransfer.files
    //     for (var i = 0; i < files.length; i++) {
    //         let file = files[i]
    //         let reader = new FileReader()
    //         reader.addEventListener('load', function(e) {
    //             let data = e.target.result
    //             context.decodeAudioData(data, function(buffer) {
    //                 playSound(buffer)
    //             })
    //         })
    //         reader.readAsArrayBuffer(file)
    //         console.log("File: ", file);
    //     }
    // }

    // const playSound = function(buffer) {
    //     var source = context.createBufferSource()
    //     source.buffer = buffer
    //     source.connect(context.destination)
    //     source.start(0)
    // }


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


    // ----------------- Timer functions ----------------------

    // const pad = (val) => {
    //     return val > 9 ? val : "0" + val;
    // }

    // const timerToggle = (boolean) => {
    //     let timer = recTimer;
    //     if(boolean){ 
    //         // if parameter is passed in that notifies the timer to start, start the timer
    //         var sec = 0;
    //         timer = setInterval(function () {
    //             document.getElementById("seconds").innerHTML = pad(++sec % 60);
    //             document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    //         }, 1000);
    //         setRecTimer(timer);
    //         //console.log("timer: ", timer)
    //     }
    //     else {
    //         //console.log("timer: ", timer)
    //         clearInterval(recTimer);
            
    //     }
    // }

    // -----------------------------------------------------------


    // <input type="file" accept="audio/*" capture id="recorder">
    // <script>
    //     const recorder = document.getElementById('recorder');
    //     const player = document.getElementById('player');

    //     recorder.addEventListener('change', function(e) {
    //         const file = e.target.files[0];
    //         const url = URL.createObjectURL(file);
    //         // Do something with the audio file.
    //         player.src = url;
    //     });
    // </script>
