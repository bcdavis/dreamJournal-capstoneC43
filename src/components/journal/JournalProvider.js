import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const JournalContext = createContext()

// Nothing is stored in the context when it's defined. At this point, it's just an empty warehouse waiting to be filled.

/*
This component establishes what data can be used.
 */
export const JournalProvider = (props) => {
    const [ entries, setEntries ] = useState([]); // State hook
    const [ actUser, setActUser ] = useState({});
    const userId = localStorage.getItem("kennel_customer");
    //const [ searchTerms, setSearchTerms ] = useState("") // State hook for searching 

    /* this is what is being done in the line above: 

    // Define the variable which will hold the data.
    let entries = []

    // Define the function to be used to modify that state.
    const setEntries = entriesData => {
        if (entriesData !== null && Array.isArray(entriesData)) {
            entries = entriesData
        }
    }
    */

   const getEntries = () => {
    console.log("getEntries -- userId", userId);
    return fetch(`http://localhost:8088/dreamList?userId=${userId}`) // hopefully this fetches all the entries 
        .then(res => res.json()) // return all entries from database
        .then(setEntries) // call setEntries again
}

    const addEntry = (entryObj) => {
        console.log("addEntry -- entryObj: ", entryObj);
        return fetch("http://localhost:8088/dreamList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(entryObj) 
            // animal object will have an id (auto-generated), name, breed, customerId, and locationId
            // Can expand customer --> { id, name, address }
            // Can expand location --> { id, name, address } 
                
        })
            .then(getEntries) // get back an updates list of entries from that particular user
    }

    const getEntryById = (entryId) => {
        console.log("getEntryById -- entryId: ", entryId);
        return fetch(`http://localhost:8088/dreamList/${ entryId }?_expand=type&_expand=user`)
            .then(res => res.json())
    }

    const deleteEntry = (entryId) => {
        console.log("deleteEntry -- entryId: ", entryId);
        return fetch(`http://localhost:8088/dreamList/${entryId}`, {
            method: "DELETE"
        })
            .then(getEntries)
    }

    const updateEntry= (entryObj) => {
        console.log("updateEntry -- entryObj: ", entryObj);
        return fetch(`http://localhost:8088/dreamList/${entryObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryObj)
        })
            .then(getEntries)
    }

    const getActUser = () => {
        console.log("getActUser -- userId: ", userId);
        return fetch(`http://localhost:8088/users?id=${userId}`) // hopefully this fetches the current user object
            .then(res => res.json()) // return all entries from database
            .then(setActUser)
    }

    

    /*
        You return a context provider which has the
        `entries` state, the `addentries` function,
        and the `getentries` function as keys. This
        allows any child elements to access them.
    */

    // add the AnimalProvider to the AnimalContext, specify entries, getentries, and addAnimal 
    // FROM the AnimalProvider that we want to use

    // One of the properties of a context object is .Provider... 
    // we define which values we want to put in context.Provider
    return (
        <JournalContext.Provider value={{
            entries, actUser, getEntries, addEntry, getEntryById, deleteEntry, updateEntry, getActUser
        }}>
            {props.children}
        </JournalContext.Provider>
    )
}