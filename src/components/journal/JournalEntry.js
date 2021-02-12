import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Dropdown, Modal } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { JournalContext } from "./JournalProvider.js" // gives us deleteEntry, updateEntry

export const JournalEntry = ({ entryItem }) => {
	// console.log("JournalEntry{item}", item);
    const { deleteEntry, updateEntry } = useContext(JournalContext);
    // deleteEntry takes an entryId, updateEntry takes an entryObj

	const item = entryItem;

	//controls the clickable-ness of the checkbox
	const [isLoading, setIsLoading] = useState(true);
	const [show, setShow] = useState(false);

	const history = useHistory();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// const handleGotIt = (event) => {
	// 	setIsLoading(true); // turn button off -- disable it
	// 	//make a copy of original data
	// 	const updatedItem = { ...item }
	// 	//set value to opposite
	// 	updatedItem.gotIt = updatedItem.gotIt ? false : true;
	// 	//invoke function on parent
	// 	//why is it on the parent? So that when it finishes the update,
	// 	//we can invoke getAll and update the ChrisList state
	// 	iGotIt(updatedItem)
	// }

	const handleDelete = () => {
		setIsLoading(true);
		deleteEntry(item.id);
	}

	const handleStarUpdate = () => {
		setIsLoading(true);
		// console.log("Old item: ", item);

		const newItemObj = { ...item };
		if(newItemObj.isFavorite){
			newItemObj.isFavorite = false;
		}
		else {
			newItemObj.isFavorite = true;
		}
		// console.log("New item: ", newItemObj);
		updateEntry(newItemObj);
	}

	useEffect(() => {
        // console.log("JournalEntry -- useEffect");
		handleClose();
		setIsLoading(false)
	}, [item])

	// const DeleteEntryModal = ({entryId, deleteFn}) => {
	// 	// const [show, setShow] = useState(false);
	  
	// 	// const handleClose = () => setShow(false);
	// 	// const handleShow = () => setShow(true);
	  
	// 	return (
	// 	  <>
	// 		<Modal
	// 		  show={show}
	// 		  onHide={handleClose}
	// 		  backdrop="static"
	// 		  keyboard={false}
	// 		>
	// 		  <Modal.Header closeButton>
	// 			<Modal.Title>Warning</Modal.Title>
	// 		  </Modal.Header>
	// 		  <Modal.Body>
	// 			Are you sure you want to delete this entry? This action cannot be undone.
	// 		  </Modal.Body>
	// 		  <Modal.Footer>
	// 			<Button variant="secondary" onClick={handleClose}>Cancel</Button>
	// 			<Button variant="danger" onClick={deleteFn}>Delete</Button>
	// 		  </Modal.Footer>
	// 		</Modal>
	// 	  </>
	// 	);
	//   }


    // By clickin gon a jounral entry on the journalList page, it navigates you to the preview page for that entry
	// const navToJournalEntry= (itemId) => {
    //     history.push(`/journalEntry/edit/${itemId}`)
    // }

    // const showDateDetail = () => {
    //     let dt = new Date(item.dreamdate);
    //     console.log("Item Date Details: ----- ", dt.toDateString());
    //     console.log("getDate() : " + dt.getDate() );  
    //     console.log("getMonth() : " + (dt.getMonth()+1));  
    //     console.log("getTime() (ms): " + dt.getTime());
    // }


	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<a
		  href=""
		  ref={ref}
		  onClick={(e) => {
			e.preventDefault();
			onClick(e);
		  }}
		>
		  {children}
		  <i className="bi bi-three-dots-vertical"></i>
		</a>
	  ));

	//date info: https://www.tutorialspoint.com/es6/es6_date.htm
	return (
		<>
			<Card className="card2 flex-column"> 
				<Card.Header className="card2-top flex-row">
					<div className="card2-top-left">
						<div className="card2-date flex-row">
							<p><strong>{(new Date(item.dreamdate)).toDateString()}</strong></p>
						</div>
						<div className="card2-fav-star">
							{item.isFavorite ? <i className="fa fa-star" /> : null}							
						</div>
					</div>
					<div className="card2-attributes flex-row card2-top-right">
						{(item.typeId === "1") ? 
							<div className="attr-text2">
								<p>Dream</p>
							</div>
						: 
							<div className="attr-text2">
								<p>Nightmare</p>
							</div> 
						}
						{item.isLucid ? 
							<div className="attr-text2">
								<p>Lucid</p>
							</div>
						: null }
						{item.isRecurrent ? 
							<div className="attr-text2">
								<p>Recurrent</p>
							</div>
						: null }
						{item.audioFileLink !== "" ? 
							<div className="attr-text2">
								<div>
									<i className="fa fa-volume-up" />
								</div>
							</div>
						: null }
						
					</div>
				</Card.Header>
				<Card.Body className="card-right round-corners" >
					<div className="card2-content flex-row padding-10px">
						<div className="card-content-mid flex-col">

							<div className="card2-content-preview">

								<div className="content-pre-title2">
									<h3>{item.title}</h3>
								</div>
								
								<div className="content-pre-text2">
                        			<p>{item.text}</p>
								</div>

							</div>
						</div>
						<div className="card2-content-options">
							<Dropdown >
								<Dropdown.Toggle as={CustomToggle} id={`${item.id}-options-dropdown`} className="dropdown-basic entry-options-dropdown"></Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={handleStarUpdate}>{item.isFavorite ? "Remove Star" : "Star"}</Dropdown.Item>
									<Dropdown.Item href="#/action-2" onClick={handleShow}>Delete</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<Link className="previewBtn" key={item.id} to={`/journalList/${item.id}`}>Read</Link>
						</div>
						
					</div>
					
				
				</Card.Body>
			
		
			
				{/* // <div className="entryCard flex-col">
				// 	{/* <div className="overallContainer">
				// 		<a href="#" className="ellipsis">
				// 			<span>I am a link that wraps a lot and goes down to at least four lines. I should only show three lines though. I am a link that wraps a lot and goes down to at least four lines. I should only show three lines though.</span>
				// 		</a>
				// 	</div> */}


				{/* // 	<Card className="card-right round-corners mb-2 text-white">
				// 		<Card.Header>
				// 		<div class="card2-top flex-row">
				// 		<div class="card2-top-left">
				// 			<div class="card2-date flex-row">
				// 				<p><strong>12</strong></p>
				// 				<p><strong>Feb</strong></p>
				// 				<p><strong>2021</strong></p>
				// 			</div>
				// 			<div class="card2-fav-star">*</div>
				// 		</div>
				// 		<div class="card2-attributes flex-row card2-top-right">
				// 			<div class="attr-text2">
				// 			<p>Lucid</p>
				// 			</div>
				// 			<div class="attr-text2">
				// 			<p>Audio</p>
				// 			</div>
				// 		</div>
				// 	</div>
				// 		</Card.Header>
				// 		<Card.Body >
				// 			<Card.Title>{item.title}</Card.Title>
				// 			<Card.Subtitle>Date added: <strong>{item.dreamdate && new Date(item.dreamdate).toLocaleDateString()}</strong></Card.Subtitle>
				// 			<Card.Text>
				// 				Description: <strong>{item.details}</strong>
				// 			</Card.Text>
				// 		</Card.Body>
				// 		<Card.Body className="text-right" >
				// 			<div><RRLink className="btn ouline-lite btn-sm" style={{ width: "7.25em" }} disabled={isLoading} to={`/chrisItem/edit/${item.id}`}>Edit</RRLink></div>
				// 			<div><Button onClick={handleDelete} variant="outline-lite" size="sm" style={{ width: "7.25em" }} disabled={isLoading}>Remove</Button></div>
				// 		</Card.Body>
				// 	</Card>
				// </div> */} 
			</Card>

		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Warning</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to delete this entry? This action cannot be undone.
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleClose}>Cancel</Button>
				<Button variant="danger" onClick={handleDelete}>Delete</Button>
			</Modal.Footer>
		</Modal>
	</>
	)
}