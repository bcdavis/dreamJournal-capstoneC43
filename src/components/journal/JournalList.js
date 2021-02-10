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
     const { entries, getEntries } = useContext(JournalContext)
     
     const history = useHistory();

     const [ sortedDreams, setSortedDreams ] = useState([]);

    // console.log(entries, sortedDreams);
    
     //useEffect - reach out to the api for data, update state, and re-renders the component
    useEffect(() => {
        console.log("JournalList -- useEffect -- getEntries");
        getEntries()
    }, []) 

    useEffect(() => {
        console.log("JournalList -- useEffect -- sortDreamsByDate");
        sortDreamsByDate(entries)
    }, [entries])

     const sortDreamsByDate = (inputEntries) => {
         let sortedEntries = inputEntries;
            sortedEntries.sort((a,b) => {
                // console.log("a: ", (new Date(a.dreamdate)), " -- b: ", (new Date(b.dreamdate)));
                if((new Date(a.dreamdate)) > (new Date(b.dreamdate))) return 1;
                if((new Date(a.dreamdate)) < (new Date(b.dreamdate))) return -1;
                return 0;
        });
        // console.log("sortedEntries: ", sortedEntries); // need this for the useEffect to reach this function
        sortedEntries.reverse(); // order dreams from most newest to oldest
        setSortedDreams(sortedEntries);


     }

 
     return (	
         <>

			<Container fluid="xl" className="not-xl-when-desktop">
				<h5 className="username">My Dream Journal</h5>
				<Col >
                    <article className="entryList">
                        {
                            sortedDreams.map(item => { //journalArray.map

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
 