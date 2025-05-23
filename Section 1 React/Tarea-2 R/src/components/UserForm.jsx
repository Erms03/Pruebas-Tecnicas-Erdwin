import React, { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAddClick = () => {
    setIsOpenModal(true);
  };

  const handleCancelButton = () => {
    setIsOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = dataForm;
    setSubmittedData(newUser);

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
              <div className="buttons-form">
                <button onClick={handleAddClick}>Aceptar</button>
                <button onClick={handleCancelButton}>Cancelar</button>
              </div>
            </form>
          </div>
        </>
      )}

      {submittedData && (
        <div className="show-user">
          <p>Nombre: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
        </div>
      )}
    </section>
  );
};

export default UserForm;
