import React, { useEffect, useState } from "react";
import "./UserList.css";

export const UserList = ({ users }) => {
  const [sortBy, setSortBy] = useState("nada");
  const [sortedUsers, setSortedUsers] = useState([]);

  //Manejo del cambio del evento en el desplegable
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };
  //Efecto para manejar los cambios del formulario y ordenarlos
  useEffect(() => {
    //Condicional para ordenar los usuarios segun el filtro seleccionado
    switch (sortBy) {
      case "nada":
        setSortedUsers(users);
        return;
      case "nombre":
        setSortedUsers([...users].sort((a, b) => a.name.localeCompare(b.name)));
        return;
      case "edad":
        setSortedUsers([...users].sort((a, b) => a.age.localeCompare(b.age)));
        return;
    }
  }, [sortBy]);

  return (
    <section>
      <div className="sort">
        <label htmlFor="sort">Ordenar por</label>
        <select id="sort" onChange={handleChange}>
          <option value="nada">Nada</option>
          <option value="nombre">Nombre</option>
          <option value="edad">Edad</option>
        </select>
      </div>
      <ol>
        {sortedUsers.map((users, index) => (
          <li key={index} className="user-list">
            <p>{users.name}</p>
            <p>{users.age}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};
