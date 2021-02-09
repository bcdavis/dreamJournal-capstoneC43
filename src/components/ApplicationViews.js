import React from "react";
import { Switch, Route } from "react-router-dom";
// import { FirebaseContext } from "./fbAuth/FirebaseProvider.js";
// import Login from "./auth/Login.js";
// import Register from "./auth/Register.js";
import { JournalList } from "./journal/JournalList.js";
// import { JournalEntryCreate } from "./journal/JournalEntryCreate.js";
import { JournalEntryForm } from "./journal/JournalEntryForm.js";
import { JournalEntryPreview } from "./journal/JournalEntryPreview.js";
import { JournalProvider } from "./journal/JournalProvider.js"
// import { JournalStats } from "./journal/JournalStats.js";



export const ApplicationViews = () => {

  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
    // let isLoggedIn = false;
    // console.log("SessionStorage???? ", sessionStorage.getItem("email"));
    // if (sessionStorage.getItem("email") !== null){
    //   isLoggedIn = true;
    // }
    // else {
    //   isLoggedIn = false;
    // }
  
    return (
        <>
            
            <JournalProvider>
                <Switch>
                    <Route path="/journalEntry/edit/:journalEntryId(\d+)">
                        <JournalEntryForm />
                    </Route>

                    <Route path="/journalEntry/:journalEntryId(\d+)">                       
                        <JournalEntryPreview />
                    </Route>

                    <Route path="/add">                        
                        <JournalEntryForm />
                    </Route>

                    <Route exact path="/">                       
                        <JournalList />
                    </Route>
                </Switch>
            </JournalProvider>
        </>
    );
  };