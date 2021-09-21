import { useState, useEffect } from "react";
import { projectStorage, projectfirestore, timestamp } from "../firebase/config";

// a custom hook! This uploads the picture to Firebase Storage

// takes in a file, the file that the user uploads
const useStorage = (file) => {
    const [ progress, setProgress ] = useState(0);
    const [ error, setError ] = useState(null);
    const [ url, setUrl ] = useState(null);             // image url after upload

    // we put our logic inside of useEffect because we want our app to
    // "listen" incase the user selects a different file.
    useEffect(() => {
        // references
        const storageRef = projectStorage.ref(file.name); // reference the firebase file bucket
        const collectionRef = projectfirestore.collection('images');
        
        // uploads the file to the storage reference. This is an Async function
        // Note the .on('state', callback to fire when state changes)
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ url: url, createdAt: createdAt });
            setUrl(url);
        }); 

    }, [file]) // on file change, fire this effect

    return { progress, url, error }

}

export default useStorage;