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
                    <Route path="/journalList/edit/:entryItemId(\d+)" render={
                            props => <JournalEntryForm {...props} />
                    }>
                    </Route>

                    <Route path="/journalList/:entryItemId(\d+)"render={
                            props => <JournalEntryPreview {...props} />
                    }>                       
                        <JournalEntryPreview />
                    </Route>

                    <Route exact path="/add">                        
                        <JournalEntryForm />
                    </Route>

                    <Route exact path="/journalList" render={
                            props => <JournalList {...props} />
                    }>
                    </Route>
                </Switch>
            </JournalProvider>
        </>
    );
  };