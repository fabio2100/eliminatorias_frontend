// src/App.js
import React, { useState } from 'react';
import './App.css';
import PosicionesTable from './PosicionesTable';
import AddMatchModal from './AddMatchModal';
import Button from '@mui/material/Button';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);


  return (
    <div className="App">
      <header className="App-header">
        <PosicionesTable />
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Agregar partido
        </Button>
        <AddMatchModal open={modalOpen} handleClose={handleCloseModal} />
      </header>
      <main>

      </main>
    </div>
  );
}

export default App;


