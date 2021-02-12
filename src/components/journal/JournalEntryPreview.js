import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import { JournalContext } from "./JournalProvider.js"; // gives us entries, getEntries, addentries
import { Container, Button } from 'react-bootstrap';

export const JournalEntryPreview = (props) => {
    console.log("--------- Journal Entry Preview Page ------------");

    const { getEntryById, getDreamTypes, updateEntry } = useContext(JournalContext)

    const history = useHistory();

    const {entryItemId} = useParams();

    const [isLoading, setIsLoading] = useState(true);

    // console.log("LOCATION: ", entryItemId);

    const [entryItem, setEntryItem] = useState({
        "id": 5,
        "userId": 2,
        "typeId": "1",
        "title": "Different Style Date",
        "text": "I travelled around the world and said hello to everyone I met.",
        "context": "We learned about Amelia Earhart yesterday in history class.",
        "audioFileLink": "Hello_World_audio.mp4",
        "entryLastUpdatedDate": "",
        "dreamdate": "2021 02 09",
        "isRecurrent": false,
        "isLucid": true,
        "isFavorite": false

    }); // entryItem is set if we are passing in one from the url to edit


    const handleStarUpdate = () => {
		setIsLoading(true);
		// console.log("Old item: ", item);

		const newItemObj = { ...entryItem };
		if(newItemObj.isFavorite){
			newItemObj.isFavorite = false;
		}
		else {
			newItemObj.isFavorite = true;
		}
        setEntryItem(newItemObj);
		// console.log("New item: ", newItemObj);
		updateEntry(newItemObj);
	}


    // const entryItem = data.find((p) => p.id === Number(entryItemId));
    // let entryData;

    // if (entryItem) {
    //     entryData = (
    //     <div>
    //         <h3>{product.name}</h3>
    //         <p>{product.description}</p>
    //         <hr />
    //         <h4>{product.status}</h4>
    //     </div>
    //     );
    // } else {
    //     entryData = <h2>Sorry. Product doesn't exist</h2>;
    // }

    useEffect(() => {
        getDreamTypes().then(() => {
            if (entryItemId){
                console.log("There is an entryItem id in the params of URL");
                getEntryById(entryItemId)
                .then((entryItem) => {
                    setEntryItem(entryItem)
                    // setIsLoading(false) // clickable button for editing entry
                })

            }
        })
    }, []);

    useEffect(() => {
        console.log("entryItem: ", entryItem);
    }, [entryItem])

    return (
        <Container className="dreamPreview max-width-40em">
            {/* <h1>This is the Journal Preview Page</h1> */}

            <section className="preview-top">
                <Button className="backToHomeFromPreview-btn" onClick={() => {history.push("/journalList")}}>
                    <i className="bi bi-arrow-left"></i>
                    <p>Back to list</p>
                    {/* <Link key="backBtnFromPreview" to={"/journalList"}>Back to list</Link>  */}
                </Button>


            <button className="starBtn-preview flex-col" onClick={handleStarUpdate}>{entryItem.isFavorite ? <i class="bi bi-star-fill"></i> : <i class="bi bi-star"></i>}
            
            </button>
                <Button className="dreamEditBtn" variant="secondary" onClick={() => {history.push(`/journalList/edit/${entryItemId}`)}}>Edit</Button>
            </section>


            <section className="preview-content">

                <div className="flex-wrap pre-div pre-audio">
                	{(entryItem.audioFileLink !== "") ? <audio className="darkPlayer" src={entryItem.audioFileLink} id="player" controls></audio> : null}
                </div>


                <div className=" flex-wrap pre-div pre-dreamdate">
                    <p>
                        {(entryItemId !== undefined) ? entryItem.dreamdate :  new Date().toDateString()}
                    </p>
                </div>

                <div className=" flex-wrap pre-div pre-title">
                    <h3>
                        {(entryItemId !== undefined) ? entryItem.title : "Title"}
                    </h3>
                </div>

                <div className=" flex-wrap pre-div pre-text">
                    <p>
                        {(entryItemId !== undefined) ? entryItem.text :  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendu distinctioaperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendu distinctioaperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendu distinctioaperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendu distinctioaperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque."}

                    </p>
                </div>

                <div className=" flex-wrap pre-div pre-context">
                    <h5>
                        Context
                    </h5>
                    <p>
                        {(entryItemId !== undefined) ? entryItem.context :  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendu distinctioaperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendu distinctioaperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque."}

                    </p>
                </div>
                
                <div className=" flex-col pre-div pre-attributes">
                    <h5>
                        Attributes
                    </h5>
                    <div className="pre-attributes-container flex-row">
                    
                        <div className="pre-attr attr-lucid">
                            {entryItem.isLucid ?  
                                <p className="attr-badge">
                                    Lucid
                                </p>
                                :
                                null
                            }
                        </div>
                        <div className="pre-attr attr-recur">
                            {entryItem.isRecurrent?  
                                    <p className="attr-badge">
                                        Recurrent
                                    </p>
                                    :
                                    null
                                }
                        </div>
                    </div>
                </div>

                <div className=" flex-col pre-div pre-type">
                    <h5>
                        Type
                    </h5>
                    <div className="pre-attributes-container flex-row">
                    
                        <div className="pre-attr attr-lucid">
                            {(entryItem.type === "2") ?  
                                <p className="attr-badge">
                                    Nightmare
                                </p>
                                :
                                <p className="attr-badge">
                                    Dream
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </section>

        </Container>
    )
}