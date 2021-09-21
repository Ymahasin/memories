import React from "react";
import { motion } from 'framer-motion';

const Modal = ({ setSelectedImg, selectedImg }) => {    

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')) { // only if you click outside of the image
            setSelectedImg(null); // to get rid of the bigger picture / Close the modal
        }        
    }

    return (
        <motion.div className="backdrop" onClick={ handleClick }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.img src={selectedImg} alt="bigger picture" 
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            />
        </motion.div>
    )
}

export default Modal;

