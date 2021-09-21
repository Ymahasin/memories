import React, { useState } from 'react';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';
import Modal from './components/Modal';
import Footer from './components/Footer';

// root component

function App() {
  // handles selecting the Modals to enlargen
  const [ selectedImg, setSelectedImg ] = useState(null);


  return (
    <div className="App">
      <Title/>
      <UploadForm />

      <ImageGrid setSelectedImg={setSelectedImg} />
      { selectedImg && <Modal selectedImg={ selectedImg } setSelectedImg={ setSelectedImg } /> }
      
      <Footer />
    </div>
  );
}

export default App;
