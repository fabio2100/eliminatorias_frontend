// src/App.js
import React, { useState } from 'react';
import './App.css';
import PosicionesTable from './PosicionesTable';
import AddMatchModal from './AddMatchModal';
import EditMatchModal from './EditMatchModal';
import Button from '@mui/material/Button';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);


  return (
    <div className="App">
      <header className="App-header">
        <PosicionesTable />
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Agregar partido
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOpenEditModal} sx={{ ml: 2 }}> Editar Partidos </Button>
        <AddMatchModal open={modalOpen} handleClose={handleCloseModal} />
        <EditMatchModal open={editModalOpen} handleClose={handleCloseEditModal} />
      </header>
      <main>

      </main>
    </div>
  );
}

export default App;


