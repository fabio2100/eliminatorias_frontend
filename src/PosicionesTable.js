// src/PosicionesTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PosicionesTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posiciones');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Clasificación</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>PTOS</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>GF</th>
            <th>GC</th>
            <th>DIF</th>
          </tr>
        </thead>
        <tbody>
          {data.map((equipo) => (
            <tr key={equipo.nombre}>
              <td>{equipo.nombre}</td>
              <td><strong>{equipo.ptos}</strong></td>
              <td>{equipo.pj}</td>
              <td>{equipo.pg}</td>
              <td>{equipo.pe}</td>
              <td>{equipo.pp}</td>
              <td>{equipo.gf}</td>
              <td>{equipo.gc}</td>
              <td>{equipo.dif}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PosicionesTable;
