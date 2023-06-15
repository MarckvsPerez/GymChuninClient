import React, { useState, useEffect } from "react";
import { Tab, Button, Icon } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { UserForm, ListUsers } from "../../../components/Admin/Users";
import "./Users.scss";

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Usuarios activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Usuarios inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cambia el valor de 768 según tus necesidades
    };

    handleResize(); // Comprobar el tamaño inicial al cargar la página

    window.addEventListener("resize", handleResize); // Agregar el evento de redimensionamiento

    return () => {
      window.removeEventListener("resize", handleResize); // Limpiar el evento al desmontar el componente
    };
  }, []);

  return (
    <>
      <div className="users-page">
        <Button
          className="users-page__add"
          icon
          primary
          onClick={onOpenCloseModal}
        >
          {isMobile ? <Icon name="plus" /> : "Nuevo usuario"}
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo usuario"
      >
        <UserForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
