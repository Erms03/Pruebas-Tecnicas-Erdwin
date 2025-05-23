import React, { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  //Eventos para manejar la accion del modal
  const handleAddClick = () => {
    setIsOpenModal(true);
  };
  const handleCancelButton = () => {
    setIsOpenModal(false);
  };
  const handleDeleteClick = (index) => {
    setUsers((prev) => [...prev].filter((_, i) => i !== index));
  };

  //Se guarda en un estado los cambios de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validaciones del formulario
    if (!dataForm.name || !dataForm.email) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(dataForm.email)) {
      setError("Por favor ingrese un email válido");
      return;
    }

    if (users.some((user) => user.email === dataForm.email)) {
      setError("Este email ya está registrado");
      return;
    }

    //Se guarda el nuevo usuario en el array usuario
    const newUser = dataForm;
    setUsers([...users, newUser]);

    //Se resetea el formulario
    setDataForm({
      name: "",
      email: "",
    });

    setIsOpenModal(false);
  };

  return (
    <section className="section">
      <div className="title">
        <h1>Formulario React</h1>
        <button onClick={handleAddClick}>Annadir</button>
      </div>
      {isOpenModal && (
        <>
          <div className="background-modal" />
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <div className="input-form">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  placeholder="Juan, Perez, Ernesto..."
                  onChange={handleChange}
                  value={dataForm.name}
                  name="name"
                  required
                />
              </div>
              <div className="input-form">
                <label htmlFor="email">Correo</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                  name="email"
                  value={dataForm.email}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}

              <div className="buttons-form">
                <button type="submit" onClick={handleAddClick}>
                  Aceptar
                </button>
                <button onClick={handleCancelButton}>Cancelar</button>
              </div>
            </form>
          </div>
        </>
      )}

      {users &&
        users.map((user, index) => (
          <div className="user-card" key={user.email}>
            <div className="show-user">
              <p>Nombre: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
            <div
              className="delete-button"
              onClick={() => handleDeleteClick(index)}
            >
              Borrar
            </div>
          </div>
        ))}
    </section>
  );
};

export default UserForm;
