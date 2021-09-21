import { useState, useEffect } from "react";
import { projectfirestore } from "../firebase/config";

// Spread notation: "..." 
//  it separates out the "own" enumerable properties in props as discrete properties of the model
//  ex: [a: 1, b: 2]
//      - {...this.props}
//      is the same as
//      - a={this.props.a} b={this.props.b}
const useFirestore = (collection) => {
    const [ docs, setDocs ] = useState([]);

    // in a useEffect to update when the collection changes
    // onSnapShot fires a call back anytime a change occures - its real time notification
    useEffect(() => {
        const unsub = projectfirestore.collection(collection)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap) => {
            let documents = [];
            snap.forEach(doc => {
                documents.push({...doc.data(), id: doc.id});
            })
            setDocs(documents);
        });
        return () => unsub(); // unsubscribe from the collection when we no longer need it. Cleanup method
    }, [collection]);


    return { docs };
}

export default useFirestore;