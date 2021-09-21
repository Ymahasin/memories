import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {

    // initially the file is null. setState used to locally store file
    const [ file, setFile ] = useState(null);
    const [ error, setError ] = useState(null);
    // array of allowed types (for the images)
    const types = ["image/png", "image/jpeg"];

    const changeHandler = (e) => {        
        let selected = e.target.files[0];        

        // if they have selected a file and it is of the correct type, setFile()
        if(selected && types.includes(selected.type)) {
            setFile(selected);
            setError(""); // to clear any possible error messages that were displayed
        } else {
            setFile(null);
            setError("Please select an image file (png or jpeg)");
        }
    }

    return (
        <form>
            <label>
                <input type="file" onChange={changeHandler} />    
                <span>+</span>
            </label>
            <div className="output">
                { error && <div className="error">{error}</div> }
                { file && <div>{file.name}</div> }
                { file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </form>
    )
}

export default UploadForm;