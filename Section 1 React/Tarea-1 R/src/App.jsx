import React from "react";
import { UserList } from "./components/UserList";

const App = () => {
  //Simulacion de usuarios a renderizar en forma de lista
  const users = [
    {
      name: "Pedro",
      age: 50,
    },
    {
      name: "Vivian",
      age: 26,
    },
    {
      name: "Ernesto",
      age: 69,
    },
    {
      name: "Alejandro",
      age: 18,
    },
    {
      name: "Juan",
      age: 32,
    },
    {
      name: "Miguel",
      age: 20,
    },
    {
      name: "Zoilan",
      age: 5,
    },
  ];
  return (
    <main>
      <h1>Lista de Usuarios</h1>
      <UserList users={users} />
    </main>
  );
};

export default App;
