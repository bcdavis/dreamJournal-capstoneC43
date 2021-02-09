import React, { useContext, useEffect, useState } from "react" // useContext is the context hook that is used to access context exposed by a parent object
import {useHistory, useParams} from "react-router-dom"
import { Col, Container } from 'react-bootstrap';
import { JournalContext } from "./JournalProvider.js" // gives us entries, getEntries, addentries
import { JournalEntry } from "./JournalEntry.js"
// import { AnimalCard } from "./AnimalCard.js"
// import { entriesearch } from "./entriesearch.js"


export const JournalList = () => {
    console.log("--------- Journal List Page ------------");
    const userId = localStorage.getItem("kennel_customer")
    // This state changes when `getEntries()` is invoked below
     const { entries, actUser, getEntries, getActUser } = useContext(JournalContext)
     
     const history = useHistory();

     
     //useEffect - reach out to the api for data, update state, and re-renders the component
     useEffect(() => {
         getActUser()
         getEntries()
         console.log("actUser: ", actUser[0]);
     }, []) 

 
     return (	
         <>

			<Container fluid="xl" className="not-xl-when-desktop">
				<h5 className="username">My Dream Journal</h5>
				<Col >
                    <article className="entryList">
                        {
                            entries.map(item => { //journalArray.map

                                return (
                                    <JournalEntry item={item} key={item.id} />


                                )
                            })

                        }
                    </article>
                </Col>
            </Container>

         </>
     )
}
 