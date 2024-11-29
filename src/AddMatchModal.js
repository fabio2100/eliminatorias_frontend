// src/AddMatchModal.js
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddMatchModal = ({ open, handleClose }) => {
  const [equipos, setEquipos] = useState([]);
  const [nombreequipolocal, setNombreequipolocal] = useState('');
  const [nombreequipovisitante, setNombreequipovisitante] = useState('');
  const [golequipolocal, setGolequipolocal] = useState('');
  const [golequipovisitante, setGolequipovisitante] = useState('');

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/todoslosequipos');
        setEquipos(response.data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      }
    };
    fetchEquipos();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/api/partidos', {
        nombreequipolocal,
        nombreequipovisitante,
        golequipolocal: parseInt(golequipolocal, 10),
        golequipovisitante: parseInt(golequipovisitante, 10),
      });
      handleClose();
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Agregar Partido</h2>
        <Select
          fullWidth
          value={nombreequipolocal}
          onChange={(e) => setNombreequipolocal(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>Seleccione equipo local</MenuItem>
          {equipos.map((equipo) => (
            <MenuItem key={equipo.nombre} value={equipo.nombre}>{equipo.nombre}</MenuItem>
          ))}
        </Select>
        <Select
          fullWidth
          value={nombreequipovisitante}
          onChange={(e) => setNombreequipovisitante(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>Seleccione equipo visitante</MenuItem>
          {equipos.map((equipo) => (
            <MenuItem key={equipo.nombre} value={equipo.nombre}>{equipo.nombre}</MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          type="number"
          label="Goles equipo local"
          value={golequipolocal}
          onChange={(e) => setGolequipolocal(e.target.value)}
          inputProps={{ min: "0" }}
          margin="normal"
        />
        <TextField
          fullWidth
          type="number"
          label="Goles equipo visitante"
          value={golequipovisitante}
          onChange={(e) => setGolequipovisitante(e.target.value)}
          inputProps={{ min: "0" }}
          margin="normal"
        />
        <Button onClick={handleAdd} variant="contained" color="primary" sx={{ mr: 2 }}>
          Agregar
        </Button>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default AddMatchModal;

