import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { Edit } from "@mui/icons-material";

function EditMatchModal({ open, handleClose }) {
  const [searchText, setSearchText] = useState("");
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/todoslosequipos"
        );
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (searchText) {
          const response = await axios.get(
            `http://localhost:3000/api/buscarPartidoXEquipo?query=${searchText}`
          );
          setMatches(response.data);
        } else {
          setMatches([]);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
        setMatches([]);
      }
    };

    fetchMatches();
  }, [searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleEditClick = async (match) => {
  
    try {
      const response = await axios.post('http://localhost:3000/api/editarpartido', {
        id: match.id,
        nombreequipolocal: match.nombreequipolocal,
        nombreequipovisitante: match.nombreequipovisitante,
        golequipolocal: match.golequipolocal,
        golequipovisitante: match.golequipovisitante
      });
  
      if (response.status === 200) {
        console.log('Match updated successfully');
        // Aquí puedes manejar la actualización exitosa, como cerrar el modal o mostrar un mensaje
      }
    } catch (error) {
      console.error('Error updating match:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error
    }
  };
  

  const handleValueChange = (event, matchId, field) => {
    const value = event.target.value;
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === matchId ? { ...match, [field]: value } : match
      )
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 600,
          p: 3,
          bgcolor: "background.paper",
          margin: "auto",
          mt: 5,
        }}
      >
        <h2>Editar Partidos</h2>
        <TextField
          fullWidth
          label="Buscar Partido"
          variant="outlined"
          margin="normal"
          value={searchText}
          onChange={handleSearchChange}
        />
        <Box sx={{ maxHeight: 500, overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Equipo Local</TableCell>
                <TableCell>Equipo Visitante</TableCell>
                <TableCell>Gol Equipo Local</TableCell>
                <TableCell>Gol Equipo Visitante</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>
                    <Select
                      value={match.nombreequipolocal || ""}
                      displayEmpty
                      onChange={(event) =>
                        handleValueChange(event, match.id, "nombreequipolocal")
                      }
                    >
                      <MenuItem value="" disabled>
                        Seleccionar Equipo
                      </MenuItem>
                      {teams.map((team) => (
                        <MenuItem key={team.id} value={team.nombre}>
                          {team.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={match.nombreequipovisitante || ""}
                      displayEmpty
                      onChange={(event) =>
                        handleValueChange(
                          event,
                          match.id,
                          "nombreequipovisitante"
                        )
                      }
                    >
                      <MenuItem value="" disabled>
                        Seleccionar Equipo
                      </MenuItem>
                      {teams.map((team) => (
                        <MenuItem key={team.id} value={team.nombre}>
                          {team.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={match.golequipolocal}
                      onChange={(event) =>
                        handleValueChange(event, match.id, "golequipolocal")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={match.golequipovisitante}
                      onChange={(event) =>
                        handleValueChange(event, match.id, "golequipovisitante")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(match)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
}

export default EditMatchModal;
